import { useRef, useState } from "react";

// ----- Hook de la lista de tareas -----
// Aquí vive toda la lógica de las tareas; los componentes solo usan lo que devuelve.
// Las tareas están solo en memoria: al recargar la página se pierden.

export default function useTareas() {
  // Cada tarea es un objeto { id, texto, hecha }
  const [tareas, setTareas] = useState([]);
  // Número que se da como id a la próxima tarea (para que cada una tenga uno distinto)
  const siguienteId = useRef(1);

  // Añade una tarea al final de la lista (el texto ya llega sin espacios en los extremos)
  function anadirTarea(texto) {
    const nueva = { id: siguienteId.current, texto, hecha: false };
    siguienteId.current += 1;
    setTareas((anteriores) => [...anteriores, nueva]);
  }

  // Marca una tarea como hecha, o como pendiente si ya estaba hecha
  function alternarHecha(id) {
    setTareas((anteriores) =>
      anteriores.map((tarea) => (tarea.id === id ? { ...tarea, hecha: !tarea.hecha } : tarea))
    );
  }

  // Cambia el texto de una tarea
  function editarTarea(id, nuevoTexto) {
    setTareas((anteriores) =>
      anteriores.map((tarea) => (tarea.id === id ? { ...tarea, texto: nuevoTexto } : tarea))
    );
  }

  // Quita una tarea de la lista
  function borrarTarea(id) {
    setTareas((anteriores) => anteriores.filter((tarea) => tarea.id !== id));
  }

  return { tareas, anadirTarea, alternarHecha, editarTarea, borrarTarea };
}
