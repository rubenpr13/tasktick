// ----- Configuración del temporizador -----

// Presets: nombre que se ve en pantalla y duraciones en minutos
export const PRESETS = {
  corto: { nombre: "Corto", foco: 25, descanso: 5 },
  largo: { nombre: "Largo", foco: 50, descanso: 10 },
};

// El descanso largo siempre dura 30 minutos
export const DESCANSO_LARGO = 30;

// Tiempos del preset Personalizado (en minutos) hasta que el usuario guarde los suyos
export const TIEMPOS_PERSONALIZADOS_INICIALES = {
  foco: 25,
  descansoCorto: 5,
  descansoLargo: 30,
};

// Límites de minutos que se pueden poner al personalizar
export const MINUTOS_MINIMO = 1;
export const MINUTOS_MAXIMO = 120;

// Nombre que se ve en pantalla para cada modo
export const NOMBRES_MODO = {
  foco: "Concentración",
  descansoCorto: "Descanso corto",
  descansoLargo: "Descanso largo",
};

// ----- Configuración de la lista de tareas -----

// Número máximo de caracteres que puede tener el texto de una tarea
export const LARGO_MAXIMO_TAREA = 100;
