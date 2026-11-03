import { PRESETS } from "../config.js";

// Botones para elegir el preset (Corto o Largo).
// Los textos salen de PRESETS, así que si cambias una duración se actualiza solo.
// Props:
// - preset: preset activo ("corto" o "largo")
// - onCambiarPreset: función que se llama con el preset pulsado
export default function SelectorPreset({ preset, onCambiarPreset }) {
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
    </div>
  );
}
