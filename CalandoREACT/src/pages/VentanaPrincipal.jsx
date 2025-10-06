import { useEffect,useState } from "react";
import  InfoCard  from '../components/UI/InfoCard'
import { obtenerLigas } from '../../services/ligaService'

export default function VentanaPrincipal(){
    const [ligas, setLigas] = useState([])

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
    
    return(
        <>
            <h1 className="text-center text-3xl mb-6">Consulta de Ligas</h1>

            <div className="grid grid-cols-4 gap-6 p-4">
                {ligas.map(liga => (
                    <InfoCard key={liga.id} liga={liga} />
                ))}
            </div>

        </>
    )
}