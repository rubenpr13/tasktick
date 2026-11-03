// Botones Play/Pausa, Detener y Personalizar (engranaje).
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
        {/* Engranaje dibujado en SVG: el carácter ⚙ sale como emoji de colores en muchos móviles */}
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>
  );
}
