import { useEffect,useState } from "react";
import  InfoCard  from '../components/UI/InfoCard'
import { obtenerLigas } from '../../services/ligaService'
import { useNavigate } from 'react-router-dom';  // ← Agregar esto


export default function VentanaPrincipal(){
    const [ligas, setLigas] = useState([])
    const navigate = useNavigate();  // ← Agregar esto


    useEffect(() => {
        const cargarLigas = async () => {
            try {
                const data = await obtenerLigas()              
                setLigas(data)
            } catch (error) {
                console.error('Error al cargar ligas:', error)
            }
        }
        cargarLigas()
    }, [])

    const handleVer = (liga) => {
        navigate(`/editar-liga/${liga.id}`)
    }

    const handleEliminar = (liga) => {
        console.log('Eliminar liga:', liga)
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

        </>
    )
}

