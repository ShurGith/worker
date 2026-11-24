-- ==========================================
-- INSERCIÓN DE DATOS (Corregido para evitar errores de FK)
-- ==========================================

-- X. Eliminar la restricción UNIQUE que causa el conflicto
ALTER TABLE horarios DROP CONSTRAINT IF EXISTS horarios_dia_semana_key;


-- 1. Categorías
INSERT INTO categorias (nombre, descripcion) VALUES
('Carnes', 'Platos principales a base de carne'),
('Pescados', 'Platos de pescado y mariscos'),
('Vegetarianos', 'Opciones vegetarianas'),
('Pastas', 'Platos de pasta artesanal'),
('Ensaladas', 'Ensaladas frescas y variadas');

-- 2. Platos principales 
-- NOTA: Usamos los nombres EXACTOS de las categorías insertadas arriba
INSERT INTO platos (categoria_id, nombre, descripcion, precio, imagen_url, tiempo_preparacion_minutos, calorias, alergenos, vegetariano, vegano, sin_gluten) 
SELECT c.id, p.nombre, p.descripcion, p.precio, p.imagen_url, p.tiempo, p.calorias, p.alergenos::TEXT[], p.veg, p.vegan, p.sg
FROM (VALUES
    ('Carnes', 'Solomillo a la pimienta', 'Solomillo de ternera con salsa de pimienta verde', 24.50, '/images/solomillo.jpg', 25, 650, ARRAY['lacteos']::TEXT[], FALSE, FALSE, TRUE),
    ('Carnes', 'Entrecot a la brasa', 'Entrecot de buey madurado 45 días', 28.90, '/images/entrecot.jpg', 30, 780, ARRAY[]::TEXT[], FALSE, FALSE, TRUE),
    ('Pescados', 'Lubina a la sal', 'Lubina fresca cocinada en costra de sal', 22.00, '/images/lubina.jpg', 35, 420, ARRAY['pescado']::TEXT[], FALSE, FALSE, TRUE),
    ('Pescados', 'Gambas al ajillo', 'Gambas frescas salteadas con ajo y guindilla', 16.50, '/images/gambas.jpg', 15, 320, ARRAY['crustaceos', 'ajo']::TEXT[], FALSE, FALSE, TRUE),
    ('Vegetarianos', 'Risotto de setas', 'Arroz cremoso con variedad de setas silvestres', 18.00, '/images/risotto.jpg', 25, 520, ARRAY['lacteos']::TEXT[], TRUE, FALSE, FALSE),
    ('Pastas', 'Tagliatelle alla bolognesa', 'Pasta fresca con ragú de ternera', 15.50, '/images/tagliatelle.jpg', 20, 680, ARRAY['gluten', 'lacteos']::TEXT[], FALSE, FALSE, FALSE),
    ('Ensaladas', 'Ensalada César', 'Lechuga romana, pollo, parmesano y crutones', 12.00, '/images/cesar.jpg', 10, 380, ARRAY['gluten', 'lacteos', 'huevo']::TEXT[], FALSE, FALSE, FALSE)
) AS p(cat, nombre, descripcion, precio, imagen_url, tiempo, calorias, alergenos, veg, vegan, sg)
JOIN categorias c ON c.nombre = p.cat;

-- 3. Bebidas
INSERT INTO bebidas (nombre, descripcion, precio, imagen_url, tipo, volumen_ml, disponible) VALUES
('Agua mineral', 'Agua natural sin gas', 2.50, '/images/agua.jpg', 'sin_alcohol', 500, TRUE),
('Coca-Cola', 'Refresco de cola', 3.00, '/images/cocacola.jpg', 'sin_alcohol', 330, TRUE),
('Cerveza Estrella Galicia', 'Cerveza rubia gallega', 3.50, '/images/cerveza.jpg', 'alcoholica', 330, TRUE),
('Vino tinto Rioja', 'Vino tinto crianza D.O. Rioja', 4.50, '/images/vino-tinto.jpg', 'alcoholica', 150, TRUE),
('Vino blanco Albariño', 'Vino blanco joven D.O. Rías Baixas', 4.50, '/images/vino-blanco.jpg', 'alcoholica', 150, TRUE),
('Café solo', 'Café espresso', 1.80, '/images/cafe.jpg', 'caliente', 50, TRUE),
('Café con leche', 'Café espresso con leche', 2.20, '/images/cafe-leche.jpg', 'caliente', 150, TRUE),
('Zumo natural naranja', 'Zumo recién exprimido', 3.50, '/images/zumo.jpg', 'fria', 250, TRUE),
('Sangría', 'Sangría casera con frutas de temporada', 12.00, '/images/sangria.jpg', 'alcoholica', 1000, TRUE);

-- 4. Postres
INSERT INTO postres (nombre, descripcion, precio, imagen_url, calorias, alergenos) VALUES
('Tarta de queso', 'Tarta de queso al horno estilo New York', 6.50, '/images/tarta-queso.jpg', 450, ARRAY['lacteos', 'gluten', 'huevo']::TEXT[]),
('Tiramisú', 'Postre italiano con café y mascarpone', 7.00, '/images/tiramisu.jpg', 380, ARRAY['lacteos', 'gluten', 'huevo']::TEXT[]),
('Flan casero', 'Flan de huevo con caramelo', 5.00, '/images/flan.jpg', 280, ARRAY['lacteos', 'huevo']::TEXT[]),
('Sorbetes de limón', 'Sorbet refrescante de limón', 4.50, '/images/sorbete.jpg', 150, ARRAY[]::TEXT[]),
('Brownie con helado', 'Brownie de chocolate caliente con helado de vainilla', 7.50, '/images/brownie.jpg', 620, ARRAY['lacteos', 'gluten', 'huevo', 'frutos_secos']::TEXT[]);

-- 5. Entrantes
INSERT INTO entrantes (nombre, descripcion, precio, imagen_url, tiempo_preparacion_minutos, calorias, alergenos, vegetariano, vegano) VALUES
('Croquetas de jamón', 'Croquetas caseras de jamón ibérico (6 unidades)', 9.50, '/images/croquetas.jpg', 15, 420, ARRAY['gluten', 'lacteos', 'huevo']::TEXT[], FALSE, FALSE),
('Pan con tomate', 'Pan tostado con tomate rallado y aceite de oliva', 4.50, '/images/pan-tomate.jpg', 5, 180, ARRAY['gluten']::TEXT[], TRUE, TRUE),
('Tabla de quesos', 'Selección de quesos nacionales con membrillo', 12.00, '/images/quesos.jpg', 10, 520, ARRAY['lacteos']::TEXT[], TRUE, FALSE),
('Calamares a la romana', 'Anillas de calamar rebozadas y fritas', 10.50, '/images/calamares.jpg', 15, 380, ARRAY['gluten', 'moluscos']::TEXT[], FALSE, FALSE),
('Hummus con pan pita', 'Crema de garbanzos con especias y pan pita', 7.50, '/images/hummus.jpg', 10, 290, ARRAY['gluten', 'sesamo']::TEXT[], TRUE, TRUE),
('Jamón ibérico', 'Jamón ibérico de bellota cortado a mano (100g)', 18.00, '/images/jamon.jpg', 5, 350, ARRAY[]::TEXT[], FALSE, FALSE);

-- 6. Menús
INSERT INTO menus (nombre, descripcion, precio, imagen_url, valido_desde, valido_hasta) VALUES
('Menú del día', 'Entrante + Plato principal + Postre + Bebida', 15.90, '/images/menu-dia.jpg', '2026-01-01', NULL),
('Menú ejecutivo', 'Para comidas de trabajo rápidas', 18.50, '/images/menu-ejecutivo.jpg', '2026-01-01', NULL),
('Menú degustación', 'Experiencia gastronómica completa (5 tiempos)', 45.00, '/images/menu-degustacion.jpg', '2026-01-01', '2026-12-31'),
('Menú infantil', 'Especial para los más pequeños', 9.90, '/images/menu-infantil.jpg', '2026-01-01', NULL);

-- 7. Relación Menús - Platos (Usando JOINs seguros)
INSERT INTO menu_platos (menu_id, plato_id, tipo_plato)
SELECT m.id, p.id, mp.tipo
FROM (VALUES
    ('Menú del día', 'Ensalada César', 'entrante'),
    ('Menú del día', 'Solomillo a la pimienta', 'principal'),
    ('Menú ejecutivo', 'Tagliatelle alla bolognesa', 'principal'),
    ('Menú degustación', 'Gambas al ajillo', 'principal'),
    ('Menú degustación', 'Lubina a la sal', 'principal')
) AS mp(menu_nom, plato_nom, tipo)
JOIN menus m ON m.nombre = mp.menu_nom
JOIN platos p ON p.nombre = mp.plato_nom;

-- Relación Menús - Postres (El menú del día incluye flan)
INSERT INTO menu_postres (menu_id, postre_id, incluido)
SELECT m.id, po.id, TRUE
FROM (VALUES
    ('Menú del día', 'Flan casero'),
    ('Menú ejecutivo', 'Tarta de queso'),
    ('Menú degustación', 'Tiramisú')
) AS mp(menu_nom, postre_nom)
JOIN menus m ON m.nombre = mp.menu_nom
JOIN postres po ON po.nombre = mp.postre_nom;

-- Relación Menús - Bebidas
INSERT INTO menu_bebidas (menu_id, bebida_id, incluido)
SELECT m.id, b.id, TRUE
FROM (VALUES
    ('Menú del día', 'Agua mineral'),
    ('Menú del día', 'Vino tinto Rioja'),
    ('Menú ejecutivo', 'Agua mineral'),
    ('Menú ejecutivo', 'Café solo'),
    ('Menú degustación', 'Vino tinto Rioja'),
    ('Menú degustación', 'Vino blanco Albariño')
) AS mb(menu_nom, beb_nom)
JOIN menus m ON m.nombre = mb.menu_nom
JOIN bebidas b ON b.nombre = mb.beb_nom;

-- 8. Horarios
INSERT INTO horarios (dia_semana, hora_apertura, hora_cierre, cerrado, notas) VALUES
('lunes', '13:00', '16:00', FALSE, 'Solo servicio de mediodía'),
('martes', '13:00', '16:00', FALSE, NULL),
('miercoles', '13:00', '16:00', FALSE, NULL),
('jueves', '13:00', '16:00', FALSE, NULL),
('viernes', '13:00', '16:00', FALSE, NULL),
('sabado', '13:00', '16:00', FALSE, NULL),
('domingo', '13:00', '16:00', FALSE, NULL),
('viernes', '20:00', '23:30', FALSE, 'Servicio de cenas'),
('sabado', '20:00', '23:30', FALSE, 'Servicio de cenas');

-- 9. Mesas
INSERT INTO mesas (numero, capacidad, ubicacion, activa) VALUES
(1, 2, 'Terraza', TRUE),
(2, 2, 'Terraza', TRUE),
(3, 4, 'Sala principal', TRUE),
(4, 4, 'Sala principal', TRUE),
(5, 6, 'Sala principal', TRUE),
(6, 2, 'Barra', TRUE),
(7, 8, 'Salón privado', TRUE),
(8, 4, 'Sala principal', TRUE),
(9, 2, 'Terraza', TRUE),
(10, 6, 'Sala principal', TRUE);

-- 10. Clientes
INSERT INTO clientes (nombre, apellidos, email, telefono, fecha_nacimiento, preferencias, alergenos_comunes, cliente_frecuente, puntos_fidelidad) VALUES
('María', 'García López', 'maria.garcia@email.com', '612345678', '1985-03-15', 'Prefiere mesa cerca de ventana', ARRAY[]::TEXT[], TRUE, 150),
('Juan', 'Martínez Ruiz', 'juan.martinez@email.com', '623456789', '1978-07-22', 'Alérgico a los frutos secos', ARRAY['frutos_secos']::TEXT[], TRUE, 230),
('Ana', 'Rodríguez Sánchez', 'ana.rodriguez@email.com', '634567890', '1990-11-08', 'Vegetariana', ARRAY[]::TEXT[], FALSE, 45),
('Carlos', 'Fernández Pérez', 'carlos.fernandez@email.com', '645678901', '1982-05-30', NULL, ARRAY[]::TEXT[], TRUE, 180),
('Laura', 'Gómez Díaz', 'laura.gomez@email.com', '656789012', '1995-09-12', 'Sin gluten', ARRAY['gluten']::TEXT[], FALSE, 20);

-- 11. Reservas (CORREGIDO CON CASTS EXPLÍCITOS)
INSERT INTO reservas (cliente_id, mesa_id, fecha_reserva, hora_reserva, numero_personas, estado, notas_especiales)
SELECT c.id, me.id, r.fecha::DATE, r.hora::TIME, r.personas, r.estado, r.notas
FROM (VALUES
    ('maria.garcia@email.com', 3, '2026-11-25', '14:00', 2, 'confirmada', 'Cumpleaños - preparar sorpresa'),
    ('juan.martinez@email.com', 5, '2026-11-25', '14:30', 4, 'confirmada', NULL),
    ('ana.rodriguez@email.com', 1, '2026-11-26', '13:30', 2, 'pendiente', 'Opciones vegetarianas por favor'),
    ('carlos.fernandez@email.com', 7, '2026-11-27', '21:00', 6, 'confirmada', 'Cena de empresa'),
    ('laura.gomez@email.com', 2, '2026-11-28', '14:00', 2, 'pendiente', 'Menú sin gluten')
) AS r(email, mesa_num, fecha, hora, personas, estado, notas)
JOIN clientes c ON c.email = r.email
JOIN mesas me ON me.numero = r.mesa_num;

-- 12. Cargos
INSERT INTO cargos (nombre, descripcion, salario_base) VALUES
('Gerente', 'Responsable general del restaurante', 3500.00),
('Chef ejecutivo', 'Jefe de cocina', 3200.00),
('Cocinero', 'Preparación de platos', 2200.00),
('Ayudante de cocina', 'Apoyo en cocina', 1800.00),
('Camarero/a', 'Atención al cliente y servicio', 1600.00),
('Jefe de sala', 'Supervisión del servicio', 2400.00),
('Barman', 'Preparación de bebidas', 2000.00),
('Lavaplatos', 'Limpieza de vajilla', 1500.00);
-- 13. Empleados (CORREGIDO CON ::DATE)
INSERT INTO empleados (cargo_id, nombre, apellidos, email, telefono, fecha_contratacion, activo, horario_turno)
SELECT ca.id, e.nombre, e.apellidos, e.email, e.tel, e.fecha::DATE, e.activo, e.turno
FROM (VALUES
    ('Gerente', 'Roberto', 'Sánchez Morales', 'roberto.sanchez@restaurante.com', '611222333', '2020-01-15', TRUE, 'Completo'),
    ('Chef ejecutivo', 'Isabel', 'Moreno Jiménez', 'isabel.moreno@restaurante.com', '622333444', '2019-06-01', TRUE, 'Mañana'),
    ('Cocinero', 'David', 'López Torres', 'david.lopez@restaurante.com', '633444555', '2021-03-10', TRUE, 'Mañana'),
    ('Cocinero', 'Carmen', 'Ruiz Navarro', 'carmen.ruiz@restaurante.com', '644555666', '2022-01-20', TRUE, 'Tarde'),
    ('Ayudante de cocina', 'Miguel', 'Álvarez Castro', 'miguel.alvarez@restaurante.com', '655666777', '2023-05-15', TRUE, 'Mañana'),
    ('Jefe de sala', 'Patricia', 'Herrera Vega', 'patricia.herrera@restaurante.com', '666777888', '2020-09-01', TRUE, 'Completo'),
    ('Camarero/a', 'Alejandro', 'Díaz Romero', 'alejandro.diaz@restaurante.com', '677888999', '2022-07-01', TRUE, 'Mañana'),
    ('Camarero/a', 'Sofía', 'Martín Gil', 'sofia.martin@restaurante.com', '688999000', '2023-02-15', TRUE, 'Tarde'),
    ('Barman', 'Javier', 'Ortiz Blanco', 'javier.ortiz@restaurante.com', '699000111', '2021-11-01', TRUE, 'Tarde'),
    ('Lavaplatos', 'Antonio', 'Ramos Suárez', 'antonio.ramos@restaurante.com', '600111222', '2023-08-01', TRUE, 'Completo')
) AS e(cargo, nombre, apellidos, email, tel, fecha, activo, turno)
JOIN cargos ca ON ca.nombre = e.cargo;

-- 14. Turnos (CORREGIDO CON ::DATE Y ::TIME)
INSERT INTO turnos (empleado_id, fecha, hora_inicio, hora_fin, notas)
SELECT emp.id, t.fecha::DATE, t.inicio::TIME, t.fin::TIME, t.notas
FROM (VALUES
    ('isabel.moreno@restaurante.com', '2026-11-24', '08:00', '16:00', NULL),
    ('david.lopez@restaurante.com', '2026-11-24', '08:00', '16:00', NULL),
    ('patricia.herrera@restaurante.com', '2026-11-24', '12:00', '16:00', NULL),
    ('sofia.martin@restaurante.com', '2026-11-24', '12:00', '16:00', NULL)
) AS t(email, fecha, inicio, fin, notas)
JOIN empleados emp ON emp.email = t.email;

-- 15. Pedidos (CORREGIDO CON ::TIMESTAMP)
INSERT INTO pedidos (reserva_id, mesa_id, empleado_id, fecha_pedido, estado, total, notas)
SELECT NULL::UUID, m.id, e.id, p.fecha::TIMESTAMP, p.estado, p.total, p.notas
FROM (VALUES
    (3, 'alejandro.diaz@restaurante.com', '2026-11-23 14:15:00', 'pagado', 45.50, NULL),
    (5, 'sofia.martin@restaurante.com', '2026-11-24 13:45:00', 'en_preparacion', 38.00, NULL)
) AS p(mesa_num, emp_email, fecha, estado, total, notas)
JOIN mesas m ON m.numero = p.mesa_num
JOIN empleados e ON e.email = p.emp_email;

-- 16. Items de pedido
INSERT INTO pedido_items (pedido_id, plato_id, cantidad, precio_unitario, preparado, servido)
SELECT ped.id, plat.id, 1, 24.50, TRUE, TRUE
FROM pedidos ped
JOIN platos plat ON plat.nombre = 'Solomillo a la pimienta'
WHERE ped.estado = 'pagado'
LIMIT 1;

INSERT INTO pedido_items (pedido_id, plato_id, cantidad, precio_unitario, preparado, servido)
SELECT ped.id, plat.id, 2, 22.00, TRUE, FALSE
FROM pedidos ped
JOIN platos plat ON plat.nombre = 'Lubina a la sal'
WHERE ped.estado = 'en_preparacion'
LIMIT 1;

-- 17. Pagos
INSERT INTO pagos (pedido_id, metodo_pago, monto, propina, referencia_transaccion)
SELECT ped.id, 'tarjeta_credito', 45.50, 5.00, 'TXN-20261123-001'
FROM pedidos ped
WHERE ped.estado = 'pagado'
LIMIT 1;

-- 18. Ingredientes
INSERT INTO ingredientes (nombre, unidad_medida, stock_actual, stock_minimo, precio_unitario, proveedor) VALUES
('Solomillo de ternera', 'kg', 15.5, 5.0, 28.50, 'Cárnicas Premium S.L.'),
('Lubina fresca', 'kg', 8.0, 3.0, 18.00, 'Pescadería El Puerto'),
('Gambas frescas', 'kg', 6.5, 2.0, 22.00, 'Pescadería El Puerto'),
('Arroz bomba', 'kg', 25.0, 10.0, 3.50, 'Distribuciones Alimentarias'),
('Aceite de oliva virgen extra', 'litros', 20.0, 5.0, 8.50, 'Cooperativa Oleícola'),
('Tomates', 'kg', 12.0, 4.0, 2.20, 'Frutas y Verduras Frescas'),
('Lechuga romana', 'unidades', 30.0, 10.0, 1.20, 'Frutas y Verduras Frescas'),
('Queso parmesano', 'kg', 3.5, 1.0, 32.00, 'Lácteos Selectos'),
('Jamón ibérico de bellota', 'kg', 5.0, 2.0, 65.00, 'Embutidos Ibéricos'),
('Setas variadas', 'kg', 4.0, 1.5, 12.00, 'Productos del Bosque'),
('Harina de trigo', 'kg', 30.0, 10.0, 1.20, 'Molinos del Sur'),
('Huevos', 'docenas', 15.0, 5.0, 3.50, 'Granja Ecológica'),
('Leche entera', 'litros', 20.0, 8.0, 1.10, 'Lácteos Selectos'),
('Mantequilla', 'kg', 5.0, 2.0, 9.50, 'Lácteos Selectos'),
('Chocolate negro 70%', 'kg', 3.0, 1.0, 15.00, 'Chocolates Artesanos');

-- 19. Relación Platos - Ingredientes
INSERT INTO plato_ingredientes (plato_id, ingrediente_id, cantidad)
SELECT p.id, i.id, pi.cant
FROM (VALUES
    ('Solomillo a la pimienta', 'Solomillo de ternera', 0.25),
    ('Solomillo a la pimienta', 'Mantequilla', 0.03),
    ('Lubina a la sal', 'Lubina fresca', 0.8),
    ('Gambas al ajillo', 'Gambas frescas', 0.2),
    ('Risotto de setas', 'Arroz bomba', 0.15),
    ('Risotto de setas', 'Setas variadas', 0.12)
) AS pi(plato, ing, cant)
JOIN platos p ON p.nombre = pi.plato
JOIN ingredientes i ON i.nombre = pi.ing;