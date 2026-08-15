# Cómo generar el PDF del CV

El agente escribe un HTML de **una página A4** y Chrome/Edge lo imprime a PDF. No uses el PDF genérico sin adaptar skills.

## Windows (PowerShell)

```powershell
$chrome = "${env:ProgramFiles}\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
  $chrome = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
}
$html = "C:\ruta\al\proyecto\candidaturas\slug-vacante\CV-Nombre.html"
$pdf  = "C:\ruta\al\proyecto\candidaturas\slug-vacante\CV-Nombre.pdf"
$uri  = ([Uri]"$html").AbsoluteUri
& $chrome --headless --disable-gpu --no-pdf-header-footer --print-to-pdf="$pdf" $uri
```

Si el PDF sale en 2 páginas: baja `font-size` del `body` (9–10pt), reduce `padding` de `.page` y recorta bullets.

## Qué cambia por vacante

| Bloque | Adaptar | No tocar |
|--------|---------|----------|
| Título | keywords del aviso | nombre |
| Perfil | 2–3 frases alineadas al rol | años/empresas inventados |
| Skills | reordenar y filtrar; Cursor + Claude siempre | skills que no tiene |
| Experiencia | orden + bullets más relevantes | fechas, empresas, stacks falsos |
| Educación | igual | — |

## Entrega

Misma carpeta: `email-postulacion.txt` (opcional) + `.html` + `.pdf`. Al usuario: asunto, cuerpo del mail y ruta absoluta del PDF.
