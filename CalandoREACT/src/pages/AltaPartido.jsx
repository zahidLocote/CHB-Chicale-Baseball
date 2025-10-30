import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { obtenerEquiposPorLiga } from '../../services/equipoService';
import { registrarPartido } from '../../services/partidoService';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';


export default function AltaPartido() {
    const { state } = useLocation();
    const navigate = useNavigate()
    const liga = state?.liga;

    const [showAlerta, setShowAlerta] = useState(false);
    const [erroresFormulario, setErroresFormulario] = useState({});
    const [tipoAlerta, setTipoAlerta] = useState('error'); // 'error' | 'success'
    const [mensajeAlerta, setMensajeAlerta] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errores = {};
        const hoy = new Date();

        //Interpreta la fecha del input como local (no UTC)
        let fechaIngresada;
        if (fechaPartido) {
            const [year, month, day] = fechaPartido.split('-').map(Number);
            fechaIngresada = new Date(year, month - 1, day);
        }

        const horaActual = hoy.toTimeString().slice(0, 5); // HH:mm

        // Copias para comparar solo las fechas
        const soloFechaHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
        const soloFechaIngresada = new Date(
            fechaIngresada?.getFullYear(),
            fechaIngresada?.getMonth(),
            fechaIngresada?.getDate()
        );

        // Validaciones
        if (!fechaPartido) {
            errores.fechaPartido = 'Selecciona la fecha del partido';
        } else if (soloFechaIngresada < soloFechaHoy) {
            errores.fechaInvalida = 'La fecha no puede ser anterior a hoy';
        }

        if (!horaPartido) {
            errores.horaPartido = 'Selecciona la hora del partido';
        } else if (
            soloFechaIngresada.getTime() === soloFechaHoy.getTime() &&
            horaPartido <= horaActual
        ) {
            errores.horaInvalida = 'La hora debe ser posterior a la actual';
        }

        // Si hay errores, muestra alerta
        if (Object.keys(errores).length > 0) {
            setErroresFormulario(errores);
            setShowAlerta(true);
            return;
        }

        // 📝 Datos listos para enviar
        const [year, month, day] = fechaPartido.split('-').map(Number);
        const [hh, mm] = horaPartido.split(':').map(Number);
        const fechaLocal = new Date(year, month - 1, day, hh, mm);
        const datos = {
            equipoId1,
            equipoId2,
            equipoNombre1,
            equipoNombre2,
            fecha: fechaLocal,
            lugar: direccionPartido,
            hora: horaPartido,
            ligaId: liga?.id,
        };

        try {
            const response = await registrarPartido(datos);
            console.log('✅ Partido registrado exitosamente:', response);

            setTipoAlerta('success');
            setMensajeAlerta('Partido registrado correctamente');
            setErroresFormulario({});
            setShowAlerta(true);

            // Volver atrás después de 2 s
            setTimeout(() => {
                navigate(-1);
            }, 2000);
        } catch (error) {
            console.error('❌ Error al registrar partido:', error);
            setTipoAlerta('error');
            setErroresFormulario({ server: 'Hubo un error al registrar el partido' });
            setShowAlerta(true);
        }
    };


    return (
        <>
            <h1 className="mt-10 mb-20 text-3xl font-bold text-center">
                Registro de Partido: <u>{liga?.nombreLiga}</u>
            </h1>

            <div className="flex justify-center mt-6 gap-x-40 mb-20">
                <select name="equipo1" value={equipoId1} onChange={(e) => {
                    const id = Number(e.target.value)
                    setEquipoId1(id);
                    const equipo = equipos.find(eq => eq.id === id);
                    setEquipoNombre1(equipo?.nombre || '');
                }}
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
                    const id = Number(e.target.value)
                    setEquipoId2(id);
                    const equipo = equipos.find(eq => eq.id === id);
                    setEquipoNombre2(equipo?.nombre || '');
                }}
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
                <input type="date" name="fechaPartido" value={fechaPartido} onChange={(e) => setFechaPartido(e.target.value)} className=" text-center w-100 border py-2 px-1 rounded  text-xl" />
            </div>

            <div className='flex justify-center gap-x-40'>
                <input type="text" name="direccionPartido" value={direccionPartido} onChange={(e) => setDireccionPartido(e.target.value)} placeholder='Direccion del partido' className="border p-2 w-100 rounded-sm" />
                <input type="time" name="horaPartido" value={horaPartido} onChange={(e) => setHoraPartido(e.target.value)} className="w-50 border py-2 px-1 rounded text-m" />
            </div>

            <div className='flex justify-center mt-20 gap-x-70'>
                <button onClick={() => navigate(-1)} className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-400 cursor-pointer">
                    Cancelar
                </button>
                <button onClick={handleSubmit} className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-400 cursor-pointer">
                    Aceptar
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
    )
}