import { useState } from "react";
import usePomodoro from "./hooks/usePomodoro.js";
import useTareas from "./hooks/useTareas.js";
import { TIEMPOS_PERSONALIZADOS_INICIALES } from "./config.js";
import PestanasModo from "./components/PestanasModo.jsx";
import Temporizador from "./components/Temporizador.jsx";
import Controles from "./components/Controles.jsx";
import SelectorPreset from "./components/SelectorPreset.jsx";
import VentanaPersonalizar from "./components/VentanaPersonalizar.jsx";
import ListaTareas from "./components/ListaTareas.jsx";

// ----- Componente principal -----
// Obtiene los datos y las acciones del reloj (usePomodoro) y de las tareas (useTareas)
// y se los pasa a cada componente por props.

export default function App() {
  const {
    preset,
    modo,
    segundosRestantes,
    enMarcha,
    sesiones,
    tiemposPersonalizados,
    alternarPlayPausa,
    detener,
    cambiarModo,
    cambiarPreset,
    guardarTiemposPersonalizados,
  } = usePomodoro();

  const { tareas, anadirTarea, alternarHecha, editarTarea, borrarTarea } = useTareas();

  // true mientras la ventana de personalizar está abierta
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  function guardarYCerrar(nuevosTiempos) {
    guardarTiemposPersonalizados(nuevosTiempos);
    setVentanaAbierta(false);
  }

  return (
    <main className={`app modo-${modo}`}>
      <div className="tarjeta">
        <h1 className="titulo">Study App</h1>

        <PestanasModo modo={modo} sesiones={sesiones} onCambiarModo={cambiarModo} />

        <Temporizador segundos={segundosRestantes} />

        <Controles
          enMarcha={enMarcha}
          onPlayPausa={alternarPlayPausa}
          onDetener={detener}
          onPersonalizar={() => setVentanaAbierta(true)}
        />

        <SelectorPreset
          preset={preset}
          tiemposPersonalizados={tiemposPersonalizados}
          onCambiarPreset={cambiarPreset}
        />
      </div>

      <ListaTareas
        tareas={tareas}
        onAnadir={anadirTarea}
        onAlternarHecha={alternarHecha}
        onEditar={editarTarea}
        onBorrar={borrarTarea}
      />

      {/* La ventana se abre con los últimos tiempos guardados (al principio 25 / 5 / 30) */}
      {ventanaAbierta && (
        <VentanaPersonalizar
          tiempos={tiemposPersonalizados ?? TIEMPOS_PERSONALIZADOS_INICIALES}
          onGuardar={guardarYCerrar}
          onCancelar={() => setVentanaAbierta(false)}
        />
      )}
    </main>
  );
}
