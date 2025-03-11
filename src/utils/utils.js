/**
 *
 * @param {string} hours hours to convert
 * @returns {number} result
 */
export function convertHoursToHHMM(hours) {
  const hh = Math.floor(hours); // Horas enteras
  const mm = Math.round((hours - hh) * 60); // Minutos redondeados
  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}`;
}

/**
 *
 * @param {string} time time to convert
 * @returns {number} result
 */
export function hhmmToHours(time) {
  const [hh, mm] = time.split(":").map(Number); // Separar y convertir a números
  return hh + mm / 60; // Convertir minutos a fracción de hora
}

/**
 *
 * @param {string[]} times array of times
 * @returns {number} result
 */
export function sumTimes(times) {
  let totalMinutes = 0;

  times.forEach((time) => {
    const [hh, mm] = time.split(":").map(Number);
    totalMinutes += hh * 60 + mm; // Convertimos todo a minutos y sumamos
  });

  const totalHours = Math.floor(totalMinutes / 60); // Convertimos minutos a horas
  const remainingMinutes = totalMinutes % 60; // Minutos restantes

  // Formateamos para que siempre tenga dos dígitos
  return `${totalHours.toString().padStart(2, "0")}:${remainingMinutes
    .toString()
    .padStart(2, "0")}`;
}
