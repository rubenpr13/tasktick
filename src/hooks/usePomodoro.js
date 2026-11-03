import { useEffect, useState } from "react";
import { CLAVES_GUARDADO } from "../config.js";
import { fechaDeHoy, guardar, leerGuardado, obtenerDuracion } from "../utilidades.js";
import { prepararSonido, sonarCampanita } from "../sonido.js";

// Sesiones de un día en el que aún no se ha terminado ninguna
const SIN_SESIONES = { foco: 0, descansoCorto: 0, descansoLargo: 0, minutosFoco: 0 };

// ----- Hook del temporizador Pomodoro -----
// Un hook es una función que empieza por "use" y agrupa estado y efectos de React.
// Aquí vive toda la lógica del reloj; los componentes solo usan lo que devuelve.

export default function usePomodoro() {
  const [preset, setPreset] = useState("corto");
  const [modo, setModo] = useState("foco");
  const [segundosRestantes, setSegundosRestantes] = useState(obtenerDuracion("foco", "corto"));
  const [enMarcha, setEnMarcha] = useState(false); // false = espera a que el usuario pulse Iniciar
  // Historial guardado en el navegador: sesiones terminadas de cada día, por fecha local,
  // y los minutos de concentración de ese día (para el mapa de calor)
  // ({ "2026-11-03": { foco: 3, descansoCorto: 2, descansoLargo: 0, minutosFoco: 75 }, ... })
  const [historial, setHistorial] = useState(() => leerGuardado(CLAVES_GUARDADO.historial, {}));
  // Los contadores de las pestañas muestran solo las sesiones de hoy (a medianoche vuelven a 0)
  const sesiones = historial[fechaDeHoy()] ?? SIN_SESIONES;
  // Tiempos del preset Personalizado; null hasta que el usuario los guarde por primera vez.
  // Se guardan en el navegador: tras recargar, el preset Personalizado sigue disponible
  const [tiemposPersonalizados, setTiemposPersonalizados] = useState(() =>
    leerGuardado(CLAVES_GUARDADO.tiempos, null)
  );

  // Guardar en el navegador el historial y los tiempos personalizados cada vez que cambian
  useEffect(() => {
    guardar(CLAVES_GUARDADO.historial, historial);
  }, [historial]);

  useEffect(() => {
    if (tiemposPersonalizados !== null) guardar(CLAVES_GUARDADO.tiempos, tiemposPersonalizados);
  }, [tiemposPersonalizados]);

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

    // Aviso: suena una campanita
    sonarCampanita();

    // Solo aquí se suma la sesión: cuando el temporizador ha terminado. Se apunta en el día de hoy.
    // Si era de concentración, también se suman sus minutos (25, 50 o los personalizados)
    const minutosSesion = modo === "foco" ? obtenerDuracion(modo, preset, tiemposPersonalizados) / 60 : 0;
    setHistorial((anterior) => {
      const hoy = fechaDeHoy();
      const delDia = { ...SIN_SESIONES, ...anterior[hoy] };
      return {
        ...anterior,
        [hoy]: { ...delDia, [modo]: delDia[modo] + 1, minutosFoco: delDia.minutosFoco + minutosSesion },
      };
    });

    // Concentración -> Descanso corto; cualquier descanso -> Concentración
    const siguienteModo = modo === "foco" ? "descansoCorto" : "foco";
    setModo(siguienteModo);
    setSegundosRestantes(obtenerDuracion(siguienteModo, preset, tiemposPersonalizados));

    // El nuevo modo queda en pausa hasta que el usuario pulse Iniciar
    setEnMarcha(false);
  }, [segundosRestantes]);

  // ----- Acciones -----

  function alternarPlayPausa() {
    prepararSonido(); // para que la campanita pueda sonar al llegar a 00:00
    setEnMarcha(!enMarcha);
  }

  function detener() {
    setEnMarcha(false);
    setSegundosRestantes(obtenerDuracion(modo, preset, tiemposPersonalizados));
  }

  function cambiarModo(nuevoModo) {
    setEnMarcha(false);
    setModo(nuevoModo);
    setSegundosRestantes(obtenerDuracion(nuevoModo, preset, tiemposPersonalizados));
  }

  function cambiarPreset(nuevoPreset) {
    setEnMarcha(false);
    setPreset(nuevoPreset);
    setSegundosRestantes(obtenerDuracion(modo, nuevoPreset, tiemposPersonalizados));
  }

  // Guarda los tiempos personalizados (en minutos), activa el preset Personalizado
  // y reinicia el modo actual con su nueva duración, en pausa
  function guardarTiemposPersonalizados(nuevosTiempos) {
    setEnMarcha(false);
    setTiemposPersonalizados(nuevosTiempos);
    setPreset("personalizado");
    setSegundosRestantes(obtenerDuracion(modo, "personalizado", nuevosTiempos));
  }

  // Lo que pueden usar los componentes: los datos y las acciones
  return {
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
  };
}
