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

// ----- Datos guardados en el navegador -----

// Nombres con los que se guarda cada dato en el localStorage del navegador
export const CLAVES_GUARDADO = {
  tareas: "tasktick-tareas",
  tiempos: "tasktick-tiempos-personalizados",
  historial: "tasktick-historial", // sesiones de cada día: { "2026-11-03": { foco: 3, ..., minutosFoco: 75 } }
};

// ----- Configuración de la constancia (racha y mapa de calor) -----

// Minutos de concentración al día que separan los tonos del mapa:
// menos de 1 h, de 1 a 2 h, de 2 a 3 h y 3 h o más
export const TRAMOS_MINUTOS = [60, 120, 180];

// ----- Configuración de la lista de tareas -----

// Número máximo de caracteres que puede tener el texto de una tarea
export const LARGO_MAXIMO_TAREA = 100;
