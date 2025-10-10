import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerJugadorPorId } from '../../services/jugadorService';
import placeholderfoto from '../assets/placeholderfoto.jpg';

export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);

  useEffect(() => {
    obtenerJugadorPorId(id)
      .then(data => setJugador(data))
      .catch(error => console.error('Error al cargar jugador:', error));
  }, [id]);

  if (!jugador) return <p className="text-center mt-8">Cargando jugador...</p>;

  const foto = jugador.foto ? `/uploads/${jugador.foto}` : placeholderfoto;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Detalle del Jugador</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={foto}
          alt={jugador.nombre}
          className="w-32 h-32 object-cover rounded-full shadow mb-4"
        />
        <p><strong>Nombre:</strong> {jugador.nombre}</p>
        <p><strong>Apellido Paterno:</strong> {jugador.apellidoPaterno}</p>
        <p><strong>Apellido Materno:</strong> {jugador.apellidoMaterno}</p>
        <p><strong>Fecha de Nacimiento:</strong> {new Date(jugador.fechaNacimiento).toLocaleDateString('es-MX')}</p>
        <p><strong>Número:</strong> {jugador.numero}</p>
        <p><strong>Posición:</strong> {jugador.posicion}</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => navigate(`/jugador/editar/${jugador.id}`)}
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
        >
          Editar
        </button>

        {jugador.equipoId && (
          <button
            onClick={() => navigate(`/equipos/${jugador.equipoId}`)}
            className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-400"
          >
            Regresar
          </button>
        )}
      </div>
    </div>
  );
}
