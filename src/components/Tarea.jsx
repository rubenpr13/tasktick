import { useRef, useState } from "react";
import { LARGO_MAXIMO_TAREA } from "../config.js";

// Una fila de la lista de tareas: casilla, texto y botón ×.
// Con doble clic en el texto se puede editar: Enter o pulsar fuera guardan, Escape cancela.
// Props:
// - tarea: la tarea que se muestra ({ id, texto, hecha })
// - onAlternarHecha: función que se llama al marcar o desmarcar la casilla
// - onEditar: función que se llama con el texto nuevo
// - onBorrar: función que se llama al pulsar ×
export default function Tarea({ tarea, onAlternarHecha, onEditar, onBorrar }) {
  // true mientras se está editando el texto
  const [editando, setEditando] = useState(false);
  // Lo que el usuario va escribiendo mientras edita
  const [textoEditado, setTextoEditado] = useState(tarea.texto);
  // Se pone a true al pulsar Escape, para que al salir del campo no se guarde
  const cancelado = useRef(false);

  function empezarEdicion() {
    setTextoEditado(tarea.texto);
    setEditando(true);
  }

  // Se llama al salir del campo (con Enter, con Escape o pulsando fuera)
  function terminarEdicion() {
    const limpio = textoEditado.trim();
    // Si se canceló o el texto quedó vacío, se queda el texto anterior
    if (!cancelado.current && limpio !== "") {
      onEditar(limpio);
    }
    cancelado.current = false;
    setEditando(false);
  }

  function alPulsarTecla(evento) {
    if (evento.key === "Enter") {
      evento.target.blur(); // sale del campo y se guarda en terminarEdicion
    } else if (evento.key === "Escape") {
      cancelado.current = true;
      evento.target.blur();
    }
  }

  return (
    <li className={`tarea ${tarea.hecha ? "hecha" : ""}`}>
      <input
        type="checkbox"
        className="tarea-casilla"
        aria-label={`Marcar como hecha: ${tarea.texto}`}
        checked={tarea.hecha}
        onChange={onAlternarHecha}
      />

      {editando ? (
        <input
          type="text"
          className="tarea-campo"
          aria-label="Editar tarea"
          maxLength={LARGO_MAXIMO_TAREA}
          value={textoEditado}
          autoFocus
          onChange={(evento) => setTextoEditado(evento.target.value)}
          onKeyDown={alPulsarTecla}
          onBlur={terminarEdicion}
        />
      ) : (
        <span className="tarea-texto" onDoubleClick={empezarEdicion}>
          {tarea.texto}
        </span>
      )}

      <button
        type="button"
        className="tarea-borrar"
        aria-label={`Borrar tarea: ${tarea.texto}`}
        onClick={onBorrar}
      >
        ×
      </button>
    </li>
  );
}
