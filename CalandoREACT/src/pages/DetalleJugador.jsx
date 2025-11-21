import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import placeholderfoto from "../assets/placeholderfoto.jpg";
import ModalEditarEstadisticas from "../components/modals/ModalEditarEstadisticas";
import { obtenerJugadorPorId, eliminarJugador } from "../../services/jugadorService";
import { obtenerHistorialJugador, editarEstadisticaPartido } from "../../services/estadisticaService";
import BannerLiga from "../components/UI/BannerLiga";
import { obtenerLigaPorId } from "../../services/ligaService";
import { obtenerEquiposPorLiga } from "../../services/equipoService";
import { obtenerEquipoPorId } from "../../services/equipoService";

export default function DetalleJugador() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jugador, setJugador] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [statSeleccionada, setStatSeleccionada] = useState(null);
  const [liga, setLiga] = useState(null);
  const [equiposLiga, setEquiposLiga] = useState([]);

  // Cargar datos del jugador + historial de partidos
  useEffect(() => {
    async function cargarDatos() {
      try {
        const dataJugador = await obtenerJugadorPorId(id);
        setJugador(dataJugador);

        const dataHistorial = await obtenerHistorialJugador(id);
        setHistorial(dataHistorial);
        if (dataJugador?.equipoId) {
        const equipoData = await obtenerEquipoPorId(dataJugador.equipoId);

        if (equipoData?.ligaId) {
          const ligaData = await oxxbtenerLigaPorId(equipoData.ligaId);
          setLiga(ligaData);

          const equiposData = await obtenerEquiposPorLiga(equipoData.ligaId);
          setEquiposLiga(equiposData);
        }
      }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }

    cargarDatos();
  }, [id]);

  if (!jugador)
    return <p className="text-center mt-8">Cargando jugador...</p>;

  const foto = jugador.foto ? `/uploads/${jugador.foto}` : placeholderfoto;

  function abrirModal(stat) {
    setStatSeleccionada(stat);
    setModalAbierto(true);
  }

  // --- CALCULAR RESUMEN AUTOMÁTICO ---
  function calcularResumen(historial) {
    const resumen = {
      H: 0,
      HR: 0,
      H2: 0,
      H3: 0,
      BB: 0,
      BG: 0,
      TL: 0,
      S: 0,
      AVG: "0.000",
      OBP: "0.000",
      SLG: "0.000",
      OPS: "0.000",
    };

    historial.forEach((s) => {
      resumen.H += s.H;
      resumen.HR += s.HR;
      resumen.H2 += s.H2;
      resumen.H3 += s.H3;
      resumen.BB += s.BB;
      resumen.BG += s.BG;
      resumen.TL += s.turnosLegales;
      resumen.S += s.S;
    });

    const TB =
      resumen.H + resumen.H2 + resumen.H3 * 2 + resumen.HR * 3;

    const AB = resumen.TL;

    resumen.AVG = AB > 0 ? (resumen.H / AB).toFixed(3) : "0.000";
    resumen.OBP =
      AB + resumen.BB > 0
        ? ((resumen.H + resumen.BB) / (AB + resumen.BB)).toFixed(3)
        : "0.000";
    resumen.SLG = AB > 0 ? (TB / AB).toFixed(3) : "0.000";
    resumen.OPS = (
      parseFloat(resumen.OBP) + parseFloat(resumen.SLG)
    ).toFixed(3);

    return resumen;
  }

  const resumen = calcularResumen(historial);

  return (
    <>
    <BannerLiga liga={liga} equipos={equiposLiga} />
      <div className="max-w-xl mx-auto mt-10 bg-white ">
        <h1 className="text-3xl font-bold mb-6 font-race text-center">
          Detalle  del  Jugador
        </h1>

        {/* INFORMACIÓN PERSONAL */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={foto}
            alt={jugador.nombre}
            className="w-32 h-32 object-cover rounded-full shadow mb-4"
          />

          <p>
            <strong>Nombre:</strong> {jugador.nombre}
          </p>
          <p>
            <strong>Apellido Paterno:</strong>{" "}
            {jugador.apellidoPaterno}
          </p>
          <p>
            <strong>Apellido Materno:</strong>{" "}
            {jugador.apellidoMaterno}
          </p>
          <p>
            <strong>Fecha de Nacimiento:</strong>{" "}
            {new Date(
              jugador.fechaNacimiento
            ).toLocaleDateString("es-MX")}
          </p>
          <p>
            <strong>Número:</strong> {jugador.numero}
          </p>
          <p>
            <strong>Posición:</strong> {jugador.posicion}
          </p>
        </div>

        {/* BOTONES */}
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

          <button
            className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            onClick={async () => {
              const confirmar = window.confirm(
                "¿Seguro que deseas eliminar este jugador?"
              );
              if (!confirmar) return;

              await eliminarJugador(id);
              navigate(-1);
            }}
          >
            Eliminar
          </button>
        </div>

        {/* HISTORIAL POR PARTIDO */}
        <h2 className="text-2xl font-bold text-center mt-10 font-race">
          Historial por Partido
        </h2>

        <table className="w-full mt-4 border-collapse text-center">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2">Partido</th>
              <th className="p-2">Fecha</th>
              <th className="p-2">H</th>
              <th className="p-2">HR</th>
              <th className="p-2">2B</th>
              <th className="p-2">3B</th>
              <th className="p-2">BB</th>
              <th className="p-2">BG</th>
              <th className="p-2">TL</th>
              <th className="p-2">S</th>
              <th className="p-2">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {historial.length > 0 ? (
              historial.map((stat) => (
                <tr key={stat.id} className="border">
                  <td className="p-2 font-semibold">
                    {stat.partido.equipoNombre1} vs{" "}
                    {stat.partido.equipoNombre2}
                  </td>
                  <td className="p-2">
                    {new Date(
                      stat.partido.fecha
                    ).toLocaleDateString()}
                  </td>
                  <td className="p-2">{stat.H}</td>
                  <td className="p-2">{stat.HR}</td>
                  <td className="p-2">{stat.H2}</td>
                  <td className="p-2">{stat.H3}</td>
                  <td className="p-2">{stat.BB}</td>
                  <td className="p-2">{stat.BG}</td>
                  <td className="p-2">{stat.turnosLegales}</td>
                  <td className="p-2">{stat.S}</td>

                  <td className="p-2">
                    <button
                      onClick={() => abrirModal(stat)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 px-4 rounded"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="11"
                  className="py-4 text-gray-500"
                >
                  No hay historial...
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* --- RESUMEN DE TEMPORADA --- */}
        <h2 className="text-2xl font-bold text-center mt-10 font-race">
          Resumen de Temporada
        </h2>

        <table className="w-full mt-4 border-collapse text-center bg-gray-100 rounded-lg shadow">
          <thead className="bg-blue-900 text-white text-sm">
            <tr>
              <th className="p-2">H</th>
              <th className="p-2">HR</th>
              <th className="p-2">2B</th>
              <th className="p-2">3B</th>
              <th className="p-2">BB</th>
              <th className="p-2">BG</th>
              <th className="p-2">TL</th>
              <th className="p-2">S</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="p-2">{resumen.H}</td>
              <td className="p-2">{resumen.HR}</td>
              <td className="p-2">{resumen.H2}</td>
              <td className="p-2">{resumen.H3}</td>
              <td className="p-2">{resumen.BB}</td>
              <td className="p-2">{resumen.BG}</td>
              <td className="p-2">{resumen.TL}</td>
              <td className="p-2">{resumen.S}</td>
            </tr>
          </tbody>
        </table>

        {/* ESTADÍSTICAS AVANZADAS */}
        <h3 className="text-xl font-bold text-center mt-6 font-race">
          Estadísticas Avanzadas
        </h3>

        <div className="grid grid-cols-2 gap-4 mt-4 text-center mb-12">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold text-gray-700">AVG</p>
            <p className="text-xl">{resumen.AVG}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold text-gray-700">OBP</p>
            <p className="text-xl">{resumen.OBP}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold text-gray-700">SLG</p>
            <p className="text-xl">{resumen.SLG}</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <p className="font-bold text-gray-700">OPS</p>
            <p className="text-xl">{resumen.OPS}</p>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <ModalEditarEstadisticas
        abierta={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        stat={statSeleccionada}
        jugadorId={jugador.id}
        editarEstadisticaPartido={editarEstadisticaPartido}
        obtenerHistorialJugador={obtenerHistorialJugador}
        setHistorial={setHistorial}
      />
    </>
  );
}
