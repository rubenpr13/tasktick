// ----- Alarma: una campanita al llegar a 00:00 -----
// El sonido lo genera el navegador (Web Audio), sin archivos de audio.

// "Altavoz" del navegador. Se crea una sola vez y se reutiliza
let contextoAudio = null;

// Se llama al pulsar Iniciar. Los navegadores (sobre todo el iPhone) solo dejan
// sonar audio si antes el usuario ha pulsado algo, así que se prepara en ese momento.
export function prepararSonido() {
  try {
    if (contextoAudio === null) contextoAudio = new AudioContext();
    if (contextoAudio.state === "suspended") contextoAudio.resume();
  } catch {
    // El navegador no tiene Web Audio: la app funciona igual, solo que sin sonido
  }
}

// Suena un "ding" que se apaga poco a poco durante unos 2 segundos.
// Una campana suena con varias notas a la vez (una grave y otras más agudas y flojas)
export function sonarCampanita() {
  if (contextoAudio === null) return;

  const ahora = contextoAudio.currentTime;
  const duracion = 2; // segundos
  const notas = [
    { frecuencia: 660, volumen: 0.3 },
    { frecuencia: 1822, volumen: 0.1 },
    { frecuencia: 3564, volumen: 0.04 },
  ];

  for (const nota of notas) {
    const oscilador = contextoAudio.createOscillator(); // genera la nota
    const ganancia = contextoAudio.createGain(); // controla el volumen
    oscilador.type = "sine";
    oscilador.frequency.value = nota.frecuencia;

    // Sube el volumen en un instante (sin "clic") y luego se apaga poco a poco
    ganancia.gain.setValueAtTime(0, ahora);
    ganancia.gain.linearRampToValueAtTime(nota.volumen, ahora + 0.01);
    ganancia.gain.exponentialRampToValueAtTime(0.0001, ahora + duracion);

    oscilador.connect(ganancia);
    ganancia.connect(contextoAudio.destination);
    oscilador.start(ahora);
    oscilador.stop(ahora + duracion);
  }
}
