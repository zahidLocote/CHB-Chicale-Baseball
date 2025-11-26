import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearEquipo } from '../../services/equipoService'
import PictureBox from '../components/UI/PictureBox'
import useFormValidation from '../hooks/useFormValidation'
import { useLocation } from 'react-router-dom'
import { AlertaPopUp } from '../components/UI/AlertaPopUp'

export default function AltaEquipos() {
    const navigate = useNavigate();
    const location = useLocation();

    const { validarEquipos } = useFormValidation();
    const [nombre, setNombre] = useState('');
    const [entrenador, setEntrenador] = useState('');
    const [ligaId, setLigaId] = useState(null);
    const [logo, setLogo] = useState(null);

    const [showAlerta, setShowAlerta] = useState(false);
    const [alertaConfig, setAlertaConfig] = useState({
        title: '',
        message: '',
        type: 'error',
        errors: {}
    });

    useEffect(() => {
        // Toma el id de la liga madre si fue enviada
        if (location.state?.ligaId) {
            setLigaId(location.state.ligaId);
        }
    }, [location.state]);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const errores = validarEquipos({ nombre, entrenador })

        if (Object.keys(errores).length > 0) {
            // Mostrar errores en la alerta
            setAlertaConfig({
                title: 'Error de Validación',
                message: '',
                type: 'error',
                errors: errores
            });
            setShowAlerta(true);
            return
        }
        try{
            await crearEquipo({ nombre, entrenador, logo, ligaId })
            setNombre('')
            setEntrenador('')
            setLogo(null)

            // Mostrar éxito
            setAlertaConfig({
                title: 'Éxito',
                message: 'Equipo registrado exitosamente',
                type: 'success',
                errors: {}
            });
            setShowAlerta(true);
            
            // Navegar después de cerrar la alerta
            setTimeout(() => {
                navigate('/')
            }, 1500);
        }catch(error){
            console.error(error)
        }
    }

    return (
        <>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Registro Equipo</h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div className="flex flex-row gap-6">
                        {/* Campos de texto */}
                        <div className="flex flex-col flex-1 space-y-15">
                            <input
                                type="text"
                                placeholder="Nombre de Equipo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="border p-2 w-full rounded text-center placeholder:text-center max-w-sm"
                            />
                            <input
                                type="text"
                                placeholder="Entrenador"
                                value={entrenador}
                                onChange={(e) => setEntrenador(e.target.value)}
                                className="border p-2 w-full rounded text-center placeholder:text-center max-w-sm"
                            />
                        </div>

                        {/* PictureBox */}
                        <div className="flex flex-col items-center space-y-2 pt-1">
                            <PictureBox editable={true} onImageChange={(file) => setLogo(file)} />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-pink-700"
                            onClick={() => navigate('/')}
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                        >
                            ACEPTAR
                        </button>
                    </div>
                </form>
            </div>
            {/* Alerta PopUp */}
            <AlertaPopUp
                show={showAlerta}
                onClose={() => setShowAlerta(false)}
                title={alertaConfig.title}
                message={alertaConfig.message}
                type={alertaConfig.type}
                errors={alertaConfig.errors}
            />
        </>
    )
}