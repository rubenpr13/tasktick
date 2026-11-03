import { PRESETS, DESCANSO_LARGO, TRAMOS_MINUTOS } from "./config.js";

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

// Convierte minutos en texto: 45 -> "45 min", 60 -> "1 h", 75 -> "1 h 15 min"
export function formatearMinutos(minutos) {
  const horas = Math.floor(minutos / 60);
  const resto = Math.round(minutos % 60);
  if (horas === 0) return `${resto} min`;
  if (resto === 0) return `${horas} h`;
  return `${horas} h ${resto} min`;
}

// ----- Fechas -----
// Las fechas se guardan como texto "AAAA-MM-DD" con la hora local del usuario (nunca UTC)

// Convierte una fecha de JavaScript en texto "AAAA-MM-DD"
export function textoDeFecha(fecha) {
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

// Convierte un texto "AAAA-MM-DD" en una fecha de JavaScript (ese día a las 00:00, hora local)
export function leerFecha(texto) {
  const [anio, mes, dia] = texto.split("-").map(Number);
  return new Date(anio, mes - 1, dia);
}

// Devuelve la fecha de hoy como texto "AAAA-MM-DD"
export function fechaDeHoy() {
  return textoDeFecha(new Date());
}

// Suma (o resta, con un número negativo) días a una fecha "AAAA-MM-DD"
export function sumarDias(texto, dias) {
  const fecha = leerFecha(texto);
  fecha.setDate(fecha.getDate() + dias);
  return textoDeFecha(fecha);
}

// ----- Constancia: rachas y tonos del mapa de calor -----

// Calcula la racha actual y la mejor racha (días seguidos con al menos una concentración terminada)
export function calcularRachas(historial) {
  const estudioEse = (fecha) => (historial[fecha]?.foco ?? 0) > 0;

  // Racha actual: se cuenta hacia atrás desde hoy. Si hoy aún no has estudiado, desde ayer
  // (la racha no se rompe hasta que acaba el día)
  const hoy = fechaDeHoy();
  let dia = estudioEse(hoy) ? hoy : sumarDias(hoy, -1);
  let actual = 0;
  while (estudioEse(dia)) {
    actual += 1;
    dia = sumarDias(dia, -1);
  }

  // Mejor racha: se recorren en orden los días con estudio y se cuentan los que van seguidos
  const diasConEstudio = Object.keys(historial).filter(estudioEse).sort();
  let mejor = 0;
  let seguidos = 0;
  let anterior = null;
  for (const fecha of diasConEstudio) {
    seguidos = anterior !== null && sumarDias(anterior, 1) === fecha ? seguidos + 1 : 1;
    mejor = Math.max(mejor, seguidos);
    anterior = fecha;
  }

  return { actual, mejor };
}

// Tono del mapa de calor (de 0 a 4) según los minutos de concentración de un día
export function nivelDeMinutos(minutos) {
  if (minutos <= 0) return 0;
  if (minutos < TRAMOS_MINUTOS[0]) return 1;
  if (minutos < TRAMOS_MINUTOS[1]) return 2;
  if (minutos < TRAMOS_MINUTOS[2]) return 3;
  return 4;
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
