function timeAgo(date) {
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInMinutes < 59) {
    return `hace ${diffInMinutes} ${
      diffInMinutes === 1 ? "minuto" : "minutos"
    }`;
  } else if (diffInHours < 23) {
    return `hace ${diffInHours} ${diffInHours === 1 ? "hora" : "horas"}`;
  } else if (diffInHours < 47) {
    return `ayer`;
  } else {
    // Formatear la fecha como DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `fecha de ocurrencia: ${day}/${month}/${year}`;
  }
}

// Ejemplos de uso
console.log(timeAgo(new Date())); // ahora mismo
console.log;
