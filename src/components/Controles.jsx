// Botones Play/Pausa, Detener y Personalizar (⚙).
// Props:
// - enMarcha: true si el temporizador está contando
// - onPlayPausa: función que pone en marcha o pausa el temporizador
// - onDetener: función que pausa y vuelve al inicio del modo actual
// - onPersonalizar: función que abre la ventana para personalizar los tiempos
export default function Controles({ enMarcha, onPlayPausa, onDetener, onPersonalizar }) {
  return (
    <div className="controles">
      <button className="boton boton-principal" onClick={onPlayPausa}>
        {enMarcha ? "Pausa" : "Play"}
      </button>
      <button className="boton boton-secundario" onClick={onDetener}>
        Detener
      </button>
      <button
        className="boton boton-secundario boton-icono"
        title="Personalizar tiempos"
        aria-label="Personalizar tiempos"
        onClick={onPersonalizar}
      >
        ⚙
      </button>
    </div>
  );
}
