// Botones Play/Pausa y Detener.
// Props:
// - enMarcha: true si el temporizador está contando
// - onPlayPausa: función que pone en marcha o pausa el temporizador
// - onDetener: función que pausa y vuelve al inicio del modo actual
export default function Controles({ enMarcha, onPlayPausa, onDetener }) {
  return (
    <div className="controles">
      <button className="boton boton-principal" onClick={onPlayPausa}>
        {enMarcha ? "Pausa" : "Play"}
      </button>
      <button className="boton boton-secundario" onClick={onDetener}>
        Detener
      </button>
    </div>
  );
}
