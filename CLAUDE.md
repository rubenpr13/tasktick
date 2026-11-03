# TaskTick

Nombre de la app desde el 2026-11-03 (antes "Study App"; elegido por Rubén). Se ve en la pestaña del navegador, no dentro de la página.

Web para estudiar con la técnica Pomodoro y una lista de tareas. Hecha con Vite + React 18, en JavaScript (sin TypeScript) y con CSS normal.

Historial y decisiones pendientes de revisar: @MEMORY.md. Al terminar un cambio, añade una entrada con la fecha local al historial de ese archivo.

## Comandos
- `npm install`: instala las dependencias
- `npm run dev`: servidor de desarrollo en http://localhost:5173
- `npm run build`: compila a `dist/`; úsalo para comprobar que todo funciona
- `npm run preview`: sirve la versión compilada

No hay tests ni linter configurados.

## Estructura
- `src/App.jsx`: componente principal. Obtiene los datos y las acciones del reloj con `usePomodoro` y de las tareas con `useTareas`, y los pasa por props a los componentes
- `src/hooks/usePomodoro.js`: toda la lógica del temporizador (estado, cuenta atrás, cambio de modo, sesiones y acciones)
- `src/hooks/useTareas.js`: toda la lógica de la lista de tareas (`tareas`, `anadirTarea`, `alternarHecha`, `editarTarea`, `borrarTarea`)
- `src/components/`: un archivo por cada parte de la interfaz (`PestanasModo`, `Temporizador`, `Controles`, `SelectorPreset`, `VentanaPersonalizar`, `CampoMinutos`, `ListaTareas`, `Tarea`). Muestran datos y avisan de los clics con props `onX` (por ejemplo `onCambiarModo`, decidido por Rubén el 2026-11-03). Solo tienen estado propio los que guardan lo que se va escribiendo: `VentanaPersonalizar` (antes de pulsar Guardar), `ListaTareas` (la tarea nueva antes de añadirla) y `Tarea` (si se está editando y el texto editado)
- `src/config.js`: presets, duración del descanso largo, tiempos iniciales de Personalizado, límites de minutos, nombres de los modos y largo máximo de una tarea
- `src/utilidades.js`: funciones de ayuda (`obtenerDuracion`, `formatearTiempo`)
- `src/App.css`: todos los estilos; los colores y medidas son variables en `:root` y el color del subrayador cambia por modo (`.modo-foco`, `.modo-descansoCorto`, `.modo-descansoLargo`)
- `index.html`: carga las fuentes de Google Fonts (Atkinson Hyperlegible Next y Lexend)
- `src/main.jsx`: monta `<App />`
- `.mcp.json`: servidores MCP de Claude Code (ahora `chrome-devtools`, para abrir y probar la app en Chrome). Es personal: está en `.gitignore` y no se sube (decidido por Rubén el 2026-11-03)
- `.claude/skills/design-taste-frontend/`: skill de diseño de Claude Code (de `Leonxlnx/taste-skill`, instalada por Rubén el 2026-11-03; su origen está en `skills-lock.json`). Sus archivos de trabajo van a `.taste-skill/`, que está en `.gitignore`. Usarla no autoriza a cambiar el diseño aprobado: cualquier propuesta suya se pregunta antes a Rubén
- `.claude/skills/frontend-design/`: skill de diseño de Anthropic (de `anthropics/skills`, instalada por Rubén el 2026-11-03; también en `skills-lock.json`). Es la que se usó para planear el diseño "cuaderno + subrayador". Igual que la anterior, no autoriza a cambiar el diseño aprobado sin preguntar

## Reglas del temporizador (no cambiarlas sin pedirlo)
- La columna del reloj se titula "Temporizador" (cambiado por Rubén el 2026-11-03; antes "Study App"). El nombre de la app, "TaskTick", solo sale en la pestaña del navegador.
- Cuenta atrás hasta `00:00`. Al abrir o recargar la web se muestra Concentración con 25:00 en pausa; solo empieza al pulsar Play (cambiado por Rubén el 2026-10-29).
- Presets: Corto = 25 min de foco / 5 min de descanso; Largo = 50 / 10. En Corto y Largo el Descanso largo dura siempre 30 min. El Descanso largo solo se activa a mano.
- Personalizar (decidido por Rubén el 2026-11-03): el botón ⚙ junto a Play/Detener abre una ventana centrada con Concentración, Descanso corto y Descanso largo (campo de texto que solo admite dígitos, sin flechas, con botones − y +; de 1 a 120 min). Se abre con los últimos tiempos guardados (al principio 25 / 5 / 30). Solo se aplica al pulsar Guardar, y no deja guardar si un valor no es válido. Se cierra sin guardar con Cancelar, pulsando fuera o con Escape.
- Los botones de preset solo muestran el nombre (Corto, Largo, Personalizado), sin subtítulo; en el móvil los tres van en una fila.
- Al guardar aparece y se activa un tercer preset "Personalizado" con esos tiempos (incluido el Descanso largo, que solo cambia en este preset); el modo actual se reinicia con su nueva duración y queda en pausa.
- Al llegar a 00:00 se pasa de Concentración a Descanso corto, y de cualquier descanso (también el largo) a Concentración. El nuevo modo queda en pausa hasta pulsar Play (cambiado por Rubén el 2026-10-29).
- Una sesión solo se suma cuando el temporizador termina, nunca al pausar, detener o cambiar de modo.
- Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa. Detener pausa y vuelve al inicio del modo actual, sin sumar sesión (confirmado por Rubén el 2026-11-03).
- El tiempo se calcula con la hora local del usuario (`Date.now()` y una hora de fin), nunca UTC ni hora del servidor. Así no se desfasa aunque la pestaña esté en segundo plano.
- Los contadores y los tiempos personalizados viven en memoria y no se guardan (confirmado por Rubén el 2026-11-03).

## Reglas de la lista de tareas (decididas por Rubén el 2026-11-03; no cambiarlas sin pedirlo)
- Va en una columna aparte, con el título "To Do List": en el ordenador a la derecha del reloj, con el mismo ancho y separada por la línea de margen; en pantallas estrechas, debajo.
- Añadir: campo "Nueva tarea…" y botón + (o Enter). Se quitan los espacios de los extremos, no se añaden tareas vacías y el máximo es 100 caracteres. La tarea nueva va al final.
- Marcar como hecha con una casilla: la tarea se queda en su sitio, tachada y más clara.
- Editar con doble clic en el texto: Enter o pulsar fuera guardan, Escape cancela. Si el texto queda vacío, vuelve el anterior.
- Borrar con ×, al momento y sin confirmación.
- Con la lista vacía se muestra "No hay tareas. Añade la primera."
- Las tareas viven en memoria y se pierden al recargar. No hay contador de hechas ni relación con los pomodoros.

## Diseño "cuaderno + subrayador" (aprobado por Rubén el 2026-11-03; no cambiarlo sin pedirlo)
- La página es una hoja de cuaderno cuadriculado (cuadros de 20 px, `--cuadro`); todo va alineado a la izquierda y encaja en los cuadros. Sin tarjetas ni sombras.
- Colores: papel `#F7F9FB`, cuadrícula `#D6E0EA`, tinta `#1E2A3A`, tinta suave `#5B6B7F`, boli rojo `#D64545` (tachado y ×), margen `#E7A3A3`. Subrayador por modo: Concentración `#FFE14D`, Descanso corto `#9BE7A0`, Descanso largo `#9CC9FF`; siempre detrás de texto oscuro, nunca como color de letra.
- Fuentes de Google Fonts: Atkinson Hyperlegible Next para los textos y Lexend (800, cifras de ancho fijo) para el reloj y los campos de minutos. Atkinson tacha el cero y en el reloj grande no se leía bien (decidido por Rubén).
- Lo llamativo es solo el reloj, con el trazo de subrayador detrás. Única animación: el subrayador se pinta de izquierda a derecha al cambiar de modo (no se anima si el sistema pide reducir el movimiento).
- Pestañas y presets son palabras sueltas: la pestaña activa lleva el subrayador; el preset activo, un subrayado en tinta. Contador de sesiones: número pequeño en el mismo renglón. En el móvil (≤ 420 px) las pestañas van a 13 px para caber en una fila.
- Botones con esquinas de 6 px: Play y + en bloque de tinta; Detener, ⚙ y Cancelar con borde de tinta. La ventana de Personalizar es una hoja cuadriculada con borde de tinta.
- Tareas: casilla de un cuadro con ✓ en tinta; las hechas se tachan en boli rojo.

## Git y GitHub
Repositorio público: https://github.com/rubenpr13/tasktick (rama `master`, remoto `origin`; antes se llamaba `study-app`).
- **Subir siempre lo que se modifica (pedido por Rubén el 2026-10-29):** al terminar cada cambio que funcione, haz un commit y un `git push` sin esperar a que te lo pidan. No hace falta preguntar antes.
- Un commit por cambio, con el mensaje en español, en imperativo y explicando qué se ha hecho.
- Antes de cada commit, revisa `git status`: nunca subas `node_modules/`, `dist/`, `.claude/settings.local.json`, `.mcp.json`, `.taste-skill/` ni claves o contraseñas.

## Segundo cerebro (vault de Obsidian)
Vault: `C:\Users\ruben\iCloudDrive\iCloud~md~obsidian\Rpinazo`. Antes de escribir en él, lee su `AGENTS.md` y sigue sus reglas (plantilla, propiedades, carpetas sensibles…).
- **Guardar**: a medida que avance la sesión, vuelca en el vault lo que se aprenda o decida, sin esperar a que te lo pidan. Las notas del proyecto se capturan en `00 - Inbox/` (decidido por Rubén el 2026-10-28):
  - `TaskTick`: qué es, estado y pendientes (actualizar)
  - `TaskTick - Registro`: una entrada por sesión (solo añadir)
  - `TaskTick - Aprendizajes técnicos`: lo aprendido (actualizar)
  - Hasta el 2026-11-03 se llamaban `Study App…`.
  - Si Rubén mueve estas notas al procesar el Inbox, búscalas por nombre en el vault.
- **Consultar**: para buscar información, empieza por `06 - Wiki/index.md`. Hay notas útiles en `01 - Proyectos/MyStudyDiaryApp/` (fechas locales, Git, Claude Code) y en `06 - Wiki/Conceptos/` (HTML, CSS, Flexbox, Git).

## Estilo de trabajo
- El usuario está empezando a programar: código simple y claro, nombres y comentarios en español, sin abstracciones innecesarias.
- Todos los textos de la interfaz, en español. Excepción: el título "To Do List" de la lista de tareas (pedido por Rubén el 2026-11-03).
- No añadir funcionalidades que no se hayan pedido (sonidos, notificaciones, localStorage, ajustes, librerías nuevas…).
- Diseño limpio y moderno; tiene que verse bien en el móvil.
- **No tomar decisiones propias (pedido por Rubén el 2026-11-03):** preguntar siempre antes, en todo (estructura, nombres, textos, alcance del cambio…), con opciones y una recomendación. Cualquier duda o cosa que no esté clara también se pregunta.
