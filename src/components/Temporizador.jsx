import { formatearTiempo } from "../utilidades.js";

// Muestra el tiempo que queda en formato "MM:SS".
// Props:
// - segundos: segundos que quedan
export default function Temporizador({ segundos }) {
  return <p className="tiempo">{formatearTiempo(segundos)}</p>;
}
