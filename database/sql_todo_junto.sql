-- QUERY TRUNCATED
-- ==========================================
-- RESET COMPLETO
-- ==========================================
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- ==========================================
-- TABLAS
-- ==========================================
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE platos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    tiempo_preparacion_minutos INTEGER CHECK (tiempo_preparacion_minutos > 0),
    calorias INTEGER CHECK (calorias >= 0),
    alergenos TEXT[] DEFAULT ARRAY[]::TEXT[],
    vegetariano BOOLEAN DEFAULT FALSE,
    vegano BOOLEAN DEFAULT FALSE,
    sin_gluten BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bebidas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    tipo VARCHAR(50) CHECK (tipo IN ('alcoholica', 'sin_alcohol', 'caliente', 'fria')),
    volumen_ml INTEGER CHECK (volumen_ml > 0),
    disponible BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE postres (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    calorias INTEGER CHECK (calorias >= 0),
    alergenos TEXT[] DEFAULT ARRAY[]::TEXT[],
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE entrantes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    tiempo_preparacion_minutos INTEGER CHECK (tiempo_preparacion_minutos > 0),
    calorias INTEGER CHECK (calorias >= 0),
    alergenos TEXT[] DEFAULT ARRAY[]::TEXT[],
    vegetariano BOOLEAN DEFAULT FALSE,
    vegano BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menus (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT,
    disponible BOOLEAN DEFAULT TRUE,
    valido_desde DATE NOT NULL,
    valido_hasta DATE,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_platos (
    menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
    plato_id UUID REFERENCES platos(id) ON DELETE CASCADE,
    tipo_plato VARCHAR(50) CHECK (tipo_plato IN ('entrante', 'principal', 'postre')),
    PRIMARY KEY (menu_id, plato_id)
);

CREATE TABLE menu_bebidas (
    menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
    bebida_id UUID REFERENCES bebidas(id) ON DELETE CASCADE,
    incluido BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (menu_id, bebida_id)
);

CREATE TABLE menu_postres (
    menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
    postre_id UUID REFERENCES postres(id) ON DELETE CASCADE,
    incluido BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (menu_id, postre_id)
);

CREATE TABLE menu_entrantes (
    menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
    entrante_id UUID REFERENCES entrantes(id) ON DELETE CASCADE,
    incluido BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (menu_id, entrante_id)
);

CREATE TABLE horarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dia_semana VARCHAR(20) CHECK (dia_semana IN ('lunes','martes','miercoles','jueves','viernes','sabado','domingo')) NOT NULL,
    hora_apertura TIME NOT NULL,
    hora_cierre TIME NOT NULL,
    cerrado BOOLEAN DEFAULT FALSE,
    notas TEXT,
    UNIQUE(dia_semana, hora_apertura)
);

CREATE TABLE mesas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero INTEGER NOT NULL UNIQUE CHECK (numero > 0),
    capacidad INTEGER NOT NULL CHECK (capacidad > 0),
    ubicacion VARCHAR(100),
    activa BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE clientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(200),
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(20),
    fecha_nacimiento DATE,
    preferencias TEXT,
    alergenos_comunes TEXT[] DEFAULT ARRAY[]::TEXT[],
    cliente_frecuente BOOLEAN DEFAULT FALSE,
    puntos_fidelidad INTEGER DEFAULT 0 CHECK (puntos_fidelidad >= 0),
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reservas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
    mesa_id UUID REFERENCES mesas(id) ON DELETE SET NULL,
    fecha_reserva DATE NOT NULL,
    hora_reserva TIME NOT NULL,
    numero_personas INTEGER NOT NULL CHECK (numero_personas > 0),
    estado VARCHAR(30) CHECK (estado IN ('pendiente','confirmada','cancelada','completada','no_show')) DEFAULT 'pendiente',
    notas_especiales TEXT,
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cargos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    salario_base DECIMAL(10,2) CHECK (salario_base >= 0),
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE empleados (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cargo_id UUID REFERENCES cargos(id) ON DELETE SET NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(200),
    email VARCHAR(255) UNIQUE,
    telefono VARCHAR(20),
    fecha_contratacion DATE NOT NULL,
    fecha_fin_contrato DATE,
    activo BOOLEAN DEFAULT TRUE,
    horario_turno VARCHAR(50),
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE turnos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    empleado_id UUID REFERENCES empleados(id) ON DELETE CASCADE,
    fecha DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    notas TEXT,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pedidos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reserva_id UUID REFERENCES reservas(id) ON DELETE SET NULL,
    mesa_id UUID REFERENCES mesas(id) ON DELETE SET NULL,
    empleado_id UUID REFERENCES empleados(id) ON DELETE SET NULL,
    fecha_pedido TIMESTAMPTZ DEFAULT NOW(),
    estado VARCHAR(30) CHECK (estado IN ('pendiente','en_preparacion','servido','pagado','cancelado')) DEFAULT 'pendiente',
    notas TEXT,
    total DECIMAL(10,2) DEFAULT 0 CHECK (total >= 0),
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pedido_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    plato_id UUID REFERENCES platos(id) ON DELETE SET NULL,
    bebida_id UUID REFERENCES bebidas(id) ON DELETE SET NULL,
    postre_id UUID REFERENCES postres(id) ON DELETE SET NULL,
    entrante_id UUID REFERENCES entrantes(id) ON DELETE SET NULL,
    menu_id UUID REFERENCES menus(id) ON DELETE SET NULL,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario >= 0),
    notas_especiales TEXT,
    preparado BOOLEAN DEFAULT FALSE,
    servido BOOLEAN DEFAULT FALSE,
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE pagos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    pedido_id UUID REFERENCES pedidos(id) ON DELETE CASCADE,
    metodo_pago VARCHAR(50) CHECK (metodo_pago IN ('efectivo','tarjeta_credito','tarjeta_debito','bizum','otro')) NOT NULL,
    monto DECIMAL(10,2) NOT NULL CHECK (monto >= 0),
    propina DECIMAL(10,2) DEFAULT 0 CHECK (propina >= 0),
    fecha_pago TIMESTAMPTZ DEFAULT NOW(),
    referencia_transaccion VARCHAR(255),
    creado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(200) NOT NULL,
    unidad_medida VARCHAR(50) NOT NULL,
    stock_actual DECIMAL(10,2) DEFAULT 0 CHECK (stock_actual >= 0),
    stock_minimo DECIMAL(10,2) CHECK (stock_minimo >= 0),
    precio_unitario DECIMAL(10,2) CHECK (precio_unitario >= 0),
    proveedor VARCHAR(200),
    creado_en TIMESTAMPTZ DEFAULT NOW(),
    actualizado_en TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE plato_ingredientes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    plato_id UUID REFERENCES platos(id) ON DELETE CASCADE,
    ingrediente_id UUID REFERENCES ingredientes(id) ON DELETE CASCADE,
    cantidad DECIMAL(10, 2) NOT NULL CHECK (cantidad > 0),
    UNIQUE(plato_id, ingrediente_id)
);

CREATE INDEX idx_platos_categoria ON platos(categoria_id);
CREATE INDEX idx_platos_disponible ON platos(disponible);
CREATE INDEX idx_reservas_fecha ON reservas(fecha_reserva, hora_reserva);
CREATE INDEX idx_pedidos_estado ON pedidos(estado);
CREATE INDEX idx_empleados_activo ON empleados(activo);

CREATE OR REPLACE FUNCTION actualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.actualizado_en = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_platos_updated BEFORE UPDATE ON platos FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_bebidas_updated BEFORE UPDATE ON bebidas FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_postres_updated BEFORE UPDATE ON postres FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_entrantes_updated BEFORE UPDATE ON entrantes FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_menus_updated BEFORE UPDATE ON menus FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_clientes_updated BEFORE UPDATE ON clientes FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_reservas_updated BEFORE UPDATE ON reservas FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_empleados_updated BEFORE UPDATE ON empleados FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_pedidos_updated BEFORE UPDATE ON pedidos FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
CREATE TRIGGER trigger_ingredientes_updated BEFORE UPDATE ON ingredientes FOR EACH ROW EXECUTE FUNCTION actualizar_timestamp();
