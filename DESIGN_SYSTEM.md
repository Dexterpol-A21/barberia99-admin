# Sistema de Diseño - Barbería 99

Este documento recopila las decisiones de diseño, identidad visual y recursos gráficos del proyecto.

## 1. Tipografía

### Principal (Display)
*   **Fuente:** `Zodiak` (Serif Display)
*   **Peso:** Bold (700)
*   **Uso:** 
    *   Títulos H1, H2, H3.
    *   Logotipo ("Barbería", "99").
    *   Frases de impacto ("Tu mejor versión...").

### Secundaria (Body)
*   **Fuente:** `Plus Jakarta Sans` (Sans Serif Geometric)
*   **Pesos:** Light (300), Regular (400), Medium (500), Bold (700).
*   **Uso:**
    *   Cuerpo de texto.
    *   Menú de navegación.
    *   Botones.
    *   Detalles pequeños ("Est. 2026", "Ingeniería de imagen...").

---

## 2. Paleta de Colores

| Nombre | Hex | Descripción | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Carbon** | `#121212` | Negro Suave (Off-Black) | Fondos oscuros, Textos principales. |
| **Bone** | `#F5F5F5` | Blanco Hueso (Off-White) | Fondos claros, Textos sobre oscuro. |
| **Amber** | `#A67C52` | Ámbar / Dorado Bronce | **Color de Acento**. Botones, Hovers, Detalles destacados. |
| **Cement** | `#4A4A4A` | Gris Cemento | Textos secundarios, líneas divisorias, iconos inactivos. |

---

## 3. Identidad de Marca (Logo)

El logo se compone de dos bloques separados por una línea vertical.

### Estructura
1.  **Bloque Izquierdo (Texto):**
    *   "Barbería" (Zodiak, Uppercase, Tracking amplio).
    *   "Est. 2026" (Jakarta Sans, Pequeño, Color Cement, debajo de "Barbería").
2.  **Elemento Central:**
    *   Línea divisoria vertical (`w-[1px]`, opacidad reducida).
3.  **Bloque Derecho (Isotipo):**
    *   Número "99" (Zodiak, Grande).
    *   **Bigote:** Elemento gráfico vectorial superpuesto sobre el 99.
    *   **Estilo:** El diseño final aprobado es **Sólido** (Relleno completo), descartando las versiones "Outline" (solo borde).

### Variantes
*   **Header:** Alineación horizontal. "Barbería" y "Est. 2026" a la izquierda, línea, "99+Bigote" a la derecha. Ajuste óptico vertical (`translate-y-2`) en el bloque derecho.
*   **Circular:** Usado en redes sociales/favicon. Círculo sólido con el "99" y bigote centrados.
*   **Hero (Título):** Versión gigante del nombre donde el "99" también integra el bigote.

---

## 4. Copywriting y Mensajes

### Hero Section
*   **Título Principal:** "BARBERÍA 99"
*   **Slogan de Marca:** "Tu mejor versión al 99%"
*   **Descripción (Value Proposition):** 
    > "Ingeniería de imagen: corte y cuidado de barba con estándares profesionales en Coacalco."
*   **Lista de Servicios (Ticker):**
    > CORTES CLÁSICOS • AFEITADO TRADICIONAL • FADES • ARREGLO DE BARBA • ESTILO URBANO

### Botones (CTAs)

#### 1. Principal: "Reservar Cita" (`.btn-cta`)
*   **Estilo:** Degradado Ámbar (`Gold/Bronze gradient`).
*   **Comportamiento:**
    *   **Normal:** Texto blanco, fondo vibrante.
    *   **Hover:** Desplazamiento del degradado, aumento de brillo.
    *   **Glow:** Sombra difusa color ámbar (`rgba(166, 124, 82, 0.5)`).

#### 2. Secundario: "Nuestros Servicios" (`.btn-secondary`) - *Nuevo (Stealth/Black Flash)*
*   **Concepto:** "Glassmorphism" oscuro que se vuelve sólido.
*   **Estilo Base:**
    *   Fondo: `rgba(0, 0, 0, 0.4)` (Vidrio Ahumado).
    *   Borde: Blanco sutil (`10% opacity`).
    *   Efecto: `backdrop-filter: blur(5px)`.
*   **Interacción (Hover):**
    *   **Fondo:** Se vuelve **Negro Sólido** (`#000000`).
    *   **Borde:** Se oscurece a un gris carbón (`#333`).
    *   **Animación:** Un destello de luz ("Flash Shine") cruza el botón diagonalmente de izquierda a derecha.
    *   **Sombra:** Resplandor oscuro para dar profundidad ("Levitación").

---

## 5. Recursos Gráficos

### Iconografía
*   **Bigote:** SVG estilo "Handlebar", terminaciones curvas hacia arriba. Grosor de línea: 2px (en versiones pequeñas) o 1.5px (en versiones grandes).
*   **Redes Sociales:** Iconos simples, trazo limpio.

### Estilos UI
*   **Bordes:** Finos (1px), generalmente con opacidad reducida (10% - 20%).
*   **Sombras:** Suaves y difusas para dar profundidad sin ensuciar (`shadow-xl`).
*   **Esquinas:** Ligeramente redondeadas (`rounded-sm`) para mantener un carácter masculino y firme, pero no agresivo.
