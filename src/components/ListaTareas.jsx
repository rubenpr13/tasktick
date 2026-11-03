import { useState } from "react";
import { LARGO_MAXIMO_TAREA } from "../config.js";
import Tarea from "./Tarea.jsx";

// Columna con la lista de tareas: campo para añadir una nueva y la lista.
// Props:
// - tareas: lista de tareas ({ id, texto, hecha })
// - onAnadir: función que se llama con el texto de la tarea nueva
// - onAlternarHecha: función que se llama con el id de la tarea marcada o desmarcada
// - onEditar: función que se llama con el id y el texto nuevo de una tarea
// - onBorrar: función que se llama con el id de la tarea que se borra
export default function ListaTareas({ tareas, onAnadir, onAlternarHecha, onEditar, onBorrar }) {
  // Lo que el usuario va escribiendo en el campo antes de añadirlo
  const [textoNuevo, setTextoNuevo] = useState("");

  // Se llama al pulsar + o Enter
  function anadir(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página
    const limpio = textoNuevo.trim(); // quita los espacios de los extremos
    if (limpio === "") return; // una tarea vacía no se añade
    onAnadir(limpio);
    setTextoNuevo("");
  }

  return (
    <section className="columna columna-tareas">
      <h2 className="titulo">To Do List</h2>

      <form className="tareas-formulario" onSubmit={anadir}>
        <input
          type="text"
          className="tareas-campo"
          placeholder="Nueva tarea…"
          aria-label="Nueva tarea"
          maxLength={LARGO_MAXIMO_TAREA}
          value={textoNuevo}
          onChange={(evento) => setTextoNuevo(evento.target.value)}
        />
        <button type="submit" className="tareas-anadir" aria-label="Añadir tarea">
          +
        </button>
      </form>

      {tareas.length === 0 ? (
        <p className="tareas-vacia">No hay tareas. Añade la primera.</p>
      ) : (
        <ul className="tareas-lista">
          {tareas.map((tarea) => (
            <Tarea
              key={tarea.id}
              tarea={tarea}
              onAlternarHecha={() => onAlternarHecha(tarea.id)}
              onEditar={(nuevoTexto) => onEditar(tarea.id, nuevoTexto)}
              onBorrar={() => onBorrar(tarea.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
