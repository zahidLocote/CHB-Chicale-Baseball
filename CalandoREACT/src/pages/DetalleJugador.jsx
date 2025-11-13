import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderfoto from "../assets/placeholderfoto.jpg";
import { obtenerJugadorPorId, eliminarJugador } from "../../services/jugadorService";
import { obtenerEstadisticasTotales } from "../../services/estadisticaService";

export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const dataJugador = await obtenerJugadorPorId(id);
        setJugador(dataJugador);

        // 🔹 Obtiene las estadísticas totales del jugador
        const dataEstadisticas = await obtenerEstadisticasTotales(id);
        setEstadisticas(dataEstadisticas);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    cargarDatos();
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

        {
          jugador.equipoId && (
            <button
              onClick={() => navigate(`/equipos/${jugador.equipoId}`)}
              className="bg-gray-300 text-gray-700 font-semibold px-4 py-2 rounded hover:bg-gray-400"
            >
              Regresar
            </button>
          )
        }

        <button
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          onClick={async () => {
            const confirmar = window.confirm("¿Seguro que deseas eliminar este jugador?");
            if (!confirmar) return;

            try {
              await eliminarJugador(id);
              alert("Jugador eliminado correctamente");
              navigate(-1); // Regresa a la pantalla anterior (detalle del equipo)
            } catch (error) {
              alert(error.message || "Error al eliminar jugador");
              console.error(error);
            }
          }}
        >
          Eliminar
        </button>
      </div>
      <h1 className="text-center font-bold text-2xl mt-5">Historial</h1>
      <table className=" text-center min-w-full  bg-gray-100 border rounded-lg overflow-hidden">
        <thead className="bg-blue-900 text-white">
            <tr>
              <th className="py-3 px-4 text-left">H</th>
              <th className="py-3 px-4 text-left">HR</th>
              <th className="py-3 px-4 text-left">H2</th>
              <th className="py-3 px-4 text-left">H3</th>
              <th className="py-3 px-4 text-left">BB</th>
              <th className="py-3 px-4 text-left">BG</th>
              <th className="py-3 px-4 text-left">TL</th>
              <th className="py-3 px-4 text-left">S</th>
            </tr>
          </thead>
          <tbody>
          {estadisticas ? (
            <tr>
              <td className="py-2">{estadisticas.H}</td>
              <td className="py-2">{estadisticas.HR}</td>
              <td className="py-2">{estadisticas.H2}</td>
              <td className="py-2">{estadisticas.H3}</td>
              <td className="py-2">{estadisticas.BB}</td>
              <td className="py-2">{estadisticas.BG}</td>
              <td className="py-2">{estadisticas.turnosLegales}</td>
              <td className="py-2">{estadisticas.S}</td>
            </tr>
          ) : (
            <tr>
              <td colSpan="8" className="py-4 text-gray-500">
                No hay estadisticas...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
