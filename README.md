# TaskTick

Web para estudiar con la **técnica Pomodoro**: alterna bloques de concentración con descansos cortos para estudiar sin agotarte. Incluye una **lista de tareas** para apuntar lo que vas a estudiar.

**Pruébala en https://tasktick-alpha.vercel.app/**

## Funcionalidades

- **Temporizador** que cuenta hacia atrás hasta `00:00`. Al abrir la web muestra 25 minutos de concentración y empieza al pulsar **Iniciar**.
- **Campanita** al llegar a `00:00`, generada por el navegador (sin archivos de sonido).
- **Cambio automático de modo**: al terminar la concentración empieza el descanso corto y, al terminar el descanso, vuelve la concentración. El nuevo modo espera a que pulses Iniciar.
- **Dos presets**:
  | Preset | Concentración | Descanso corto |
  |---|---|---|
  | Corto | 25 min | 5 min |
  | Largo | 50 min | 10 min |
- **Pestañas de modo** (Concentración, Descanso corto y Descanso largo), cada una con el número de sesiones terminadas **hoy**. Una sesión solo cuenta cuando el temporizador llega a `00:00`.
- **Descanso largo** de 30 minutos (en Corto y Largo), que solo se activa a mano desde su pestaña.
- **Controles**: Iniciar / Pausa, Detener (vuelve al inicio del modo actual) y el engranaje para personalizar los tiempos.
- **Tiempos personalizados**: el engranaje abre una ventana para elegir los minutos de concentración, descanso corto y descanso largo (de 1 a 120). Al guardar aparece el preset **Personalizado** con esos tiempos.
- **Lista de tareas** ("To Do List") en una columna junto al reloj (debajo en el móvil): añade tareas con + o Enter, márcalas como hechas, edítalas con doble clic (Enter o pulsar fuera guarda, Escape cancela) y bórralas con ×.
- **Constancia**: tu racha de días seguidos estudiando (y la mejor) y un **mapa de calor** del año (del 1 de enero al 31 de diciembre), como el de GitHub, con flechas para ver años anteriores. Cada día se pinta más amarillo cuantos más minutos de concentración terminaste (menos de 1 h, 1-2 h, 2-3 h o 3 h o más). Al pasar el ratón o tocar un día, su dato sale en una ventanita.
- **Pestaña del navegador**: mientras el reloj corre, el título muestra el tiempo que queda ("24:58 · Concentración").
- **Se guarda en tu navegador** (`localStorage`): las tareas, los tiempos personalizados y el historial de sesiones de cada día. No hay cuentas ni servidor: los datos no salen de tu dispositivo, y si borras los datos del navegador se pierden.

## Diseño

Estilo de **cuaderno cuadriculado**: la página es una hoja de cuadros con una cabecera con el nombre, y el modo activo se marca con un trazo de subrayador detrás del tiempo (amarillo en Concentración, verde en Descanso corto y azul en Descanso largo). Si pausas a mitad, el subrayador se ve más claro. Desde 760 px de ancho el reloj y las tareas van en dos columnas separadas por la línea de margen del cuaderno; en el móvil, una debajo de otra.

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vite.dev/)
- JavaScript y CSS, sin librerías adicionales
- Fuentes [Atkinson Hyperlegible Next](https://fonts.google.com/specimen/Atkinson+Hyperlegible+Next) y [Lexend](https://fonts.google.com/specimen/Lexend) (licencia OFL), servidas desde la propia web: los visitantes no se conectan a Google

## Cómo ejecutarlo

Necesitas tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

```bash
# 1. Clonar el repositorio
git clone https://github.com/rubenpr13/tasktick.git
cd tasktick

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
tasktick/
├── index.html        # Página base donde se monta React
├── public/
│   ├── favicon.svg   # Icono de la pestaña
│   ├── vista-previa.png  # Imagen que sale al compartir el enlace
│   └── fonts/        # Fuentes y sus licencias
├── disenos/
│   └── vista-previa.html # Página de la que sale vista-previa.png (no se publica; instrucciones dentro)
├── vite.config.js    # Configuración de Vite
├── package.json      # Dependencias y comandos
└── src/
    ├── main.jsx          # Punto de entrada: monta el componente App
    ├── App.jsx           # Componente principal: monta la interfaz
    ├── App.css           # Estilos
    ├── config.js         # Presets, límites, nombres de los modos, ajustes del mapa y nombres de los datos guardados
    ├── utilidades.js     # Funciones de ayuda (duraciones, formatos, fechas locales, rachas, guardar en el navegador)
    ├── sonido.js         # La campanita (Web Audio)
    ├── hooks/
    │   ├── usePomodoro.js  # Lógica del temporizador
    │   └── useTareas.js    # Lógica de la lista de tareas
    └── components/       # Componentes de la interfaz
        ├── PestanasModo.jsx    # Pestañas de modo con su contador de sesiones
        ├── Temporizador.jsx    # Tiempo restante
        ├── Controles.jsx       # Botones Iniciar/Pausa, Detener y engranaje
        ├── SelectorPreset.jsx  # Botones de los presets Corto, Largo y Personalizado
        ├── VentanaPersonalizar.jsx  # Ventana para personalizar los tiempos
        ├── CampoMinutos.jsx    # Campo de minutos con botones − y +
        ├── ListaTareas.jsx     # Columna de tareas: campo para añadir y lista
        ├── Tarea.jsx           # Una tarea: casilla, texto editable y botón ×
        └── Constancia.jsx      # Racha y mapa de calor del año
```

## Detalles técnicos

El temporizador no se fía solo de `setInterval`: cuando la pestaña está en segundo plano, el navegador lo ralentiza. Por eso, al pulsar Iniciar se guarda la hora de fin y en cada segundo se calcula lo que falta con la hora local del dispositivo (`Date.now()`). Así la cuenta atrás es exacta aunque cambies de pestaña.

Las fechas del historial también se guardan con la hora local (`AAAA-MM-DD`), así que el día cambia a tu medianoche, no a la de otro huso horario.

## Licencia

[MIT](LICENSE) © 2026 rubenpr13
