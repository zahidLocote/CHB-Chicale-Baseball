import { eliminarPartido } from '../../../services/partidoService';
export default function InfoPartidos({ partido }) {
  if (!partido || partido.length === 0) {
    return (
      <div className="mt-5 w-full border border-gray-400 rounded-4xl p-7 bg-white shadow-xl">
        <p className="text-center text-gray-500">No hay partidos registrados aún.</p>
      </div>
    )
  }
    const handleEliminar = async () => {
    const confirmar = window.confirm('¿Estás seguro de eliminar este partido?');
    if (!confirmar) return;

    try {
      await eliminarPartido(partido.id);
      alert('Partido eliminado correctamente');
      window.location.reload(); // o actualiza el estado si usas useState
    } catch (error) {
      alert('Error al eliminar partido');
      console.error(error);
    }
  };
  return (
    <div className="border border-gray-400 rounded-2xl p-5 bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {partido.equipoNombre1} VS {partido.equipoNombre2}
      </h2>

      <div className="flex justify-center text-2xl font-bold gap-x-40">
        <h1>{partido.score1}</h1>
        <h1>{partido.score2}</h1>
      </div>

      <div className="flex justify-between items-start">
        <div className="text-xl space-y-2">
          <p>
            <strong>Fecha:</strong>{' '}
            {new Date(partido.fecha).toLocaleDateString('es-MX', {
              timeZone: 'America/Tijuana'
            })}
          </p>

          <p><strong>Hora:</strong> {partido.hora}</p>
          <p><strong>Lugar:</strong> {partido.lugar}</p>
          <p><strong>Estado del partido:</strong> {partido.estado}</p>
        </div>

        {/* Botones alineados a la derecha */}
        <div className="flex flex-col gap-2">
          <button className="bg-yellow-300 text-yellow-600 font-bold px-4 py-2 rounded-xl hover:bg-yellow-200">
            Finalizar
          </button>
          <button className="bg-blue-300 text-blue-500 font-bold px-4 py-2 rounded-xl hover:bg-blue-200">
            Editar
          </button>
          <button onClick={handleEliminar} className="bg-red-300 text-red-500 font-bold px-4 py-2 rounded-xl hover:bg-red-200">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )

}