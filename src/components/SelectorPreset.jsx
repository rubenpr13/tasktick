import { PRESETS } from "../config.js";

// Botones para elegir el preset (Corto, Largo y, si se ha guardado, Personalizado).
// Solo muestran el nombre del preset.
// Props:
// - preset: preset activo ("corto", "largo" o "personalizado")
// - tiemposPersonalizados: tiempos guardados por el usuario, o null si aún no hay
// - onCambiarPreset: función que se llama con el preset pulsado
export default function SelectorPreset({ preset, tiemposPersonalizados, onCambiarPreset }) {
  return (
    <div className="presets">
      {Object.keys(PRESETS).map((clave) => (
        <button
          key={clave}
          className={`preset ${preset === clave ? "activo" : ""}`}
          onClick={() => onCambiarPreset(clave)}
        >
          {PRESETS[clave].nombre}
        </button>
      ))}

      {/* El preset Personalizado solo aparece cuando el usuario ha guardado sus tiempos */}
      {tiemposPersonalizados && (
        <button
          className={`preset ${preset === "personalizado" ? "activo" : ""}`}
          onClick={() => onCambiarPreset("personalizado")}
        >
          Personalizado
        </button>
      )}
    </div>
  );
}
