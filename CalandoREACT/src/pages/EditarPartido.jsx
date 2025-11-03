import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { obtenerEquiposPorLiga } from '../../services/equipoService';
import { editarPartido, obtenerPartidoPorId } from '../../services/partidoService';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';

export default function EditarPartido() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showAlerta, setShowAlerta] = useState(false);
  const [erroresFormulario, setErroresFormulario] = useState({});
  const [tipoAlerta, setTipoAlerta] = useState('error');
  const [mensajeAlerta, setMensajeAlerta] = useState('');

  const [equipos, setEquipos] = useState([]);
  const [ligaId, setLigaId] = useState(null);

  const [equipoId1, setEquipoId1] = useState('');
  const [equipoId2, setEquipoId2] = useState('');
  const [equipoNombre1, setEquipoNombre1] = useState('');
  const [equipoNombre2, setEquipoNombre2] = useState('');
  const [fechaPartido, setFechaPartido] = useState('');
  const [direccionPartido, setDireccionPartido] = useState('');
  const [horaPartido, setHoraPartido] = useState('');
  const [estadoPartido, setEstadoPartido] = useState('');

  useEffect(() => {
    obtenerPartidoPorId(id)
      .then(data => {
        setEquipoId1(data.equipoId1);
        setEquipoId2(data.equipoId2);
        setEquipoNombre1(data.equipoNombre1 || '');
        setEquipoNombre2(data.equipoNombre2 || '');
        setFechaPartido(data.fecha?.slice(0, 10));
        setDireccionPartido(data.lugar);
        setHoraPartido(data.hora);
        setEstadoPartido(data.estado || '');
        setLigaId(data.ligaId);
      })
      .catch(err => {
        console.error('Error al cargar partido:', err);
        alert('No se pudo cargar el partido');
        navigate('/');
      });
  }, [id, navigate]);

  useEffect(() => {
    if (ligaId) {
      obtenerEquiposPorLiga(ligaId)
        .then(data => setEquipos(data))
        .catch(console.error);
    }
  }, [ligaId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errores = {};
    const hoy = new Date();
    const fechaIngresada = new Date(fechaPartido);
    const horaActual = hoy.toTimeString().slice(0, 5);

    if (!equipoId1) errores.equipoId1 = 'Selecciona el primer equipo';
    if (!equipoId2) errores.equipoId2 = 'Selecciona el segundo equipo';
    if (equipoId1 && equipoId2 && equipoId1 === equipoId2)
      errores.equiposIguales = 'Los equipos rivales no pueden ser iguales';
    if (!fechaPartido) {
      errores.fechaPartido = 'Selecciona la fecha del partido';
    } else if (fechaIngresada.setHours(0, 0, 0, 0) < hoy.setHours(0, 0, 0, 0)) {
      errores.fechaInvalida = 'La fecha no puede ser anterior a hoy';
    }
    if (!direccionPartido) errores.direccionPartido = 'Ingresa la dirección del partido';
    if (!horaPartido) {
      errores.horaPartido = 'Selecciona la hora del partido';
    } else if (fechaIngresada.setHours(0, 0, 0, 0) === hoy.setHours(0, 0, 0, 0) && horaPartido < horaActual) {
      errores.horaInvalida = 'La hora no puede ser anterior a la actual';
    }
    if (!estadoPartido) errores.estadoPartido = 'Selecciona el estado del partido';

    if (Object.keys(errores).length > 0) {
      setErroresFormulario(errores);
      setShowAlerta(true);
      return;
    }

    const datos = {
      equipoId1: equipoId1,
      equipoId2: equipoId2,
      equipoNombre1,
      equipoNombre2,
      fecha: new Date(fechaPartido),
      lugar: direccionPartido,
      hora: horaPartido,
      estado: estadoPartido,
    };

    try {
      const response = await editarPartido(id, datos);
      console.log('Partido actualizado:', response);

      setTipoAlerta('success');
      setMensajeAlerta('Partido actualizado correctamente');
      setErroresFormulario({});
      setShowAlerta(true);

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Error al editar partido:', error);
      setTipoAlerta('error');
      setErroresFormulario({ server: '❌ Hubo un error al actualizar el partido' });
      setShowAlerta(true);
    }
  };

  return (
    <>
      <h1 className="mt-10 mb-20 text-3xl font-bold text-center">
        Editar Partido
      </h1>

      <div className="flex justify-center mt-6 gap-x-40 mb-20">
        <select name="equipo1" value={equipoId1} onChange={(e) => {
          const id = Number(e.target.value);
          setEquipoId1(id);
          const equipo = equipos.find(eq => eq.id === id);
          setEquipoNombre1(equipo?.nombre || '');
          console.log(equipo.nombre);
        }} className="font-bold w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
          <option value="">- Elige un equipo -</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
          ))}
        </select>
        <h1 className='font-bold text-3xl'>VS</h1>
        <select name="equipo2" value={equipoId2} onChange={(e) => {
          const id = Number(e.target.value);
          setEquipoId2(id);
          const equipo = equipos.find(eq => eq.id === id);
          setEquipoNombre2(equipo?.nombre || '');
        }} className="font-bold block w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
          <option value="">- Elige un equipo -</option>
          {equipos.map((equipo) => (
            <option key={equipo.id} value={equipo.id}>{equipo.nombre}</option>
          ))}
        </select>
      </div>

      <div className='flex justify-center mt-10 mb-10'>
        <input type="date" name="fechaPartido" value={fechaPartido} onChange={(e) => setFechaPartido(e.target.value)} className="text-center w-100 border py-2 px-1 rounded text-xl" />
      </div>

      <div className='flex justify-center gap-x-40'>
        <input type="text" name="direccionPartido" value={direccionPartido} onChange={(e) => setDireccionPartido(e.target.value)} placeholder='Dirección del partido' className="border p-2 w-100 rounded-sm" />
        <input type="time" name="horaPartido" value={horaPartido} onChange={(e) => setHoraPartido(e.target.value)} className="w-50 border py-2 px-1 rounded text-m" />
      </div>

      <div className='flex justify-center mt-10 mb-10'>
        <select name="estadoPartido" value={estadoPartido} onChange={(e) => setEstadoPartido(e.target.value)} className="border p-2 w-100 rounded-sm">
          <option value="">- Estado del partido -</option>
          <option value="PROGRAMADO">PROGRAMADO</option>
          <option value="ENVIVO">ENVIVO</option>
          <option value="FINALIZADO">FINALIZADO</option>
        </select>
      </div>

      <div className='flex justify-center mt-20 gap-x-70'>
        <button onClick={() => navigate('/')} className="bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-400 cursor-pointer">
          Cancelar
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white font-bold px-4 py-2 rounded hover:bg-green-500 cursor-pointer">
          Guardar Cambios
        </button>
      </div>

      {showAlerta && (
                <AlertaPopUp
          show={showAlerta}
          onClose={() => setShowAlerta(false)}
          title={tipoAlerta === 'success' ? 'Éxito' : 'Error en el formulario'}
          message={mensajeAlerta}
          type={tipoAlerta}
          errors={erroresFormulario}
        />
      )}
    </>
  );
}
