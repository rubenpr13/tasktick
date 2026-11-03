import { useEffect, useState } from "react";
import usePomodoro from "./hooks/usePomodoro.js";
import useTareas from "./hooks/useTareas.js";
import { TIEMPOS_PERSONALIZADOS_INICIALES, NOMBRES_MODO } from "./config.js";
import { formatearTiempo, obtenerDuracion } from "./utilidades.js";
import PestanasModo from "./components/PestanasModo.jsx";
import Temporizador from "./components/Temporizador.jsx";
import Controles from "./components/Controles.jsx";
import SelectorPreset from "./components/SelectorPreset.jsx";
import VentanaPersonalizar from "./components/VentanaPersonalizar.jsx";
import ListaTareas from "./components/ListaTareas.jsx";
import Constancia from "./components/Constancia.jsx";

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
    historial,
    tiemposPersonalizados,
    alternarPlayPausa,
    detener,
    cambiarModo,
    cambiarPreset,
    guardarTiemposPersonalizados,
  } = usePomodoro();

  const { tareas, anadirTarea, alternarHecha, editarTarea, borrarTarea } = useTareas();

  // Título de la pestaña del navegador: mientras el reloj corre muestra lo que queda
  // (por ejemplo "24:13 · Concentración"); en pausa vuelve a "TaskTick"
  useEffect(() => {
    document.title = enMarcha
      ? `${formatearTiempo(segundosRestantes)} · ${NOMBRES_MODO[modo]}`
      : "TaskTick";
  }, [enMarcha, segundosRestantes, modo]);

  // true si el reloj está parado a mitad (ya había empezado a contar y no ha vuelto al inicio)
  const enPausa = !enMarcha && segundosRestantes < obtenerDuracion(modo, preset, tiemposPersonalizados);

  // true mientras la ventana de personalizar está abierta
  const [ventanaAbierta, setVentanaAbierta] = useState(false);

  function guardarYCerrar(nuevosTiempos) {
    guardarTiemposPersonalizados(nuevosTiempos);
    setVentanaAbierta(false);
  }

  return (
    <main className={`app modo-${modo}`}>
      {/* Cabecera con el nombre de la app: la casilla marcada (el "tick") y "TaskTick" */}
      <header className="cabecera">
        <h1 className="marca">
          <span className="marca-casilla" aria-hidden="true"></span>
          TaskTick
        </h1>
      </header>

      <div className="hoja">
        <section className="columna columna-reloj">
          <h2 className="titulo">Temporizador</h2>

          <PestanasModo modo={modo} sesiones={sesiones} onCambiarModo={cambiarModo} />

          <Temporizador segundos={segundosRestantes} modo={modo} enPausa={enPausa} />

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
        </section>

        <ListaTareas
          tareas={tareas}
          onAnadir={anadirTarea}
          onAlternarHecha={alternarHecha}
          onEditar={editarTarea}
          onBorrar={borrarTarea}
        />
      </div>

      <Constancia historial={historial} />

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
