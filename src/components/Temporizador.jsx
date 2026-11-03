import { formatearTiempo } from "../utilidades.js";

// Muestra el tiempo que queda en formato "MM:SS".
// Los números llevan detrás un trazo de subrayador del color del modo.
// Props:
// - segundos: segundos que quedan
// - modo: modo activo; al cambiar, el subrayador se vuelve a pintar
export default function Temporizador({ segundos, modo }) {
  return (
    <p className="tiempo">
      {/* key={modo} hace que React cree el span de nuevo al cambiar de modo, y así se repite la animación */}
      <span key={modo} className="tiempo-numeros">
        {formatearTiempo(segundos)}
      </span>
    </p>
  );
}
