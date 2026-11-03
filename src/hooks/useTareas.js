import { useEffect, useRef, useState } from "react";
import { CLAVES_GUARDADO } from "../config.js";
import { guardar, leerGuardado } from "../utilidades.js";

// ----- Hook de la lista de tareas -----
// Aquí vive toda la lógica de las tareas; los componentes solo usan lo que devuelve.
// Las tareas se guardan en el navegador, así no se pierden al recargar la página.

export default function useTareas() {
  // Cada tarea es un objeto { id, texto, hecha }. Al abrir, se cargan las guardadas
  const [tareas, setTareas] = useState(() => leerGuardado(CLAVES_GUARDADO.tareas, []));
  // Número que se da como id a la próxima tarea: uno más que el mayor de las guardadas
  const siguienteId = useRef(tareas.reduce((mayor, tarea) => Math.max(mayor, tarea.id), 0) + 1);

  // Cada vez que cambia la lista, se guarda en el navegador
  useEffect(() => {
    guardar(CLAVES_GUARDADO.tareas, tareas);
  }, [tareas]);

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
