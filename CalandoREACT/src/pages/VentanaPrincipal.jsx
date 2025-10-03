import { useEffect, useState } from 'react'
import { Header } from "../components/UI/Header";
import { obtenerEquipos } from '../../services/equipoService';
import AltaLigas from "./AltaLigas";
import TablaEquipos from './TablaEquipos';
function VentanaPrincipal() {

    const [vista, setVista] = useState(null);
    const [equipos, setEquipos] = useState([]);

    useEffect(() => {
        obtenerEquipos()
        .then(data => setEquipos(data))
        .catch(error => console.error(error))
    }, [])
    return (
        <>
            <Header></Header>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Registro de entidades</h1>
                <div className="flex gap-4 mb-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={() => setVista('ligas')}
                    >
                        Alta de Ligas
                    </button>
                    <button
                        className="bg-green-600 text-white px-4 py-2 rounded"
                        onClick={() => setVista('equipos')}
                    >
                        Finge que es una liga
                    </button>
                </div>

                {vista === 'ligas' && <AltaLigas onCancel={() => setVista(null)} />}
                {vista === 'equipos' && <TablaEquipos equipos={equipos} onCancel={() => setVista(null)} />}
            </div>

        </>
    )
}
export default VentanaPrincipal