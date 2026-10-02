# Nereita

Base visual para la web de Nereita, academia de pintura y arte. El repositorio sirve para probar una dirección editorial de galería antes de construir el sitio completo. La home es una sola página de prueba, no un producto.

## Arranque en local

Requiere Node.js 22.

```bash
npm install
npm run dev -- --hostname 0.0.0.0 --port 47291
```

Abre [http://127.0.0.1:47291](http://127.0.0.1:47291).

## Qué quedó instalado

Scaffold oficial de Next.js (App Router, TypeScript, Tailwind CSS v4) y shadcn/ui (`base-nova`), con el primitivo `Button`.

Dependencia npm para motion posterior:

- `gsap` (aún no se usa en la home)

Skills instaladas en el proyecto, con el comando terminado en éxito:

- Taste Skill, desde `https://github.com/Leonxlnx/taste-skill`, en `.agents/skills/`:
  - `design-taste-frontend` (v2, la skill por defecto)
  - `design-taste-frontend-v1`
  - `gpt-taste`
  - `image-to-code`
  - `imagegen-frontend-web`
  - `imagegen-frontend-mobile`
  - `brandkit`
  - `minimalist-ui`
  - `industrial-brutalist-ui`
  - `high-end-visual-design`
  - `redesign-existing-projects`
  - `stitch-design-taste`
  - `full-output-enforcement`
- Anti-Slop-UI, desde `https://github.com/local-over/Anti-Slop-UI`, skill `anti-slop-ui` en `.agents/skills/anti-slop-ui/SKILL.md`. El instalador copia el índice (`public-skills/SKILL.md`). Las escuelas y las capas heurísticas siguen en el repositorio upstream; el índice enlaza esas rutas.
- saas-ui-skills, paquete npm `saas-ui-skills`, con `npx saas-ui-skills install --target cursor --scope project`. Quedaron 15 reglas en `.cursor/rules/` (accesibilidad, formularios, tablas, layout, tokens y el resto del pack).

Registro de la instalación: `skills-lock.json`.

## Huecos

Ninguno de los tres paquetes pedidos falló al instalarse. Lo que no viaja dentro del repo es el conjunto de archivos de escuelas y capas de Anti-Slop-UI: el comando oficial de skills solo deja el `SKILL.md` índice.

## Activar en Cursor

Estos plugins de marketplace no se instalan desde el repositorio. Los tiene que activar Gabriel en Cursor:

- shadcn/ui
- GSAP
- Modern Web Guidance
- Refero
- Mobbin
- Figma
- Superdesign
- Wonder
- Magic Patterns
- Vercel

Prioridad pedida: Taste Skill (ya está en el repo) + plugin shadcn/ui + Refero/Mobbin.

`gsap` como dependencia npm ya está en el proyecto. El plugin GSAP de Cursor es aparte y también lo activa Gabriel.
