# Memoria del proyecto

Registro de lo que se ha hecho en Study App y de las decisiones tomadas. Las reglas actuales de la app están en `CLAUDE.md`.

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

## Decisiones pendientes de revisar
Las tomé yo porque el encargo no las especificaba:
- [ ] Al terminar el descanso largo se vuelve a Concentración.
- [x] ~~Tras un cambio automático de modo, el siguiente temporizador arranca solo.~~ Cambiado el 2026-10-29: ahora queda en pausa hasta pulsar Play.
- [ ] Cambiar de pestaña o de preset reinicia el tiempo y lo deja en pausa.
- [ ] Detener pausa y vuelve al inicio del modo actual, sin sumar sesión.
- [ ] Los contadores no se guardan al recargar la página.
- [x] ~~Componentes: el estado sigue en `App`, los estilos en `App.css` y las props en español (`alCambiarModo`…).~~ Revisado el 2026-11-03: lógica en el hook `usePomodoro`, estilos en `App.css` y props `onX`.

Cuando revises una, márcala con `[x]` o pide el cambio, y actualizaré también `CLAUDE.md`.
