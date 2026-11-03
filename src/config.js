// ----- Configuración del temporizador -----

// Presets: nombre que se ve en pantalla y duraciones en minutos
export const PRESETS = {
  corto: { nombre: "Corto", foco: 25, descanso: 5 },
  largo: { nombre: "Largo", foco: 50, descanso: 10 },
};

// El descanso largo siempre dura 30 minutos
export const DESCANSO_LARGO = 30;

// Nombre que se ve en pantalla para cada modo
export const NOMBRES_MODO = {
  foco: "Concentración",
  descansoCorto: "Descanso corto",
  descansoLargo: "Descanso largo",
};
