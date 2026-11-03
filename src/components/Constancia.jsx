import { useEffect, useRef, useState } from "react";
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

// Texto de un día: "lun 3 nov: 1 h 15 min de concentración (3 sesiones)"
function describirDia(fecha, datos) {
  const dia = leerFecha(fecha);
  const nombre = `${NOMBRES_DIA[dia.getDay()]} ${dia.getDate()} ${NOMBRES_MES[dia.getMonth()]}`;
  const sesiones = datos?.foco ?? 0;
  if (sesiones === 0) return `${nombre}: sin concentración`;
  const minutos = formatearMinutos(datos.minutosFoco ?? 0);
  return `${nombre}: ${minutos} de concentración (${sesiones} ${sesiones === 1 ? "sesión" : "sesiones"})`;
}

// Pone las cifras de un texto en Lexend (clase "cifra"): en Atkinson el 0 sale tachado (Ø)
function conCifras(texto) {
  return texto.split(/(\d+)/).map((trozo, i) =>
    /\d/.test(trozo) ? (
      <span key={i} className="cifra">
        {trozo}
      </span>
    ) : (
      trozo
    )
  );
}

// Sección "Constancia": la racha de días seguidos estudiando y un mapa de calor de un año natural
// (del 1 de enero al 31 de diciembre), con flechas para ver otros años.
// Cada cuadro es un día, más amarillo cuantos más minutos de concentración.
// Al pasar el ratón, tocar un día o moverse con las flechas, su dato sale en una ventanita flotante.
// Props:
// - historial: sesiones y minutos de concentración de cada día ({ "2026-11-03": { foco, minutosFoco, ... } })
export default function Constancia({ historial }) {
  const hoy = fechaDeHoy();
  // Día que muestra la ventanita y dónde está su cuadro: { fecha, x, y, ancho }, o null si no hay ventanita
  const [senalado, setSenalado] = useState(null);
  const mapa = useRef(null);

  const { actual, mejor } = calcularRachas(historial);

  // Año que se ve en el mapa. Se puede ir desde el primer año con datos hasta el actual
  const anioActual = leerFecha(hoy).getFullYear();
  const [anio, setAnio] = useState(anioActual);
  const fechasGuardadas = Object.keys(historial).sort();
  const primerAnio =
    fechasGuardadas.length > 0 ? Math.min(Number(fechasGuardadas[0].slice(0, 4)), anioActual) : anioActual;

  function cambiarAnio(nuevo) {
    setSenalado(null);
    setAnio(nuevo);
  }

  // El mapa va del 1 de enero al 31 de diciembre. Cada columna es una semana de lunes a domingo:
  // la primera empieza el lunes de la semana del 1 de enero (puede ser de diciembre del año anterior)
  const primerDia = `${anio}-01-01`;
  const ultimoDia = `${anio}-12-31`;
  const diaDeLaSemana = (leerFecha(primerDia).getDay() + 6) % 7; // 0 = lunes, 6 = domingo
  const inicio = sumarDias(primerDia, -diaDeLaSemana);
  let semanas = 0; // 53 casi siempre (54 algún año bisiesto)
  while (sumarDias(inicio, semanas * 7) <= ultimoDia) semanas++;

  const cuadros = [];
  const meses = [];
  for (let semana = 0; semana < semanas; semana++) {
    for (let fila = 0; fila < 7; fila++) {
      const fecha = sumarDias(inicio, semana * 7 + fila);
      // Encima de la semana en la que empieza un mes del año, su nombre
      if (fecha >= primerDia && fecha <= ultimoDia && leerFecha(fecha).getDate() === 1) {
        meses.push({ semana, nombre: NOMBRES_MES[leerFecha(fecha).getMonth()] });
      }
      const nivel = nivelDeMinutos(historial[fecha]?.minutosFoco ?? 0);
      cuadros.push({ fecha, semana, fila, nivel });
    }
  }

  // Abre la ventanita encima del cuadro de un día del año (los días que aún no han llegado no tienen)
  function senalar(fecha) {
    if (fecha < primerDia || fecha > ultimoDia || fecha > hoy) return;
    const cuadro = mapa.current.querySelector(`[data-fecha="${fecha}"]`);
    setSenalado({ fecha, x: cuadro.offsetLeft, y: cuadro.offsetTop, ancho: cuadro.offsetWidth });
  }

  // En el móvil, la ventanita se cierra al tocar fuera de un día
  useEffect(() => {
    if (senalado === null) return;
    function cerrarSiFuera(evento) {
      if (!evento.target.closest(".mapa .dia")) setSenalado(null);
    }
    document.addEventListener("pointerdown", cerrarSiFuera);
    return () => document.removeEventListener("pointerdown", cerrarSiFuera);
  }, [senalado]);

  // Día que se señala al entrar con el teclado: hoy, o el 31 de diciembre si se ve un año pasado
  const diaInicialTeclado = hoy <= ultimoDia ? hoy : ultimoDia;

  // Con el teclado: al entrar en el mapa se señala hoy, y las flechas mueven el día (izquierda/derecha = una semana)
  function moverConTeclado(evento) {
    const pasos = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    if (!(evento.key in pasos)) return;
    evento.preventDefault();
    senalar(sumarDias(senalado?.fecha ?? diaInicialTeclado, pasos[evento.key]));
  }

  // La ventanita va centrada sobre el día; cerca de los bordes del mapa se apoya en un lado para no salirse
  let lado = "centro";
  if (senalado !== null) {
    const anchoMapa = mapa.current.offsetWidth;
    if (senalado.x < anchoMapa * 0.2) lado = "izquierda";
    else if (senalado.x > anchoMapa * 0.8) lado = "derecha";
  }

  return (
    // --semanas: número de columnas del mapa (lo usan los estilos del mapa y de la leyenda)
    <section className="constancia" style={{ "--semanas": semanas }}>
      <div className="constancia-cabecera">
        <h2 className="titulo">Constancia</h2>
        <div className="selector-anio">
          <button
            type="button"
            className="selector-anio-flecha"
            aria-label="Año anterior"
            disabled={anio <= primerAnio}
            onClick={() => cambiarAnio(anio - 1)}
          >
            ‹
          </button>
          <span className="selector-anio-numero" aria-live="polite">
            {anio}
          </span>
          <button
            type="button"
            className="selector-anio-flecha"
            aria-label="Año siguiente"
            disabled={anio >= anioActual}
            onClick={() => cambiarAnio(anio + 1)}
          >
            ›
          </button>
        </div>
        <p className="racha">
          Racha: <strong>{actual}</strong> {actual === 1 ? "día" : "días"} · Mejor: <strong>{mejor}</strong>{" "}
          {mejor === 1 ? "día" : "días"}
        </p>
      </div>

      {/* El mapa se puede enfocar con el teclado y recorrer con las flechas */}
      <div
        className="mapa-marco"
        tabIndex={0}
        role="group"
        aria-label={`Mapa de constancia de ${anio}. Usa las flechas para cambiar de día.`}
        onKeyDown={moverConTeclado}
        onFocus={() => senalar(diaInicialTeclado)}
        onBlur={() => setSenalado(null)}
      >
        <div ref={mapa} className="mapa" aria-hidden="true" onMouseLeave={() => setSenalado(null)}>
          {meses.map((mes) => (
            <span
              key={`${mes.semana}-${mes.nombre}`}
              className="mapa-mes"
              // Un mes que empieza en las 2 últimas semanas se alinea al final del mapa, para no salirse por la derecha
              style={
                mes.semana >= semanas - 2
                  ? { gridColumn: `${mes.semana + 1} / -1`, justifySelf: "end" }
                  : { gridColumn: mes.semana + 1 }
              }
            >
              {mes.nombre}
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
                cuadro.fecha === senalado?.fecha ? "senalado" : "",
                cuadro.fecha > hoy ? "futuro" : "",
                cuadro.fecha < primerDia || cuadro.fecha > ultimoDia ? "fuera" : "",
              ].join(" ")}
              style={{ gridColumn: cuadro.semana + 1, gridRow: cuadro.fila + 2 }}
              onMouseEnter={() => senalar(cuadro.fecha)}
              onClick={() => senalar(cuadro.fecha)}
            ></span>
          ))}

          {/* Ventanita flotante con el dato del día, encima de su cuadro */}
          {senalado !== null && (
            <span
              className={`mapa-ventanita ${lado}`}
              style={{
                left: lado === "derecha" ? senalado.x + senalado.ancho : senalado.x + (lado === "centro" ? senalado.ancho / 2 : 0),
                top: senalado.y,
                "--mitad-dia": `${senalado.ancho / 2}px`,
              }}
            >
              {conCifras(describirDia(senalado.fecha, historial[senalado.fecha]))}
            </span>
          )}
        </div>
      </div>

      {/* Para lectores de pantalla: leen el dato cada vez que cambia el día señalado */}
      <p className="solo-lector" aria-live="polite">
        {senalado !== null ? describirDia(senalado.fecha, historial[senalado.fecha]) : ""}
      </p>

      <p className="leyenda" aria-hidden="true">
        Menos
        {[0, 1, 2, 3, 4].map((nivel) => (
          <span key={nivel} className={`dia nivel-${nivel}`}></span>
        ))}
        Más
      </p>
    </section>
  );
}
