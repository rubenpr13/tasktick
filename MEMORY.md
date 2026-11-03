# Memoria del proyecto

Registro de lo que se ha hecho en TaskTick (antes Study App) y de las decisiones tomadas. Las reglas actuales de la app están en `CLAUDE.md`.

## Historial

### 2026-10-28: Primera versión
- Proyecto creado desde cero con Vite 5 + React 18, a mano (sin la plantilla de Vite) para no dejar archivos de ejemplo.
- Funcionalidades: temporizador que arranca solo en 25:00, presets Corto (25/5) y Largo (50/10), pestañas Concentración / Descanso corto / Descanso largo con contador de sesiones, y botones Play/Pausa y Detener.
- El tiempo se calcula con una hora de fin y `Date.now()` (hora local), para que no se desfase con la pestaña en segundo plano.
- Creado `CLAUDE.md` con los comandos, la estructura y las reglas del proyecto.
- Proyecto conectado al vault de Obsidian: notas `Study App`, `Study App - Registro` y `Study App - Aprendizajes técnicos` capturadas en `00 - Inbox/`. Permiso de acceso al vault en `.claude/settings.local.json`.

### 2026-10-29: GitHub
- Creado el repositorio público https://github.com/rubenpr13/study-app y subido el primer commit.
- Añadido `.gitignore` (`node_modules/`, `dist/`, `.claude/settings.local.json`).
- Nueva regla en `CLAUDE.md`: hacer commit y push al terminar cada cambio.
- Añadido `README.md`: funcionalidades, tecnologías, cómo ejecutarlo, estructura y cómo funciona el temporizador.
- Corregido: el temporizador ya no arranca solo al abrir o recargar la página; espera a que se pulse Play. Cambia el requisito inicial ("que empiece automático"). Tras un cambio automático de modo sigue arrancando solo.
- Cambiado después: tras un cambio automático de modo, el temporizador también queda en pausa hasta pulsar Play.

### 2026-11-03: Componentes
- `App.jsx` dividido en componentes para que el proyecto sea escalable: `PestanasModo`, `Temporizador`, `Controles` y `SelectorPreset` en `src/components/`.
- La configuración pasa a `src/config.js` y las funciones de ayuda a `src/utilidades.js`.
- El estado y la lógica siguen en `App`, que los pasa por props; los componentes no tienen estado propio.
- Los textos de los presets ("25 min foco · 5 min descanso") ahora salen de `PRESETS`, que incluye el nombre de cada preset.
- El funcionamiento y el aspecto de la app no cambian.
- Revisado por Rubén: la lógica del reloj pasa al hook `src/hooks/usePomodoro.js`, los estilos se quedan en `App.css` y las props de los componentes se llaman `onX` (`onCambiarModo`, `onPlayPausa`, `onDetener`, `onCambiarPreset`).
- Nueva regla en `CLAUDE.md`: no tomar decisiones propias; preguntar siempre antes, en todo.

### 2026-11-03: Personalizar tiempos
- Botón ⚙ junto a Play/Detener que abre una ventana centrada (`VentanaPersonalizar`) con tres campos (`CampoMinutos`: número con − y +, de 1 a 120 min) para Concentración, Descanso corto y Descanso largo.
- Todo decidido por Rubén antes de programar: preset aparte "Personalizado" que aparece al guardar, se aplica al pulsar Guardar, al guardar el modo actual se reinicia en pausa, el descanso largo personalizado solo vale en ese preset, se cierra con Cancelar / pulsando fuera / Escape, y no se guarda al recargar.
- Lógica en `usePomodoro` (`tiemposPersonalizados`, `guardarTiemposPersonalizados`); `obtenerDuracion` recibe los tiempos personalizados. En móvil, el preset Personalizado ocupa su propia fila.
- Ajustes estéticos pedidos por Rubén: los presets solo muestran el nombre (sin subtítulo con los minutos) y en el móvil van los tres en una fila; el campo de minutos pasa a ser de texto, solo admite dígitos y no tiene flechas (se cambia escribiendo o con − y +).
- El cursor de escritura "|" ya no aparece al pulsar en los textos (`caret-color: transparent` en `App.css`); solo se ve en los campos de minutos.
- Añadido el servidor MCP Chrome DevTools en `.mcp.json` (alcance project). A petición de Rubén, `.mcp.json` está en `.gitignore` y no se sube a GitHub.

### 2026-11-03: Lista de tareas
- Nueva tarjeta "Tareas" junto al reloj (debajo en el móvil), con el mismo ancho. Todo decidido por Rubén antes de programar (reglas en `CLAUDE.md`).
- Se puede añadir (+ o Enter), marcar como hecha (queda tachada en su sitio), editar con doble clic (Enter o pulsar fuera guardan, Escape cancela) y borrar con × sin confirmación. Máximo 100 caracteres; no se añaden tareas vacías.
- Lógica en el hook `src/hooks/useTareas.js`; interfaz en `ListaTareas.jsx` (tarjeta, campo y lista) y `Tarea.jsx` (una fila). `LARGO_MAXIMO_TAREA` en `config.js`.
- Las tareas solo viven en memoria, como los contadores.
- `.app` ahora coloca las tarjetas con `flex-wrap`: cada tarjeta mide entre 360 y 480 px y, si no caben dos, la segunda baja.

### 2026-11-03: Revisión de decisiones pendientes
- Rubén revisa las cuatro decisiones que quedaban y las confirma tal como están: al terminar el descanso largo se vuelve a Concentración; cambiar de pestaña o de preset reinicia y deja en pausa; Detener pausa y vuelve al inicio del modo sin sumar sesión; los contadores no se guardan al recargar.
- El código no cambia; solo se actualizan `CLAUDE.md` y `MEMORY.md`.

### 2026-11-03: Plan de rediseño "cuaderno + subrayador" (aprobado, sin programar)
- Hecho con la skill `frontend-design`. Encargo confirmado por Rubén: la usa él para preparar la prueba de acceso, en ordenador y móvil; lo importante es ver el tiempo y la tarea sin distraerse. Libertad total de diseño; se permite cargar fuentes de Google Fonts.
- Idea: la app es una hoja de cuaderno cuadriculado y el modo activo se marca con un trazo de subrayador detrás del texto. Sin tarjetas ni sombras; todo alineado a la izquierda y encajado en cuadros de 20 px.
- Colores: papel `#F7F9FB`, cuadrícula `#D6E0EA`, tinta `#1E2A3A`, tinta suave `#5B6B7F`, boli rojo `#D64545` (tachado y × al pasar el ratón), margen rojo suave `#E7A3A3`. Subrayadores: Concentración `#FFE14D`, Descanso corto `#9BE7A0`, Descanso largo `#9CC9FF`; siempre detrás de texto oscuro, nunca como color de letra.
- Tipografía: Atkinson Hyperlegible Next (textos, 16 px; títulos 20 px) y Atkinson Hyperlegible Mono en negrita (reloj). Sin mayúsculas en etiquetas.
- Distribución: en el ordenador, reloj a la izquierda y tareas a la derecha, separados por la línea de margen roja; en el móvil, una columna. Pestañas como palabras sueltas, la activa subrayada; contador de sesiones como número pequeño (elegido por Rubén, no palotes). Botones con esquinas de 6 px: Play en bloque de tinta, Detener y ⚙ con borde. Filas de tareas de 2 cuadros; casilla con ✓ en tinta y tachado en boli rojo.
- Principios: lo atrevido solo en el reloj (subrayado detrás del tiempo); una sola animación (el subrayador se pinta de izquierda a derecha al cambiar de modo, sin animar si se pide reducir el movimiento); foco visible y bien en el móvil.

### 2026-11-03: Rediseño "cuaderno + subrayador" programado
- Aplicado el plan aprobado (reglas en `CLAUDE.md`, sección *Diseño*). Ventana de Personalizar y presets con el mismo estilo (elegido por Rubén).
- Cambios sobre el plan, decididos por Rubén tras ver capturas: el reloj usa **Lexend** en vez de Atkinson Hyperlegible Mono, porque Atkinson tacha siempre el cero (no tiene variante sin tachar) y "00" parecía "ØØ"; el contador va en el mismo renglón (no elevado); en el móvil las pestañas van a 13 px para caber en una fila (con 14 px no cabían) y hay menos hueco entre reloj y tareas.
- Código: `Temporizador` recibe `modo` y pinta los números en un `<span key={modo}>` para repetir la animación; `App` monta una `.hoja` con dos `.columna` (`columna-reloj`, `columna-tareas`) en lugar de `.tarjeta`; `SelectorPreset` ya no usa `<strong>`; espacio entre el nombre de la pestaña y su contador.
- Probado en Chrome: ordenador, móvil de 375 px (sin scroll horizontal, pestañas en una fila), ventana de Personalizar y cambio de modo. Las fuentes cargan bien.

### 2026-11-03: Nuevos títulos de las columnas
- A petición de Rubén, la columna del reloj se titula "Temporizador" (antes "Study App") y la de las tareas "To Do List" (antes "Tareas"). Es la única excepción a los textos en español.
- El título de la pestaña del navegador (`<title>` en `index.html`) sigue siendo "Study App".

### 2026-11-03: Nuevo nombre, TaskTick
- Rubén elige el nombre **TaskTick** (*task* = tarea; *tick* = tic del reloj y marca ✓ de hecho) entre varias propuestas. Se le avisó de que se parece a TickTick, una app de tareas con Pomodoro, por posibles problemas de marca; decide quedárselo.
- Cambiado en la pestaña del navegador (`<title>`), `package.json` y `package-lock.json` (`tasktick`), `README.md` y `CLAUDE.md`. Dentro de la página no aparece el nombre (decisión de Rubén). El historial anterior sigue diciendo "Study App".
- Repositorio de GitHub renombrado de `study-app` a `tasktick` (GitHub redirige las URL antiguas); remoto local actualizado.
- Notas del vault renombradas a `TaskTick`, `TaskTick - Registro` y `TaskTick - Aprendizajes técnicos`, con sus enlaces actualizados.
- Rubén renombrará la carpeta local `proyectos/study-app` a `proyectos/tasktick` al cerrar la sesión; la memoria de Claude Code se dejó copiada en la ruta nueva.

### 2026-11-03: Skill de diseño design-taste-frontend
- A petición de Rubén se instala la skill `design-taste-frontend` (repositorio `Leonxlnx/taste-skill`) solo en este proyecto, en `.claude/skills/design-taste-frontend/`. El instalador crea también `skills-lock.json` con su origen y su hash.
- El instalador la marcó como "Critical Risk" (Gen) y "Med Risk" (Snyk). Revisé el código: sus scripts abren Chrome para hacer capturas y descargan imágenes de webs públicas (Openverse, Wikimedia, museos, NASA), sin claves ni nada sospechoso. Al usarse escribe en `.taste-skill/` del proyecto y en `~/.taste-skill/history.json`.
- No cambia nada de la app. El diseño "cuaderno + subrayador" sigue siendo el aprobado.
- Después, a petición de Rubén: `.taste-skill/` añadido a `.gitignore`, y la skill anotada en `CLAUDE.md` (en *Estructura*, con la regla de no cambiar el diseño aprobado sin preguntar, y en la lista de lo que nunca se sube).

### 2026-11-03: Skill de diseño frontend-design
- En la sesión del rediseño se usó con `npx skills use`, que no la instala; por eso no estaba en `.claude/skills`. A petición de Rubén se instala con `npx skills add https://github.com/anthropics/skills --skill frontend-design` en `.claude/skills/frontend-design/` y queda añadida a `skills-lock.json`.
- Revisada: solo tiene `SKILL.md` (instrucciones de texto) y la licencia, sin scripts. El instalador la marca como segura ("Safe" en Gen, "Low Risk" en Snyk). Anotada en `CLAUDE.md`, en *Estructura*.

### 2026-11-03: Arreglos de la revisión con design-taste-frontend
- Revisión con el inspector de la skill (con Node 20 funciona usando `node --experimental-websocket`; pide Node 22). Rubén aprobó tres arreglos pequeños, sin cambiar el diseño:
- Contadores de sesiones en Lexend: con Atkinson el 0 salía tachado (Ø), igual que pasaba en el reloj.
- Botón de personalizar: el carácter ⚙ cambiado por un engranaje dibujado en SVG (en tinta, 20 px), porque en muchos móviles salía como emoji de colores.
- Presets (Corto, Largo, Personalizado) sin hueco a la izquierda, para que empiecen en el mismo borde que el título, el reloj y Play.

### 2026-11-03: Cabecera con el nombre TaskTick
- A petición de Rubén, encima de las dos columnas va una cabecera: la casilla marcada de las tareas (el "tick") y "TaskTick" en Lexend 800 a 24 px, sobre una línea de margen roja tan ancha como la hoja. Rubén eligió esta opción, que fuera el `h1` y que solo lleve el nombre.
- "Temporizador" pasa de `h1` a `h2`, como "To Do List". Por fuera se ven igual.
- Actualizado `CLAUDE.md`: el nombre ya no sale solo en la pestaña del navegador.

### 2026-11-03: Icono de la pestaña
- A petición de Rubén, la pestaña tiene icono: `public/favicon.svg`, la casilla marcada en tinta sobre papel (la misma marca que la cabecera). Se enlaza en `index.html`.

## Decisiones pendientes de revisar
Las tomé yo porque el encargo no las especificaba:
- [x] Al terminar el descanso largo se vuelve a Concentración. Confirmado por Rubén el 2026-11-03.
- [x] ~~Tras un cambio automático de modo, el siguiente temporizador arranca solo.~~ Cambiado el 2026-10-29: ahora queda en pausa hasta pulsar Play.
- [x] Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa. Confirmado por Rubén el 2026-11-03.
- [x] Detener pausa y vuelve al inicio del modo actual, sin sumar sesión. Confirmado por Rubén el 2026-11-03.
- [x] Los contadores no se guardan al recargar la página. Confirmado por Rubén el 2026-11-03.
- [x] ~~Componentes: el estado sigue en `App`, los estilos en `App.css` y las props en español (`alCambiarModo`…).~~ Revisado el 2026-11-03: lógica en el hook `usePomodoro`, estilos en `App.css` y props `onX`.

Cuando revises una, márcala con `[x]` o pide el cambio, y actualizaré también `CLAUDE.md`.
