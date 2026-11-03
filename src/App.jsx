import { useEffect, useState } from "react";
import { obtenerDuracion } from "./utilidades.js";
import PestanasModo from "./components/PestanasModo.jsx";
import Temporizador from "./components/Temporizador.jsx";
import Controles from "./components/Controles.jsx";
import SelectorPreset from "./components/SelectorPreset.jsx";

// ----- Componente principal -----
// Guarda el estado y la lógica del temporizador, y se lo pasa a cada componente por props.

export default function App() {
  const [preset, setPreset] = useState("corto");
  const [modo, setModo] = useState("foco");
  const [segundosRestantes, setSegundosRestantes] = useState(obtenerDuracion("foco", "corto"));
  const [enMarcha, setEnMarcha] = useState(false); // false = espera a que el usuario pulse Play
  const [sesiones, setSesiones] = useState({ foco: 0, descansoCorto: 0, descansoLargo: 0 });

  // 1) Cuenta atrás: mientras esté en marcha, se actualiza cada segundo.
  // Guardamos la hora local de fin y calculamos lo que falta con Date.now().
  // Así el tiempo es exacto aunque el navegador ralentice la pestaña en segundo plano.
  useEffect(() => {
    if (!enMarcha) return;

    const horaFin = Date.now() + segundosRestantes * 1000;

    const intervalo = setInterval(() => {
      const quedan = Math.max(0, Math.round((horaFin - Date.now()) / 1000));
      setSegundosRestantes(quedan);
    }, 1000);

    // Al pausar o cambiar de modo, paramos el intervalo anterior
    return () => clearInterval(intervalo);
    // Solo se reinicia al pausar/reanudar o al cambiar de modo (no en cada segundo)
  }, [enMarcha, modo]);

  // 2) Cuando el temporizador llega a 00:00: sumamos la sesión y cambiamos de modo
  useEffect(() => {
    if (segundosRestantes > 0) return;

    // Solo aquí se suma la sesión: cuando el temporizador ha terminado
    setSesiones((anteriores) => ({ ...anteriores, [modo]: anteriores[modo] + 1 }));

    // Concentración -> Descanso corto; cualquier descanso -> Concentración
    const siguienteModo = modo === "foco" ? "descansoCorto" : "foco";
    setModo(siguienteModo);
    setSegundosRestantes(obtenerDuracion(siguienteModo, preset));

    // El nuevo modo queda en pausa hasta que el usuario pulse Play
    setEnMarcha(false);
  }, [segundosRestantes]);

  // ----- Acciones de los botones -----

  function alternarPlayPausa() {
    setEnMarcha(!enMarcha);
  }

  function detener() {
    setEnMarcha(false);
    setSegundosRestantes(obtenerDuracion(modo, preset));
  }

  function cambiarModo(nuevoModo) {
    setEnMarcha(false);
    setModo(nuevoModo);
    setSegundosRestantes(obtenerDuracion(nuevoModo, preset));
  }

  function cambiarPreset(nuevoPreset) {
    setEnMarcha(false);
    setPreset(nuevoPreset);
    setSegundosRestantes(obtenerDuracion(modo, nuevoPreset));
  }

  // ----- Interfaz -----

  return (
    <main className={`app modo-${modo}`}>
      <div className="tarjeta">
        <h1 className="titulo">Study App</h1>

        <PestanasModo modo={modo} sesiones={sesiones} alCambiarModo={cambiarModo} />

        <Temporizador segundos={segundosRestantes} />

        <Controles
          enMarcha={enMarcha}
          alPulsarPlayPausa={alternarPlayPausa}
          alDetener={detener}
        />

        <SelectorPreset preset={preset} alCambiarPreset={cambiarPreset} />
      </div>
    </main>
  );
}
