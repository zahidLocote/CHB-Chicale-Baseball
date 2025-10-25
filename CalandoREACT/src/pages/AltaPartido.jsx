import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerEquiposPorLiga } from '../../services/equipoService';

export default function AltaPartido (){
    const { state } = useLocation();
    const navigate = useNavigate()
    const liga = state?.liga;

    const [equipos, setEquipos] = useState([]);

    const [equipoId1, setEquipoId1] = useState('');
    const [equipoId2, setEquipoId2] = useState('');
    const [equipoNombre1, setEquipoNombre1] = useState('');
    const [equipoNombre2, setEquipoNombre2] = useState('');
    const [fechaPartido, setFechaPartido] = useState('');
    const [direccionPartido, setDireccionPartido] = useState('');
    const [horaPartido, setHoraPartido] = useState('');



    useEffect(() => {
  if (liga?.id) {
    obtenerEquiposPorLiga(liga.id)
      .then((data) => {
        setEquipos(data);
      })
      .catch(console.error);
  }
}, [liga]);
    
const handleSubmit = () => {
    const datos = {
        equipoId1,
        equipoId2,
        equipoNombre1,
        equipoNombre2,
        fechaPartido,
        direccionPartido,
        horaPartido
    };
    console.log('Datos del partido:', datos);
  };

    return(
        <>
            <h1 className="mt-10 mb-20 text-3xl font-bold text-center">
                Registro de Partido: <u>{liga?.nombreLiga}</u>
            </h1>
           

            <div className="flex justify-center mt-6 gap-x-40 mb-20">
                <select name="equipo1" value={equipoId1} onChange={(e) => {
                    const id = e.target.value;
                    setEquipoId1(id);
                    const equipo = equipos.find(eq => eq.id === id);
                    setEquipoNombre1(equipo?.nombre || '');}}
                     className="font-bold w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">- Elige un equipo -</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
                <h1 className='font-bold text-3xl'>VS</h1>
                <select name="equipo2" value={equipoId2} onChange={(e) => {
                    const id = e.target.value;
                    setEquipoId2(id);
                    const equipo = equipos.find(eq => eq.id === id);
                    setEquipoNombre2(equipo?.nombre || '');}}
                    className="font-bold block w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">- Elige un equipo -</option>
                    {equipos.map((equipo) => (
                        <option key={equipo.id} value={equipo.id}>
                            {equipo.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <input type="date" name="fechaPartido" value={fechaPartido} onChange={(e) => setFechaPartido(e.target.value)} className=" text-center w-100 border py-2 px-1 rounded  text-xl"/>
            </div>

            <div className='flex justify-center gap-x-40'>
                <input type="text" name="direccionPartido" value={direccionPartido} onChange={(e) => setDireccionPartido(e.target.value)} placeholder='Direccion del partido' className="border p-2 w-100 rounded-sm"/>
                <input type="time" name="horaPartido"value={horaPartido} onChange={(e) => setHoraPartido(e.target.value)} className="w-50 border py-2 px-1 rounded text-m" />
            </div>

            <div className='flex justify-center mt-20 gap-x-70'>
                <button onClick={() => navigate(-1)} className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-400 cursor-pointer">
                    Cancelar
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-400 cursor-pointer">
                    Aceptar
                </button>
            </div>

        </>
    )
}