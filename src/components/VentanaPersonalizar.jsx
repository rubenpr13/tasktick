import { useEffect, useState } from "react";
import { NOMBRES_MODO, MINUTOS_MINIMO, MINUTOS_MAXIMO } from "../config.js";
import CampoMinutos from "./CampoMinutos.jsx";

// Comprueba que un valor escrito sea un número entero dentro de los límites
function esMinutoValido(valor) {
  const numero = Number(valor);
  return valor !== "" && Number.isInteger(numero) && numero >= MINUTOS_MINIMO && numero <= MINUTOS_MAXIMO;
}

// Ventana emergente para cambiar los tiempos del preset Personalizado.
// Los cambios solo se aplican al pulsar Guardar.
// Props:
// - tiempos: tiempos de partida en minutos ({ foco, descansoCorto, descansoLargo })
// - onGuardar: función que se llama con los tiempos nuevos (en minutos)
// - onCancelar: función que cierra la ventana sin guardar
export default function VentanaPersonalizar({ tiempos, onGuardar, onCancelar }) {
  // Lo que el usuario va escribiendo, como texto. No se aplica hasta pulsar Guardar.
  const [valores, setValores] = useState({
    foco: String(tiempos.foco),
    descansoCorto: String(tiempos.descansoCorto),
    descansoLargo: String(tiempos.descansoLargo),
  });

  // Cerrar con la tecla Escape
  useEffect(() => {
    function alPulsarTecla(evento) {
      if (evento.key === "Escape") onCancelar();
    }
    window.addEventListener("keydown", alPulsarTecla);
    return () => window.removeEventListener("keydown", alPulsarTecla);
  }, [onCancelar]);

  // Solo se puede guardar si los tres valores son válidos
  const todoValido = Object.values(valores).every(esMinutoValido);

  function cambiarValor(modo, nuevoValor) {
    setValores({ ...valores, [modo]: nuevoValor });
  }

  function guardar(evento) {
    evento.preventDefault(); // evita que el formulario recargue la página
    if (!todoValido) return;
    onGuardar({
      foco: Number(valores.foco),
      descansoCorto: Number(valores.descansoCorto),
      descansoLargo: Number(valores.descansoLargo),
    });
  }

  // Cerrar al pulsar en el fondo oscuro (pero no dentro de la ventana)
  function alPulsarFondo(evento) {
    if (evento.target === evento.currentTarget) onCancelar();
  }

  return (
    <div className="fondo-ventana" onClick={alPulsarFondo}>
      <form
        className="ventana"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-ventana"
        onSubmit={guardar}
      >
        <h2 id="titulo-ventana" className="ventana-titulo">
          Personalizar tiempos
        </h2>

        {Object.keys(NOMBRES_MODO).map((modo) => (
          <CampoMinutos
            key={modo}
            etiqueta={NOMBRES_MODO[modo]}
            valor={valores[modo]}
            esValido={esMinutoValido(valores[modo])}
            onCambiar={(nuevoValor) => cambiarValor(modo, nuevoValor)}
          />
        ))}

        <div className="ventana-botones">
          <button type="button" className="boton boton-secundario" onClick={onCancelar}>
            Cancelar
          </button>
          <button type="submit" className="boton boton-principal" disabled={!todoValido}>
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
