# elRest - Restaurante & Cocina de Autor

Página web moderna, elegante y totalmente responsiva para el restaurante **elRest**, desarrollada con **React** y estilizada con **Tailwind CSS**.

## ✨ Características

- 🍽️ **Propuesta Gastronómica Interactiva:** Filtro por categorías de platos (Entrantes, Carnes & Pescados, Arroces & Brasas, Postres, Bodega & Cócteles).
- 🏷️ **Fichas de platos completas:** Fotografía gastronómica de alta definición, descripción detallada, precios, etiquetas y alérgenos/dietas (Vegetariano, Sin Gluten, Especialidad).
- 📅 **Sistema Interactivo de Reservas:** Formulario completo para solicitar mesa con selección de fecha, turno (almuerzo o cena), número de comensales, peticiones especiales y pantalla de confirmación inmediata.
- ⭐ **Opiniones y Testimonios:** Reseñas con valoración por estrellas de clientes y críticos.
- 📍 **Horarios y Ubicación:** Información completa de apertura por días, ubicación con acceso a Google Maps, teléfono de contacto y enlaces sociales.
- 📱 **Diseño 100% Responsivo:** Menú móvil tipo drawer, tipografías elegantes (Playfair Display + Plus Jakarta Sans) y modo oscuro sofisticado con toques dorados/ámbar.

## 🚀 Cómo ejecutar en desarrollo

1. Instalar dependencias (ya instaladas):
   ```bash
   npm install
   ```

2. Iniciar el servidor local de desarrollo:
   ```bash
   npm run dev
   ```

3. Compilar para producción:
   ```bash
   npm run build
   ```

4. Previsualizar la compilación de producción:
   ```bash
   npm run preview
   ```

## API de gestión

El backend REST vive en `server/` y usa PostgreSQL con el esquema de `database/sql_todo_junto.sql`.

1. Copia `.env.example` a `.env` y configura `DATABASE_URL`.
2. Ejecuta el esquema y, si quieres datos iniciales, `database/sql_20261124_seeder.sql`.
3. Arranca la API:
   ```bash
   npm run api
   ```

Endpoints: `GET /api/health`, `GET /api/dashboard` y CRUD (`GET`, `POST`, `PATCH`, `DELETE`) para las tablas del esquema.
