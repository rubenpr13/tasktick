import { NOMBRES_MODO } from "../config.js";

// Pestañas de modo, cada una con su contador de sesiones completadas.
// Props:
// - modo: modo activo ("foco", "descansoCorto" o "descansoLargo")
// - sesiones: objeto con el número de sesiones de cada modo
// - alCambiarModo: función que se llama con el modo pulsado
export default function PestanasModo({ modo, sesiones, alCambiarModo }) {
  return (
    <nav className="pestanas">
      {Object.keys(NOMBRES_MODO).map((clave) => (
        <button
          key={clave}
          className={`pestana ${modo === clave ? "activa" : ""}`}
          onClick={() => alCambiarModo(clave)}
        >
          {NOMBRES_MODO[clave]}
          <span className="contador">{sesiones[clave]}</span>
        </button>
      ))}
    </nav>
  );
}
