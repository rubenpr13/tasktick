# Study App

Web para estudiar con la **técnica Pomodoro**: alterna bloques de concentración con descansos cortos para estudiar sin agotarte.

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

## Tecnologías

- [React 18](https://react.dev/)
- [Vite 5](https://vite.dev/)
- JavaScript y CSS, sin librerías adicionales

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
    ├── config.js         # Presets, descanso largo, límites de minutos y nombres de los modos
    ├── utilidades.js     # Funciones de ayuda (duración de un modo, formato MM:SS)
    ├── hooks/
    │   └── usePomodoro.js  # Lógica del temporizador
    └── components/       # Componentes de la interfaz
        ├── PestanasModo.jsx    # Pestañas de modo con su contador de sesiones
        ├── Temporizador.jsx    # Tiempo restante
        ├── Controles.jsx       # Botones Play/Pausa, Detener y ⚙
        ├── SelectorPreset.jsx  # Botones de los presets Corto, Largo y Personalizado
        ├── VentanaPersonalizar.jsx  # Ventana para personalizar los tiempos
        └── CampoMinutos.jsx    # Campo de minutos con botones − y +
```

## Detalles técnicos

El temporizador no se fía solo de `setInterval`: cuando la pestaña está en segundo plano, el navegador lo ralentiza. Por eso, al pulsar Play se guarda la hora de fin y en cada segundo se calcula lo que falta con la hora local del dispositivo (`Date.now()`). Así la cuenta atrás es exacta aunque cambies de pestaña.
