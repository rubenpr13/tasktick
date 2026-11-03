import usePomodoro from "./hooks/usePomodoro.js";
import PestanasModo from "./components/PestanasModo.jsx";
import Temporizador from "./components/Temporizador.jsx";
import Controles from "./components/Controles.jsx";
import SelectorPreset from "./components/SelectorPreset.jsx";

// ----- Componente principal -----
// Obtiene los datos y las acciones del reloj con usePomodoro y se los pasa a cada componente por props.

export default function App() {
  const {
    preset,
    modo,
    segundosRestantes,
    enMarcha,
    sesiones,
    alternarPlayPausa,
    detener,
    cambiarModo,
    cambiarPreset,
  } = usePomodoro();

  return (
    <main className={`app modo-${modo}`}>
      <div className="tarjeta">
        <h1 className="titulo">Study App</h1>

        <PestanasModo modo={modo} sesiones={sesiones} onCambiarModo={cambiarModo} />

        <Temporizador segundos={segundosRestantes} />

        <Controles enMarcha={enMarcha} onPlayPausa={alternarPlayPausa} onDetener={detener} />

        <SelectorPreset preset={preset} onCambiarPreset={cambiarPreset} />
      </div>
    </main>
  );
}
