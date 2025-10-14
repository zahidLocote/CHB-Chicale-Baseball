import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderfoto from "../assets/placeholderfoto.jpg";
import { obtenerJugadorPorId } from "../../services/jugadorService";
import { eliminarJugador } from "../../services/jugadorService";
export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jugador, setJugador] = useState(null);

  useEffect(() => {
    obtenerJugadorPorId(id)
      .then(data => setJugador(data))
      .catch(error => {
        console.error("Error al obtener jugador:", error);
        setJugador(null);
      });
  }, [id]);

  if (!jugador) {
    return <div className="text-center mt-10 text-lg">Cargando información del jugador...</div>;
  }

  const foto = jugador.foto ? `/uploads/${jugador.foto}` : placeholderfoto;

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Detalle del Jugador</h1>

      <div className="flex flex-col items-center">
        <img
          src={foto}
          alt={jugador.nombre}
          className="w-40 h-40 object-cover rounded-full mb-4 shadow"
        />
        <h2 className="text-2xl font-semibold">
          {jugador.nombre} {jugador.apellidoPaterno}{" "}
          {jugador.apellidoMaterno || "N/A"}
        </h2>
        <p className="text-gray-600 mt-2">
          <strong>Posición:</strong> {jugador.posicion}
        </p>
        <p className="text-gray-600">
          <strong>Número:</strong> {jugador.numero}
        </p>
        <p className="text-gray-600">
          <strong>Fecha de nacimiento:</strong>{" "}
          {new Date(jugador.fechaNacimiento).toLocaleDateString("es-MX")}
        </p>
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <button
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
          onClick={() => alert("Función de editar jugador próximamente")}
        >
          Editar
        </button>

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

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500"
        >
          Volver
        </button>
      </div>
    </div>
  );
}
