# Kit: sistema de postulaciones con Cursor

**Empieza por** `PROMPT-SISTEMA-COMPLETO.md` — es el prompt único (skill + rules + CV + BD) para pegar en Cursor. Sustituye los `{{CAMPOS}}` con los datos del amigo.

Copia de cómo está armado el flujo de candidaturas en este repo. Sirve para montar **el mismo sistema** en el proyecto de un amigo: el agente lee un perfil real, filtra vacantes, genera email + CV PDF adaptado, postula en el navegador de Cursor y registra todo en MySQL.

## Qué hace el sistema (3 capas)

```
Usuario: "postula a esto"  /  "ANALIZA PROPUESTA Y PREPARA UN EMAIL Y UN CV PARA ESTO:"
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│  RULES (.cursor/rules/*.mdc)  — siempre activas         │
│  Disparan el flujo, exclusiones, BD, navegador, email   │
└──────────────────────────┬──────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────┐
│  SKILL  — fuente de verdad del candidato                │
│  Datos, stacks, portales, salario, CV, flujo por portal │
└──────────────────────────┬──────────────────────────────┘
                           ▼
        ┌──────────────────┴──────────────────┐
        ▼                                     ▼
  Email + HTML→PDF                      Browser Cursor
  candidaturas/<slug>/                  + npm run db
```

| Pieza | Rol |
|-------|-----|
| **Skill** | Perfil, stacks de CV, credenciales de portales, cómo postular y cómo usar la BD |
| **Rules** | Comportamiento obligatorio: no híbrido, no stack inventado, registrar cada vacante, generar PDF, no pedir Run |
| **CV** | HTML de 1 página → Chrome/Edge `--print-to-pdf`. Skills reordenadas a la vacante; experiencia **nunca inventada** |

## Cómo instalarlo en el repo del amigo

1. Copia la carpeta `.cursor/` de este kit al root de su proyecto Cursor.
2. Copia `database/`, `lib/`, `scripts/` y `env.example` → `.env`.
3. En `package.json` agrega:

```json
"db:init": "tsx scripts/candidaturas-db.ts init",
"db": "tsx scripts/candidaturas-db.ts"
```

Dependencias: `mysql2`, `dotenv`, `tsx` (dev).

4. **Edita la skill** `.cursor/skills/candidaturas-perfil-laboral/SKILL.md`:
   - Nombre, email, teléfono, LinkedIn, GitHub, portfolio
   - Experiencia real (empleos, fechas, stacks) — **no inventar**
   - Stacks A/B según lo que sí tenga
   - Salario, documento, foto, rutas de CV
5. Pon su CV base en `public/cv.pdf` y foto en `public/foto.png`.
6. Rellena `database/seed.sql` con sus datos.
7. `npm run db:init` (MySQL local, p. ej. Laragon).
8. Abre Cursor en ese repo. Las rules con `alwaysApply: true` ya gobiernan al agente.

## Frases que disparan el flujo

| El usuario dice | El agente hace |
|-----------------|----------------|
| `ANALIZA PROPUESTA Y PREPARA UN EMAIL Y UN CV PARA ESTO:` + aviso | Email listo + PDF adaptado en `candidaturas/<slug>/` |
| `postula` / `aplica a estas vacantes` + URLs | Navega en `@Browser`, adjunta CV, registra en BD |
| `actualiza mi perfil en LinkedIn` | Completa el perfil con datos de la skill |

## Cómo se genera el CV (imprescindible)

1. Partir de `cv/plantilla-cv.html` (misma CSS/estructura).
2. Elegir **Stack A** o **Stack B** según la vacante (no mezclar ejes).
3. Reordenar/filtrar **Skills** a keywords del aviso. Incluir siempre **Cursor** y **Claude**.
4. Experiencia real de la skill; recortar bullets, no inventar.
5. Guardar en `candidaturas/<slug-vacante>/CV-Nombre-Puesto.html`.
6. Convertir a PDF:

```powershell
$chrome = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"
$html = "C:\ruta\candidaturas\slug\CV.html"
$pdf  = "C:\ruta\candidaturas\slug\CV.pdf"
& $chrome --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" "file:///$($html -replace '\\','/')"
```

Prohibido en el PDF: gaps (“sin experiencia en X”), skills inventadas, texto cortado en el encabezado.

## Registro en BD (obligatorio por vacante)

```powershell
npm run db -- sesion start --notas "LinkedIn + Computrabajo"
npm run db -- add --empresa "Acme" --puesto "Fullstack" --url "https://..." --estado en_proceso --portal "LinkedIn" --sesion 1
npm run db -- update 12 --estado enviado --notas "Easy Apply: solicitud enviada"
npm run db -- sesion end 1
npm run db -- list
npm run db -- stats
```

Estados: `en_proceso` → `enviado` | `omitido` | `borrador` | `error` | `pendiente`.

## Mapa de archivos

```
kit-sistema-candidaturas/
├── README.md                          ← este archivo
├── env.example
├── .cursor/
│   ├── skills/candidaturas-perfil-laboral/SKILL.md
│   ├── rules/*.mdc
│   └── commands/candidaturas.md
├── cv/
│   ├── plantilla-cv.html              ← layout 1 página
│   └── COMO-GENERAR-PDF.md
├── database/schema.sql + seed.sql
└── lib/ + scripts/                    ← CLI MySQL
```

Este kit **solo trae plantillas**. Rellena `{{CAMPOS}}` con los datos del candidato. No incluyas contraseñas de portales en archivos que se commiteen.
