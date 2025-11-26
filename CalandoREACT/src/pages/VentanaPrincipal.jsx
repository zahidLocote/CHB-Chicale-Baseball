import { useEffect, useState } from "react";
import InfoCard from '../components/UI/InfoCard'
import { obtenerLigas } from '../../services/ligaService'
import { useNavigate } from 'react-router-dom';
import EliminarPopUp from "../components/UI/eliminarPopUp";
import { eliminarLiga } from "../../services/ligaService";
import Banner from "../components/UI/Banner";
import Slideshow from "../components/UI/Slideshow";
import { useAuth } from "../context/AuthContext";


export default function VentanaPrincipal() {
    const [ligas, setLigas] = useState([])
    const navigate = useNavigate();
    const [ligaEliminar, setLigaEliminar] = useState(null)
    const { esAdmin, refreshAuth } = useAuth();

    const cargarLigas = async () => {
        try {
            const data = await obtenerLigas();
            setLigas(data);
        } catch (error) {
            console.error('Error al cargar ligas:', error);
        }
    };

    useEffect(() => {
        refreshAuth(); // Refresca el estado de autenticación
        cargarLigas();
    }, []);


    const handleVer = (liga) => {
        navigate(`/editar-liga/${liga.id}`)
    }

    const handleVerEquipos = (liga) => {
        navigate(`/ligas/${liga.id}/equipos`, { state: { liga } });
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
    return (
        <>
            <button onClick={() => navigate("/login")} className="bg-blue-200 text-blue-800 font-semibold px-4 py-2 rounded hover:bg-blue-300 cursor-pointer">
                Iniciar sesion
            </button>
            <Banner />
            <Slideshow />
            <h1 className="text-center font-bold text-3xl mb-6 font-race mt-12">Ligas</h1>

            <div className="grid grid-cols-4 gap-6 p-4">
                {ligas.map(liga => {
                    // Adaptar los datos de liga al formato que espera InfoCard
                    const dataAdapt = {
                        id: liga.id,
                        nombre: liga.nombreLiga,
                        logo: liga.logoUrl
                    }

                    return (
                        <div key={liga.id} onClick={() => handleVerEquipos(liga)} className="cursor-pointer" >

                            <InfoCard
                                data={dataAdapt}
                                tipo="liga"
                                onVer={() => handleVer(liga)}
                                onEliminar={() => handleEliminar(liga)}
                                mostrarBotones={esAdmin}
                            />
                        </div>

                    )
                })}
            </div>
            <EliminarPopUp
                liga={ligaEliminar}
                onConfirmar={confirmarEliminacion}
                onCancelar={cancelarEliminacion}
            />

            <div className="flex justify-center mt-6">
                {esAdmin && (
                    <button
                        onClick={() => navigate('ligas/nuevo')}
                        className="bg-green-200 text-green-800 hover:bg-green-300 cursor-pointer px-4 py-2 rounded font-semibold">
                        Agregar Liga
                    </button>)}
            </div>
        </>
    )
}

