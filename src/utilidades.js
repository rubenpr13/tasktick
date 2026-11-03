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

// Devuelve la fecha de hoy como texto "AAAA-MM-DD", con la hora local del usuario (nunca UTC)
export function fechaDeHoy() {
  const ahora = new Date();
  const mes = String(ahora.getMonth() + 1).padStart(2, "0");
  const dia = String(ahora.getDate()).padStart(2, "0");
  return `${ahora.getFullYear()}-${mes}-${dia}`;
}

// ----- Guardar datos en el navegador (localStorage) -----
// Se guardan como texto JSON. Si el navegador no deja (modo privado, sin espacio…),
// la app sigue funcionando igual, solo que no recuerda nada al recargar.

// Lee un dato guardado; si no hay nada, devuelve valorPorDefecto
export function leerGuardado(clave, valorPorDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    return texto === null ? valorPorDefecto : JSON.parse(texto);
  } catch {
    return valorPorDefecto;
  }
}

// Guarda un dato (un objeto, una lista, un número…)
export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // No se ha podido guardar: no pasa nada, la app sigue funcionando
  }
}
