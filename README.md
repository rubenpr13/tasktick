# Study App

Web para estudiar con la **técnica Pomodoro**: alterna bloques de concentración con descansos cortos para estudiar sin agotarte. Incluye una **lista de tareas** para apuntar lo que vas a estudiar.

## Funcionalidades

- **Temporizador** que cuenta hacia atrás hasta `00:00`. Al abrir la web muestra 25 minutos de concentración y empieza al pulsar Play.
- **Cambio automático de modo**: al terminar la concentración empieza el descanso corto y, al terminar el descanso, vuelve la concentración. El nuevo modo espera a que pulses Play.
- **Dos presets**:
  | Preset | Concentración | Descanso corto |
  |---|---|---|
  | Corto | 25 min | 5 min |
  | Largo | 50 min | 10 min |
- **Pestañas de modo** (Concentración, Descanso corto y Descanso largo), cada una con un contador de las sesiones completadas. Una sesión solo cuenta cuando el temporizador llega a `00:00`.
- **Descanso largo** de 30 minutos (en Corto y Largo), que solo se activa a mano desde su pestaña.
- **Controles**: Play / Pausa, Detener (vuelve al inicio del modo actual) y ⚙ para personalizar los tiempos.
- **Tiempos personalizados**: el botón ⚙ abre una ventana para elegir los minutos de concentración, descanso corto y descanso largo (de 1 a 120). Al guardar aparece el preset **Personalizado** con esos tiempos. No se guardan al recargar la página.
- **Lista de tareas** ("To Do List") en una columna junto al reloj (debajo en el móvil): añade tareas con + o Enter, márcalas como hechas, edítalas con doble clic (Enter o pulsar fuera guarda, Escape cancela) y bórralas con ×. Las tareas no se guardan al recargar la página.

## Diseño

Estilo de **cuaderno cuadriculado**: la página es una hoja de cuadros y el modo activo se marca con un trazo de subrayador detrás del tiempo (amarillo en Concentración, verde en Descanso corto y azul en Descanso largo). En el ordenador, el reloj y las tareas van en dos columnas separadas por la línea de margen del cuaderno; en el móvil, una debajo de otra.

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vite.dev/)
- JavaScript y CSS, sin librerías adicionales
- Fuentes [Atkinson Hyperlegible Next](https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next) y [Lexend](https://fonts.google.com/specimen/Lexend), de Google Fonts

## Cómo ejecutarlo

Necesitas tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# 1. Clonar el repositorio
git clone https://github.com/rubenpr13/study-app.git
cd study-app

# 2. Instalar las dependencias
npm install

# 3. Arrancar el servidor de desarrollo
npm run dev
```

Abre http://localhost:5173 en el navegador.

### Otros comandos

| Comando | Qué hace |
|---|---|
| `npm run build` | Genera la versión final en la carpeta `dist/` |
| `npm run preview` | Sirve la versión de `dist/` para probarla |

## Estructura del proyecto

```
study-app/
├── index.html        # Página base donde se monta React
├── vite.config.js    # Configuración de Vite
├── package.json      # Dependencias y comandos
└── src/
    ├── main.jsx          # Punto de entrada: monta el componente App
    ├── App.jsx           # Componente principal: monta la interfaz
    ├── App.css           # Estilos
    ├── config.js         # Presets, descanso largo, límites de minutos, nombres de los modos y largo máximo de una tarea
    ├── utilidades.js     # Funciones de ayuda (duración de un modo, formato MM:SS)
    ├── hooks/
    │   ├── usePomodoro.js  # Lógica del temporizador
    │   └── useTareas.js    # Lógica de la lista de tareas
    └── components/       # Componentes de la interfaz
        ├── PestanasModo.jsx    # Pestañas de modo con su contador de sesiones
        ├── Temporizador.jsx    # Tiempo restante
        ├── Controles.jsx       # Botones Play/Pausa, Detener y ⚙
        ├── SelectorPreset.jsx  # Botones de los presets Corto, Largo y Personalizado
        ├── VentanaPersonalizar.jsx  # Ventana para personalizar los tiempos
        ├── CampoMinutos.jsx    # Campo de minutos con botones − y +
        ├── ListaTareas.jsx     # Columna de tareas: campo para añadir y lista
        └── Tarea.jsx           # Una tarea: casilla, texto editable y botón ×
```

## Detalles técnicos

El temporizador no se fía solo de `setInterval`: cuando la pestaña está en segundo plano, el navegador lo ralentiza. Por eso, al pulsar Play se guarda la hora de fin y en cada segundo se calcula lo que falta con la hora local del dispositivo (`Date.now()`). Así la cuenta atrás es exacta aunque cambies de pestaña.
