// Botones Play/Pausa y Detener.
// Props:
// - enMarcha: true si el temporizador está contando
// - alPulsarPlayPausa: función que pone en marcha o pausa el temporizador
// - alDetener: función que pausa y vuelve al inicio del modo actual
export default function Controles({ enMarcha, alPulsarPlayPausa, alDetener }) {
  return (
    <div className="controles">
      <button className="boton boton-principal" onClick={alPulsarPlayPausa}>
        {enMarcha ? "Pausa" : "Play"}
      </button>
      <button className="boton boton-secundario" onClick={alDetener}>
        Detener
      </button>
    </div>
  );
}
