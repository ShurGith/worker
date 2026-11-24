import { createServer } from 'node:http'
import { URL } from 'node:url'
import { query } from './db.js'

const port = Number(process.env.PORT || 3001)
const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'access-control-allow-origin': process.env.CORS_ORIGIN || '*',
  'access-control-allow-methods': 'GET,POST,PATCH,DELETE,OPTIONS',
  'access-control-allow-headers': 'content-type',
}

const tableColumns = {
  categorias: ['nombre', 'descripcion'],
  platos: ['categoria_id', 'nombre', 'descripcion', 'precio', 'imagen_url', 'disponible', 'tiempo_preparacion_minutos', 'calorias', 'alergenos', 'vegetariano', 'vegano', 'sin_gluten'],
  bebidas: ['nombre', 'descripcion', 'precio', 'imagen_url', 'tipo', 'volumen_ml', 'disponible'],
  postres: ['nombre', 'descripcion', 'precio', 'imagen_url', 'disponible', 'calorias', 'alergenos'],
  entrantes: ['nombre', 'descripcion', 'precio', 'imagen_url', 'disponible', 'tiempo_preparacion_minutos', 'calorias', 'alergenos', 'vegetariano', 'vegano'],
  menus: ['nombre', 'descripcion', 'precio', 'imagen_url', 'disponible', 'valido_desde', 'valido_hasta'],
  menu_platos: ['menu_id', 'plato_id', 'tipo_plato'],
  menu_bebidas: ['menu_id', 'bebida_id', 'incluido'],
  menu_postres: ['menu_id', 'postre_id', 'incluido'],
  menu_entrantes: ['menu_id', 'entrante_id', 'incluido'],
  horarios: ['dia_semana', 'hora_apertura', 'hora_cierre', 'cerrado', 'notas'],
  mesas: ['numero', 'capacidad', 'ubicacion', 'activa'],
  clientes: ['nombre', 'apellidos', 'email', 'telefono', 'fecha_nacimiento', 'preferencias', 'alergenos_comunes', 'cliente_frecuente', 'puntos_fidelidad'],
  reservas: ['cliente_id', 'mesa_id', 'fecha_reserva', 'hora_reserva', 'numero_personas', 'estado', 'notas_especiales'],
  cargos: ['nombre', 'descripcion', 'salario_base'],
  empleados: ['cargo_id', 'nombre', 'apellidos', 'email', 'telefono', 'fecha_contratacion', 'fecha_fin_contrato', 'activo', 'horario_turno'],
  turnos: ['empleado_id', 'fecha', 'hora_inicio', 'hora_fin', 'notas'],
  pedidos: ['reserva_id', 'mesa_id', 'empleado_id', 'fecha_pedido', 'estado', 'notas', 'total'],
  pedido_items: ['pedido_id', 'plato_id', 'bebida_id', 'postre_id', 'entrante_id', 'menu_id', 'cantidad', 'precio_unitario', 'notas_especiales', 'preparado', 'servido'],
  pagos: ['pedido_id', 'metodo_pago', 'monto', 'propina', 'fecha_pago', 'referencia_transaccion'],
  ingredientes: ['nombre', 'unidad_medida', 'stock_actual', 'stock_minimo', 'precio_unitario', 'proveedor'],
  plato_ingredientes: ['plato_id', 'ingrediente_id', 'cantidad'],
}

function send(res, status, payload) {
  res.writeHead(status, jsonHeaders)
  res.end(payload === null ? '' : JSON.stringify(payload))
}

function databaseError(error) {
  if (error.code === '23505') return 'Ya existe un registro con esos datos únicos.'
  if (error.code === '23503') return 'La relación indicada no existe.'
  if (error.code === '23514' || error.code === '22P02') return 'Los datos no cumplen las restricciones de la base de datos.'
  return process.env.NODE_ENV === 'production' ? 'Error interno del servidor.' : error.message
}

async function readBody(req) {
  let body = ''
  for await (const chunk of req) body += chunk
  if (!body) return {}
  try { return JSON.parse(body) } catch { throw Object.assign(new Error('El cuerpo debe ser JSON válido.'), { statusCode: 400 }) }
}

function cleanValues(table, input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw Object.assign(new Error('El cuerpo debe ser un objeto JSON.'), { statusCode: 400 })
  const allowed = tableColumns[table]
  const entries = Object.entries(input)
  if (entries.some(([key]) => !allowed.includes(key))) throw Object.assign(new Error('El cuerpo contiene campos no permitidos.'), { statusCode: 400 })
  return Object.fromEntries(entries)
}

async function listRows(table, url) {
  const columns = tableColumns[table]
  const filters = []
  const values = []
  for (const [key, value] of url.searchParams) {
    if (['limit', 'offset', 'orderBy', 'order'].includes(key)) continue
    if (!columns.includes(key)) continue
    values.push(value)
    filters.push(`"${key}" = $${values.length}`)
  }
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || 50), 1), 200)
  const offset = Math.max(Number(url.searchParams.get('offset') || 0), 0)
  const requestedOrder = url.searchParams.get('orderBy')
  const orderBy = columns.includes(requestedOrder) ? requestedOrder : columns.includes('creado_en') ? 'creado_en' : null
  const direction = url.searchParams.get('order')?.toLowerCase() === 'asc' ? 'ASC' : 'DESC'
  values.push(limit, offset)
  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
  const order = orderBy ? `ORDER BY "${orderBy}" ${direction} NULLS LAST` : ''
  const result = await query(`SELECT * FROM "${table}" ${where} ${order} LIMIT $${values.length - 1} OFFSET $${values.length}`, values)
  return result.rows
}

async function insertRow(table, input) {
  const values = cleanValues(table, input)
  const keys = Object.keys(values)
  if (!keys.length) throw Object.assign(new Error('No hay campos para insertar.'), { statusCode: 400 })
  const params = keys.map((_, index) => `$${index + 1}`)
  const result = await query(`INSERT INTO "${table}" (${keys.map(key => `"${key}"`).join(', ')}) VALUES (${params.join(', ')}) RETURNING *`, Object.values(values))
  return result.rows[0]
}

async function updateRow(table, id, input) {
  const values = cleanValues(table, input)
  const keys = Object.keys(values)
  if (!keys.length) throw Object.assign(new Error('No hay campos para actualizar.'), { statusCode: 400 })
  const assignments = keys.map((key, index) => `"${key}" = $${index + 1}`)
  const result = await query(`UPDATE "${table}" SET ${assignments.join(', ')} WHERE id = $${keys.length + 1} RETURNING *`, [...Object.values(values), id])
  return result.rows[0] || null
}

async function dashboard() {
  const [reservas, pedidos, platos, ingredientes, clientes, ventas] = await Promise.all([
    query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE estado = 'pendiente')::int AS pendientes, COUNT(*) FILTER (WHERE fecha_reserva = CURRENT_DATE)::int AS hoy FROM reservas"),
    query("SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE estado IN ('pendiente', 'en_preparacion'))::int AS abiertos FROM pedidos"),
    query('SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE disponible)::int AS disponibles FROM platos'),
    query('SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE stock_minimo IS NOT NULL AND stock_actual <= stock_minimo)::int AS bajo_stock FROM ingredientes'),
    query('SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE cliente_frecuente)::int AS frecuentes FROM clientes'),
    query("SELECT COALESCE(SUM(monto + propina), 0)::numeric(12,2) AS total FROM pagos WHERE fecha_pago >= date_trunc('month', CURRENT_DATE)"),
  ])
  return { reservas: reservas.rows[0], pedidos: pedidos.rows[0], platos: platos.rows[0], ingredientes: ingredientes.rows[0], clientes: clientes.rows[0], ventas: ventas.rows[0] }
}

async function handle(req, res) {
  if (req.method === 'OPTIONS') return send(res, 204, null)
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`)
  const pathname = url.pathname.replace(/\/+$/, '') || '/'
  if (pathname === '/api' && req.method === 'GET') return send(res, 200, { service: 'elrest-api', endpoints: ['/api/health', '/api/dashboard', '/api/:tabla'] })
  if (pathname === '/api/health') return send(res, 200, { ok: true, service: 'elrest-api' })
  if (pathname === '/api/dashboard' && req.method === 'GET') return send(res, 200, await dashboard())

  const match = pathname.match(/^\/api\/([^/]+)(?:\/([^/]+))?$/)
  if (!match || !tableColumns[match[1]]) return send(res, 404, { error: 'Recurso no encontrado.', hint: 'Usa /api/dashboard o /api/<tabla>.' })
  const [, table, id] = match

  if (req.method === 'GET') {
    if (!id) return send(res, 200, await listRows(table, url))
    const result = await query(`SELECT * FROM "${table}" WHERE id = $1`, [id])
    return send(res, 200, result.rows[0] || null)
  }
  if (req.method === 'POST' && !id) return send(res, 201, await insertRow(table, await readBody(req)))
  if (req.method === 'PATCH' && id) {
    const row = await updateRow(table, id, await readBody(req))
    return row ? send(res, 200, row) : send(res, 404, { error: 'Registro no encontrado.' })
  }
  if (req.method === 'DELETE' && id) {
    const result = await query(`DELETE FROM "${table}" WHERE id = $1`, [id])
    return result.rowCount ? send(res, 204, null) : send(res, 404, { error: 'Registro no encontrado.' })
  }
  return send(res, 405, { error: 'Método no permitido.' })
}

createServer((req, res) => handle(req, res).catch(error => send(res, error.statusCode || 500, { error: databaseError(error) }))).listen(port, () => {
  console.log(`elRest API escuchando en http://localhost:${port}`)
})
