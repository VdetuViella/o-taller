<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend: diseño sin aspecto de IA

Antes de escribir o cambiar UI visible (páginas, layouts, componentes, estilos, motion, estados vacíos), lee las skills que correspondan y síguelas. Una página web de este proyecto no puede salir con el aspecto por defecto de un modelo: hero centrado, gradiente morado, tres cards iguales, Inter, glassmorphism en todo, iconos gruesos y sombras duras.

No leas todas las skills a la vez. Sigue el orden y abre solo las que encajen con la tarea. Las skills del repo están en `.agents/skills/<nombre>/SKILL.md`. Las de plugin se leen por su nombre (Cursor ya las tiene instaladas).

## Orden

1. Lee `anti-slop-ui` y `design-taste-frontend`. Declara en una línea qué tipo de página, audiencia y dirección visual vas a usar. `design-taste-frontend-v1` solo si se pide compatibilidad con la v1.
2. Lee `refero-design` (plugin Refero). El diseño se ancla en referencias reales antes de implementar. Mobbin entra cuando haga falta ver cómo resuelven el mismo flujo apps de producción.
3. Si vas a tocar HTML, CSS o JS de cliente, lee `modern-web-guidance` antes de inventar un patrón.
4. Elige **una** dirección estética de la lista de abajo. No las mezcles.
5. Lee la skill de la herramienta (Figma, GSAP, shadcn, Magic Patterns, etc.) y la regla de `.cursor/rules/` del tipo de pantalla.
6. Implementa la UI completa. Si el entregable es largo, aplica `full-output-enforcement`: sin placeholders, sin TODOs, sin componentes a medias.
7. Verifica el flujo en el navegador.

## Skills del proyecto

| Skill | Cuándo leerla |
| --- | --- |
| `anti-slop-ui` | Siempre en UI nueva, edición visual o limpieza de slop. Elige una escuela de diseño y las capas; lee siempre la blacklist `base-ai-slop`. |
| `design-taste-frontend` | Landing, portfolio, marketing y rediseños. Es la skill de gusto por defecto. |
| `design-taste-frontend-v1` | Solo si hace falta el comportamiento exacto de la v1. |
| `redesign-existing-projects` | Mejorar una web o app que ya existe sin reescribirla. Audita primero. |
| `high-end-visual-design` | Dirección de agencia: tipografía, spacing, sombras, cards y motion de alto nivel. |
| `minimalist-ui` | Editorial limpio: monocromo cálido, contraste tipográfico, bento plano, sin gradientes ni sombras pesadas. |
| `industrial-brutalist-ui` | Dashboards, portfolios o editorial con rejilla rígida, tipo suizo y estética de terminal. |
| `gpt-taste` | Motion editorial con GSAP: ScrollTrigger, bento sin huecos, tipografía ancha, estructura AIDA. |
| `stitch-design-taste` | Generar un `DESIGN.md` con sistema semántico anti-genérico (Stitch). |
| `imagegen-frontend-web` | Referencias visuales de una web: una imagen horizontal por sección, nunca un tablero comprimido. |
| `imagegen-frontend-mobile` | Pantallas de app móvil. Solo imágenes, no código. |
| `image-to-code` | Tarea visual importante: generar las imágenes, analizarlas e implementar la web para que coincida. |
| `brandkit` | Identidad: logo, tableros de marca, decks y mundo visual. |
| `full-output-enforcement` | Cualquier entrega de UI que no pueda quedar truncada. |

## Plugins de diseño

### Refero

Investigación de interfaces reales. Skill: `refero-design`. Úsala en diseño de producto, landings, dashboards, sistemas, tipografía, color, spacing, motion, iconos, accesibilidad y anti-slop, aunque nadie nombre Refero. Va antes que una skill genérica de “hazlo bonito”.

### Mobbin

Referencias de pantallas reales (apps y webs). No tiene skill: sigue la regla del plugin y usa sus herramientas MCP cuando pregunten por un patrón (onboarding, checkout, settings, navegación, pricing) o cuando haya que copiar la estructura de un flujo que ya existe en producción.

### Magic Patterns

Prototipos e inspiración en magicpatterns.com.

| Skill | Cuándo |
| --- | --- |
| `inspiration` | Varias direcciones de una pantalla antes de comprometerse. |
| `prototype` | Prototipar una idea a partir de la UI local. |
| `upload-to-magic-patterns` | Subir la UI local al editor para revisarla. |
| `integrate-magic-patterns-design` | Traer un diseño de Magic Patterns al repo. El export es spec, no código para pegar tal cual. |
| `recreate-as-react` | Recrear una pantalla como prototipo React + Tailwind. |
| `recreate-as-raw-html` | Recrear una pantalla como un solo HTML autónomo. |

### Superdesign

Skill: `superdesign`. Canvas para diseñar o rediseñar páginas, flujos, sistemas, componentes, presentaciones y gráficos. Úsala cuando el trabajo sea explorar variantes o un draft visual, no para sustituir la implementación en el repo.

### Wonder

Canvas donde el diseño es código real (MCP, sin skill). Úsalo para crear o editar diseños en el canvas y mantener design y código alineados.

### Figma

Lee la skill **antes** de llamar a la herramienta que indica.

| Skill | Cuándo |
| --- | --- |
| `figma-design-to-code` | Implementar un diseño de Figma en código. Obligatoria antes de `get_design_context`. |
| `figma-code-connect` | Mapear componentes de Figma a código. |
| `figma-generate-design` | Llevar una página o vista del producto a Figma. |
| `figma-generate-library` | Sistema de diseño en Figma desde el código: tokens, variantes, temas. |
| `figma-use` | Cualquier escritura o lectura por API del plugin en el archivo. Obligatoria antes de `use_figma`. |
| `figma-use-motion` | Animar nodos en Figma. Junto con `figma-use`. |
| `figma-implement-motion` | Pasar motion de Figma a código de la app. |
| `figma-create-new-file` | Crear un archivo nuevo de Design, FigJam o Slides. |
| `figma-generate-diagram` | Diagramas en FigJam. Obligatoria antes de `generate_diagram`. |
| `figma-use-figjam` | Trabajar en FigJam. |
| `figma-use-slides` | Trabajar en Slides. |
| `figma-shaders` | Shaders o fills procedurales en Figma. |
| `figma-generative-plugins` | Plugins generativos de Figma. |
| `figma-swiftui` | Solo si el destino es SwiftUI / iOS nativo, no la web. |

### GSAP

Animación de interfaz. En React/Next lee `gsap-react`, no `gsap-frameworks`.

| Skill | Cuándo |
| --- | --- |
| `gsap-core` | Tweens, easing, stagger, `matchMedia`, reduced motion. |
| `gsap-react` | GSAP en React o Next: `useGSAP`, refs y cleanup. |
| `gsap-frameworks` | Vue, Nuxt, Svelte o SvelteKit. |
| `gsap-timeline` | Secuencias y coreografía. |
| `gsap-scrolltrigger` | Scroll, pin, scrub, parallax. |
| `gsap-plugins` | ScrollSmoother, Flip, Draggable, SplitText y el resto de plugins. |
| `gsap-performance` | Jank, transforms, 60 fps. |
| `gsap-utils` | `clamp`, `mapRange`, `snap`, `wrap` y utilidades. |

### shadcn/ui

| Skill | Cuándo |
| --- | --- |
| `shadcn` (plugin shadcn) | Añadir, buscar, componer, depurar o tematizar componentes. También `components.json`, registries y presets. |
| `shadcn` (plugin Vercel) | La misma familia de trabajo cuando el contexto es el proyecto en Vercel: CLI, composición, tema y Tailwind. Lee una; si el proyecto ya usa el plugin de shadcn, prioriza ese. |

### Vercel (solo lo que afecta a la UI)

| Skill | Cuándo |
| --- | --- |
| `nextjs` | App Router, layouts, Server Components, data fetching y rendering. Además, la guía en `node_modules/next/dist/docs/` que exige el bloque de arriba. |
| `react-best-practices` | Después de editar varios componentes TSX: estructura, hooks, accesibilidad y rendimiento. |
| `next-cache-components` | Cache Components, PPR y `use cache`. |
| `next-upgrade` | Subir de versión de Next. |
| `turbopack` | Bundler, HMR y builds de Next. |

El resto de skills de Vercel (deploy, env, firewall, storage, agents, AI SDK) no son diseño de interfaz. No las abras para una tarea visual.

### Modern Web Guidance

| Skill | Cuándo |
| --- | --- |
| `modern-web-guidance` | Obligatoria al empezar HTML, CSS o JS de cliente: layout, scroll, motion, rendimiento, formularios y estados. Busca el patrón actual antes de escribir un workaround. |
| `chrome-extensions` | Solo si la tarea es una extensión de Chrome. |

### Higgsfield

Generación de imagen y vídeo (MCP, sin skill). Úsalo cuando la UI necesite assets visuales o piezas de vídeo, no como sustituto de las skills de dirección de arte del repo.

## Reglas locales de producto

Están en `.cursor/rules/`. Lee la del tipo de pantalla que vayas a construir, además de las skills.

| Regla | Cuándo |
| --- | --- |
| `design-tokens-theming.md` | Color, tipo, spacing, tema shadcn y dark mode. |
| `component-architecture.md` | Composición de componentes, `cva`, variantes. |
| `responsive-layout.md` | Shell, sidebar, breakpoints y grids. |
| `accessible-components.md` | Teclado, foco, ARIA y WCAG 2.2 AA. |
| `navigation-patterns.md` | Sidebar, command palette, tabs, breadcrumbs. |
| `dashboard-layout.md` | KPIs, charts y jerarquía de un overview. |
| `data-tables.md` | Tablas con sort, filtros, paginación y selección. |
| `forms-and-validation.md` | Formularios con react-hook-form, zod y shadcn. |
| `modals-and-dialogs.md` | Dialog, sheet, drawer y confirmaciones. |
| `empty-and-loading-states.md` | Skeletons, vacío, error y optimistic UI. |
| `notifications-and-toasts.md` | Toasts, alerts y centro de notificaciones. |
| `auth-screens.md` | Login, signup y recuperación. |
| `onboarding-flows.md` | Wizards y primer uso. |
| `settings-pages.md` | Ajustes, equipo y danger zone. |
| `billing-and-pricing.md` | Pricing, planes y upgrade. |

## Direcciones estéticas

Elige una después de leer el brief. La skill de gusto por defecto (`design-taste-frontend`) decide cuál encaja; no apliques varias a la vez.

- Producto sobrio, SaaS, dashboard: tokens + shadcn + `minimalist-ui` o la escuela que elija `anti-slop-ui` (Linear, Raycast, Geist). Nada de “startup morada”.
- Marketing, landing o portfolio con ambición visual: `high-end-visual-design` o `gpt-taste` si hay scroll coreografiado.
- Editorial o marca calmada: `minimalist-ui`.
- Datos, terminal, blueprint: `industrial-brutalist-ui`.
- Rediseño: `redesign-existing-projects` + `anti-slop-ui` en modo edición. No reemplaces la arquitectura.
