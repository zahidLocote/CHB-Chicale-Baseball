import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { crearEquipo } from '../../services/equipoService'
import PictureBox from '../components/UI/PictureBox'
import useFormValidation from '../hooks/useFormValidation'

export default function AltaEquipos({ onCancel }) {
    const navigate = useNavigate()
    const { validarEquipos } = useFormValidation()
    const [nombre, setNombre] = useState('')
    const [entrenador, setEntrenador] = useState('')
    const [ligaId, setLigaId] = useState('1')
    const [ligas, setLigas] = useState([])
    const [logo, setLogo] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/equipo')
            .then(res => res.json())
            .then(data => setLigas(data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errores = validarEquipos({ nombre, entrenador })
        if (Object.keys(errores).length > 0) {
            alert(Object.values(errores).join('\n'))
            return
        }
        try{
            await crearEquipo({ nombre, entrenador, logo, ligaId })
            setNombre('')
            setEntrenador('')
            setLogo(null)
            alert('Equipo registrado exitosamente')
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
                            onClick={onCancel}
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
        </>
    )
}