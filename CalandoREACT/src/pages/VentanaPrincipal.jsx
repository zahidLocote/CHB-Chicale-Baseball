import { useEffect,useState } from "react";
import  InfoCard  from '../components/UI/InfoCard'
import { obtenerLigas } from '../../services/ligaService'
import { useNavigate } from 'react-router-dom';
import EliminarPopUp from "../components/UI/eliminarPopUp";
import { eliminarLiga } from "../../services/ligaService";


export default function VentanaPrincipal(){
    const [ligas, setLigas] = useState([])
    const navigate = useNavigate();
    const [ligaEliminar, setLigaEliminar] = useState(null)



    const cargarLigas = async () => {
        try {
            const data = await obtenerLigas();
            setLigas(data);
            } catch (error) {
                console.error('Error al cargar ligas:', error);
            }
    };

    useEffect(() => {
        cargarLigas();
    }, []);


    const handleVer = (liga) => {
        navigate(`/editar-liga/${liga.id}`)
    }

    const handleEliminar = (liga) => {
        console.log('Eliminar liga:', liga)
        setLigaEliminar(liga)
    }

    const cancelarEliminacion = () => {
        setLigaEliminar(null)  // Esto cierra el popup
    }
    const confirmarEliminacion = async () => {
        console.log(ligaEliminar.id)
        try {
            await eliminarLiga(ligaEliminar.id)
            console.log('Eliminando liga:', ligaEliminar.nombreLiga)
            setLigaEliminar(null); // Cierra el popup
            await cargarLigas(); 
        } catch (error) {
            console.error('Error:', error)
        }
    }
    
    return(
        <>
            <h1 className="text-center text-3xl mb-6">Consulta de Ligas</h1>

            <div className="grid grid-cols-4 gap-6 p-4">
                {ligas.map(liga => {
                    // Adaptar los datos de liga al formato que espera InfoCard
                    const dataAdapt = {
                        id: liga.id,
                        nombre: liga.nombreLiga,
                        logo: liga.logoUrl
                    }

                    return (
                        <InfoCard 
                            key={liga.id} 
                            data={dataAdapt}
                            tipo="liga"
                            onVer={() => handleVer(liga)}
                            onEliminar={() => handleEliminar(liga)}
                        />
                    )
                })}
            </div>
             <EliminarPopUp
                    liga={ligaEliminar}
                    onConfirmar={confirmarEliminacion}
                    onCancelar={cancelarEliminacion}
                />

        </>
    )
}

