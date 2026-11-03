import { PRESETS, DESCANSO_LARGO } from "./config.js";

// ----- Funciones de ayuda -----

// Devuelve cuántos segundos dura un modo según el preset elegido.
// Con el preset "personalizado" usa los tiempos que ha guardado el usuario.
export function obtenerDuracion(modo, preset, tiemposPersonalizados) {
  if (preset === "personalizado") return tiemposPersonalizados[modo] * 60;
  if (modo === "foco") return PRESETS[preset].foco * 60;
  if (modo === "descansoCorto") return PRESETS[preset].descanso * 60;
  return DESCANSO_LARGO * 60;
}

// Convierte segundos en texto "MM:SS" (por ejemplo 1500 -> "25:00")
export function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return `${String(minutos).padStart(2, "0")}:${String(resto).padStart(2, "0")}`;
}
