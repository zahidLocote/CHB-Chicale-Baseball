function esFechaYHoraValida(fecha, hora) {
  const hoy = new Date();
  const fechaIngresada = new Date(fecha);
  const horaActual = hoy.toTimeString().slice(0, 5);

  const soloFechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const soloFechaIngresada = new Date(fechaIngresada.getFullYear(), fechaIngresada.getMonth(), fechaIngresada.getDate());

  if (soloFechaIngresada < soloFechaHoy) return 'La fecha no puede ser anterior a hoy';
  if (soloFechaIngresada.getTime() === soloFechaHoy.getTime() && hora <= horaActual)
    return 'La hora debe ser posterior a la actual';
  return null;
}
