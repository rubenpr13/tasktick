import { PRESETS } from "../config.js";

// Botones para elegir el preset (Corto, Largo y, si se ha guardado, Personalizado).
// Los textos salen de PRESETS, así que si cambias una duración se actualiza solo.
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
          <strong>{PRESETS[clave].nombre}</strong>
          <span>
            {PRESETS[clave].foco} min foco · {PRESETS[clave].descanso} min descanso
          </span>
        </button>
      ))}

      {/* El preset Personalizado solo aparece cuando el usuario ha guardado sus tiempos */}
      {tiemposPersonalizados && (
        <button
          className={`preset preset-personalizado ${preset === "personalizado" ? "activo" : ""}`}
          onClick={() => onCambiarPreset("personalizado")}
        >
          <strong>Personalizado</strong>
          <span>
            {tiemposPersonalizados.foco} min foco · {tiemposPersonalizados.descansoCorto} min
            descanso · {tiemposPersonalizados.descansoLargo} min descanso largo
          </span>
        </button>
      )}
    </div>
  );
}
