# ESTRATEGIA DE GESTIÓN DEL MENÚ (CLIENTE & ADMIN)

## Concepto Elegido
Se implementa un modelo **híbrido (Estructura Fija / Contenido Dinámico)**, donde las **4 categorías principales de servicios están fijadas en el código**, pero los **servicios exactos, precios y promociones se extraen de la base de datos**.

### ¿Por qué esta es la mejor opción?
1. **Protección del Diseño Frontend:** Al fijar el número de categorías, elementos como cuadrículas (CSS Grids), iconos en el Layout y banners del Inicio en `barberia99` nunca se van a romper por falta o exceso de secciones.
2. **Flexibilidad Operativa:** El dueño podrá actualizar si un corte sube de precio sin requerirte a ti como programador, manteniendo la plataforma como "Software as a Service" (SaaS). 

---

## 1. Reglas de la Base de Datos (Tabla `services`)
Crearemos una tabla que contenga:
- `id` (UUID)
- `category` (ENUM: `'cortes', 'barba', 'facial', 'combos'`) -> **Controlador principal**
- `name` (String) -> Ej. "Corte Fade"
- `price` (Numeric) -> Ej. 250.00
- `duration_minutes` (Int) -> Ej. 30 (Fundamental para los bloques de la función de 'Agendar')
- `is_featured` (Boolean) -> Para el top 3.

---

## 2. Impacto en la Aplicación del Cliente (`barberia99.com`)

### A. Página de Inicio (`/index`)
- Los módulos visuales leerán todos los servicios de una categoría y buscarán el precio MENOR usando lógica en el backend (EJ: `Math.min(...precios)`) para pintar el letrero: **"Desde $150"**.

### B. Página General de Servicios (`/servicios`)
- Las tarjetas grandes de cada categoría mostrarán **solo** los servicios que tengan el switch de `is_featured = true`.
- Habrá una restricción lógica (ya sea en la base de datos o en la UI del Admin) para invitar a seleccionar exactamente **3 servicios destacados** por categoría.

### C. Páginas de Categoría Específica (`/servicios/rutina-facial` etc.)
- Carga completa de la tabla filtrando por `category === 'facial'`. Listado tipo "Menú de Restaurante".

### D. Flujo de Agendar Citas (`/agendar`)
- Los selectores de servicio tomarán de esta tabla el `name`, el `price` (para el ticket) y la duración (`duration_minutes`) para bloquear correctamente el espacio de la agenda del barbero seleccionado.

---

## 3. Impacto en la Aplicación Administrativa (`dashboard/menu`)
- Panel con 4 columnas / Acordeones estáticos (uno por categoría).
- Un botón por categoría para `+ Añadir Servicio`.
- Un Check/Estrella interactiva para marcar el servicio como `Destacado` (Top 3).
