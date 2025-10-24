import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

export default function AltaPartido (){
const { state } = useLocation();
const navigate = useNavigate()
  const liga = state?.liga;

    return(
        <>
            <h1 className="mt-10 mb-20 text-3xl font-bold text-center">
                Registro de Partido: <u>{liga?.nombreLiga}</u>
            </h1>
           

            <div className="flex justify-center mt-6 gap-x-80 mb-20">
                <select id="liga" name="equipo1" className="block w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">-- Elige un equipo --</option>
                    <option value="liga1">Liga 1</option>
                    <option value="liga2">Liga 2</option>
                    <option value="liga3">Liga 3</option>
                </select>

                <select id="liga" name="equipo2" className="block w-50 px-4 py-2 border border-gray-300 rounded-md shadow-sm">
                    <option value="">-- Elige un equipo --</option>
                    <option value="liga1">Liga 1</option>
                    <option value="liga2">Liga 2</option>
                    <option value="liga3">Liga 3</option>
                </select>
            </div>
            <div className='flex justify-center mt-10 mb-10'>
                <input type="date" name="fechaPartido" className=" text-center w-100 border py-2 px-1 rounded  text-xl"/>
            </div>

            <div className='flex justify-center gap-x-40'>
                <input type="text" name="direccionPartido" placeholder='Direccion del partido' className="border p-2 w-100 rounded-sm"/>
                <input type="time" name="horaPartido" className="w-50 border py-2 px-1 rounded text-m" />
            </div>

            <div className='flex justify-center mt-20 gap-x-70'>
                <button onClick={() => navigate(-1)} className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-400 cursor-pointer">
                    Cancelar
                </button>
                <button className="bg-green-500 text-white font-bold px-4 py-2 rounded hover:bg-green-400 cursor-pointer">
                    Aceptar
                </button>
            </div>

        </>
    )
}