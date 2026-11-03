import { useEffect, useRef, useState } from "react";
import { SEMANAS_MAPA } from "../config.js";
import {
  calcularRachas,
  fechaDeHoy,
  formatearMinutos,
  leerFecha,
  nivelDeMinutos,
  sumarDias,
} from "../utilidades.js";

const NOMBRES_MES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const NOMBRES_DIA = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
// Letras de los días a la izquierda del mapa (fila 0 = lunes); solo se ven L, X y V
const LETRAS_DIA = ["L", "", "X", "", "V", "", ""];

// Texto de un día: "lun 3 nov: 1 h 15 min de concentración (3 sesiones)"
function describirDia(fecha, datos) {
  const dia = leerFecha(fecha);
  const nombre = `${NOMBRES_DIA[dia.getDay()]} ${dia.getDate()} ${NOMBRES_MES[dia.getMonth()]}`;
  const sesiones = datos?.foco ?? 0;
  if (sesiones === 0) return `${nombre}: sin concentración`;
  const minutos = formatearMinutos(datos.minutosFoco ?? 0);
  return `${nombre}: ${minutos} de concentración (${sesiones} ${sesiones === 1 ? "sesión" : "sesiones"})`;
}

// Sección "Constancia": la racha de días seguidos estudiando y un mapa de calor del último año.
// Cada cuadro es un día, más amarillo cuantos más minutos de concentración.
// Props:
// - historial: sesiones y minutos de concentración de cada día ({ "2026-11-03": { foco, minutosFoco, ... } })
export default function Constancia({ historial }) {
  const hoy = fechaDeHoy();
  // Día cuyo dato se muestra debajo del mapa (al principio, hoy)
  const [elegido, setElegido] = useState(hoy);
  const marco = useRef(null);

  // Al abrir, el mapa se desplaza hasta el final para que se vea la semana actual
  useEffect(() => {
    marco.current.scrollLeft = marco.current.scrollWidth;
  }, []);

  const { actual, mejor } = calcularRachas(historial);

  // El mapa empieza en el lunes de hace 52 semanas y acaba en la semana actual
  const diaDeLaSemana = (leerFecha(hoy).getDay() + 6) % 7; // 0 = lunes, 6 = domingo
  const inicio = sumarDias(hoy, -diaDeLaSemana - 7 * (SEMANAS_MAPA - 1));

  const cuadros = [];
  const meses = [];
  for (let semana = 0; semana < SEMANAS_MAPA; semana++) {
    for (let fila = 0; fila < 7; fila++) {
      const fecha = sumarDias(inicio, semana * 7 + fila);
      // Encima de la semana en la que empieza un mes, su nombre
      if (leerFecha(fecha).getDate() === 1) {
        meses.push({ semana, nombre: NOMBRES_MES[leerFecha(fecha).getMonth()] });
      }
      const nivel = nivelDeMinutos(historial[fecha]?.minutosFoco ?? 0);
      cuadros.push({ fecha, semana, fila, nivel });
    }
  }

  // Con el teclado: las flechas mueven el día elegido (izquierda/derecha = una semana)
  function moverConTeclado(evento) {
    const pasos = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    if (!(evento.key in pasos)) return;
    evento.preventDefault();
    const nuevo = sumarDias(elegido, pasos[evento.key]);
    if (nuevo < inicio || nuevo > hoy) return; // no se sale del mapa ni pasa de hoy
    setElegido(nuevo);
    marco.current.querySelector(`[data-fecha="${nuevo}"]`).scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  return (
    <section className="constancia">
      <div className="constancia-cabecera">
        <h2 className="titulo">Constancia</h2>
        <p className="racha">
          Racha: <strong>{actual}</strong> {actual === 1 ? "día" : "días"} · Mejor: <strong>{mejor}</strong>{" "}
          {mejor === 1 ? "día" : "días"}
        </p>
      </div>

      {/* El marco se desplaza de lado si el año no cabe. Se puede enfocar y recorrer con las flechas */}
      <div
        ref={marco}
        className="mapa-marco"
        tabIndex={0}
        role="group"
        aria-label="Mapa de constancia del último año. Usa las flechas para cambiar de día."
        onKeyDown={moverConTeclado}
      >
        <div className="mapa" aria-hidden="true">
          {meses.map((mes) => (
            <span key={`${mes.semana}-${mes.nombre}`} className="mapa-mes" style={{ gridColumn: mes.semana + 2 }}>
              {mes.nombre}
            </span>
          ))}

          {LETRAS_DIA.map((letra, fila) => (
            <span key={fila} className="mapa-dia-semana" style={{ gridRow: fila + 2 }}>
              {letra}
            </span>
          ))}

          {cuadros.map((cuadro) => (
            <span
              key={cuadro.fecha}
              data-fecha={cuadro.fecha}
              className={[
                "dia",
                `nivel-${cuadro.nivel}`,
                cuadro.fecha === hoy ? "hoy" : "",
                cuadro.fecha === elegido ? "elegido" : "",
                cuadro.fecha > hoy ? "futuro" : "",
              ].join(" ")}
              style={{ gridColumn: cuadro.semana + 2, gridRow: cuadro.fila + 2 }}
              onMouseEnter={() => cuadro.fecha <= hoy && setElegido(cuadro.fecha)}
              onClick={() => cuadro.fecha <= hoy && setElegido(cuadro.fecha)}
            ></span>
          ))}
        </div>
      </div>

      <div className="constancia-pie">
        {/* aria-live: el lector de pantalla lee el dato cada vez que cambia el día elegido */}
        <p className="mapa-dato" aria-live="polite">
          {describirDia(elegido, historial[elegido])}
        </p>
        <p className="leyenda" aria-hidden="true">
          Menos
          {[0, 1, 2, 3, 4].map((nivel) => (
            <span key={nivel} className={`dia nivel-${nivel}`}></span>
          ))}
          Más
        </p>
      </div>
    </section>
  );
}
