import { MINUTOS_MINIMO, MINUTOS_MAXIMO } from "../config.js";

// Un campo de minutos con botones − y + a los lados.
// Props:
// - etiqueta: texto que se ve encima (por ejemplo "Concentración")
// - valor: lo que hay escrito en el campo (texto, puede estar vacío mientras se escribe)
// - esValido: false si el valor está fuera de los límites; entonces se marca en rojo
// - onCambiar: función que se llama con el nuevo valor (texto)
export default function CampoMinutos({ etiqueta, valor, esValido, onCambiar }) {
  // Suma o resta minutos sin salirse de los límites
  function sumar(cantidad) {
    const numero = Math.round(Number(valor)) || 0;
    const nuevo = Math.min(MINUTOS_MAXIMO, Math.max(MINUTOS_MINIMO, numero + cantidad));
    onCambiar(String(nuevo));
  }

  return (
    <div className={`campo-minutos ${esValido ? "" : "error"}`}>
      <span className="campo-etiqueta">{etiqueta}</span>
      <div className="campo-fila">
        <button
          type="button"
          className="campo-boton"
          aria-label={`Restar un minuto a ${etiqueta}`}
          onClick={() => sumar(-1)}
        >
          −
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={MINUTOS_MINIMO}
          max={MINUTOS_MAXIMO}
          step="1"
          aria-label={`${etiqueta} (minutos)`}
          value={valor}
          onChange={(evento) => onCambiar(evento.target.value)}
        />
        <span className="campo-unidad">min</span>
        <button
          type="button"
          className="campo-boton"
          aria-label={`Sumar un minuto a ${etiqueta}`}
          onClick={() => sumar(1)}
        >
          +
        </button>
      </div>
      {!esValido && (
        <p className="campo-aviso">
          Entre {MINUTOS_MINIMO} y {MINUTOS_MAXIMO} minutos
        </p>
      )}
    </div>
  );
}
