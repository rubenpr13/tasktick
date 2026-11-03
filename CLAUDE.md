# Study App

Web para estudiar con la técnica Pomodoro. Hecha con Vite + React 18, en JavaScript (sin TypeScript) y con CSS normal.

Historial y decisiones pendientes de revisar: @MEMORY.md. Al terminar un cambio, añade una entrada con la fecha local al historial de ese archivo.

## Comandos
- `npm install`: instala las dependencias
- `npm run dev`: servidor de desarrollo en http://localhost:5173
- `npm run build`: compila a `dist/`; úsalo para comprobar que todo funciona
- `npm run preview`: sirve la versión compilada

No hay tests ni linter configurados.

## Estructura
- `src/App.jsx`: componente principal. Obtiene los datos y las acciones del reloj con `usePomodoro` y los pasa por props a los componentes
- `src/hooks/usePomodoro.js`: toda la lógica del temporizador (estado, cuenta atrás, cambio de modo, sesiones y acciones)
- `src/components/`: un archivo por cada parte de la interfaz (`PestanasModo`, `Temporizador`, `Controles`, `SelectorPreset`, `VentanaPersonalizar`, `CampoMinutos`). Muestran datos y avisan de los clics con props `onX` (por ejemplo `onCambiarModo`, decidido por Rubén el 2026-11-03). Solo `VentanaPersonalizar` tiene estado propio: lo que se va escribiendo antes de pulsar Guardar
- `src/config.js`: presets, duración del descanso largo, tiempos iniciales de Personalizado, límites de minutos y nombres de los modos
- `src/utilidades.js`: funciones de ayuda (`obtenerDuracion`, `formatearTiempo`)
- `src/App.css`: todos los estilos; los colores son variables en `:root` y el acento cambia por modo (`.modo-foco`, `.modo-descansoCorto`, `.modo-descansoLargo`)
- `src/main.jsx`: monta `<App />`
- `.mcp.json`: servidores MCP de Claude Code (ahora `chrome-devtools`, para abrir y probar la app en Chrome). Es personal: está en `.gitignore` y no se sube (decidido por Rubén el 2026-11-03)

## Reglas del temporizador (no cambiarlas sin pedirlo)
- Cuenta atrás hasta `00:00`. Al abrir o recargar la web se muestra Concentración con 25:00 en pausa; solo empieza al pulsar Play (cambiado por Rubén el 2026-10-29).
- Presets: Corto = 25 min de foco / 5 min de descanso; Largo = 50 / 10. En Corto y Largo el Descanso largo dura siempre 30 min. El Descanso largo solo se activa a mano.
- Personalizar (decidido por Rubén el 2026-11-03): el botón ⚙ junto a Play/Detener abre una ventana centrada con Concentración, Descanso corto y Descanso largo (campo de texto que solo admite dígitos, sin flechas, con botones − y +; de 1 a 120 min). Se abre con los últimos tiempos guardados (al principio 25 / 5 / 30). Solo se aplica al pulsar Guardar, y no deja guardar si un valor no es válido. Se cierra sin guardar con Cancelar, pulsando fuera o con Escape.
- Los botones de preset solo muestran el nombre (Corto, Largo, Personalizado), sin subtítulo; en el móvil los tres van en una fila.
- Al guardar aparece y se activa un tercer preset "Personalizado" con esos tiempos (incluido el Descanso largo, que solo cambia en este preset); el modo actual se reinicia con su nueva duración y queda en pausa.
- Al llegar a 00:00 se pasa de Concentración a Descanso corto, y de cualquier descanso a Concentración. El nuevo modo queda en pausa hasta pulsar Play (cambiado por Rubén el 2026-10-29).
- Una sesión solo se suma cuando el temporizador termina, nunca al pausar, detener o cambiar de modo.
- Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa. Detener pausa y vuelve al inicio del modo actual.
- El tiempo se calcula con la hora local del usuario (`Date.now()` y una hora de fin), nunca UTC ni hora del servidor. Así no se desfasa aunque la pestaña esté en segundo plano.
- Los contadores y los tiempos personalizados viven en memoria y no se guardan.

## Git y GitHub
Repositorio público: https://github.com/rubenpr13/study-app (rama `master`, remoto `origin`).
- **Subir siempre lo que se modifica (pedido por Rubén el 2026-10-29):** al terminar cada cambio que funcione, haz un commit y un `git push` sin esperar a que te lo pidan. No hace falta preguntar antes.
- Un commit por cambio, con el mensaje en español, en imperativo y explicando qué se ha hecho.
- Antes de cada commit, revisa `git status`: nunca subas `node_modules/`, `dist/`, `.claude/settings.local.json`, `.mcp.json` ni claves o contraseñas.

## Segundo cerebro (vault de Obsidian)
Vault: `C:\Users\ruben\iCloudDrive\iCloud~md~obsidian\Rpinazo`. Antes de escribir en él, lee su `AGENTS.md` y sigue sus reglas (plantilla, propiedades, carpetas sensibles…).
- **Guardar**: a medida que avance la sesión, vuelca en el vault lo que se aprenda o decida, sin esperar a que te lo pidan. Las notas del proyecto se capturan en `00 - Inbox/` (decidido por Rubén el 2026-10-28):
  - `Study App`: qué es, estado y pendientes (actualizar)
  - `Study App - Registro`: una entrada por sesión (solo añadir)
  - `Study App - Aprendizajes técnicos`: lo aprendido (actualizar)
  - Si Rubén mueve estas notas al procesar el Inbox, búscalas por nombre en el vault.
- **Consultar**: para buscar información, empieza por `06 - Wiki/index.md`. Hay notas útiles en `01 - Proyectos/MyStudyDiaryApp/` (fechas locales, Git, Claude Code) y en `06 - Wiki/Conceptos/` (HTML, CSS, Flexbox, Git).

## Estilo de trabajo
- El usuario está empezando a programar: código simple y claro, nombres y comentarios en español, sin abstracciones innecesarias.
- Todos los textos de la interfaz, en español.
- No añadir funcionalidades que no se hayan pedido (sonidos, notificaciones, localStorage, ajustes, librerías nuevas…).
- Diseño limpio y moderno; tiene que verse bien en el móvil.
- **No tomar decisiones propias (pedido por Rubén el 2026-11-03):** preguntar siempre antes, en todo (estructura, nombres, textos, alcance del cambio…), con opciones y una recomendación. Cualquier duda o cosa que no esté clara también se pregunta.
