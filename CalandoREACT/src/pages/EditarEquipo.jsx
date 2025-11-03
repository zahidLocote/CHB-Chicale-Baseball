import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerEquipoPorId, editarEquipo } from '../../services/equipoService'
import PictureBox from '../components/UI/PictureBox'
import useFormValidation from '../hooks/useFormValidation'

export default function EditarEquipo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { validarEquipos } = useFormValidation()

    const [nombre, setNombre] = useState('')
    const [entrenador, setEntrenador] = useState('')
    const [ligaId, setLigaId] = useState(null)
    const [ligas, setLigas] = useState([])
    const [logo, setLogo] = useState(null)
    const logoFinal = typeof logo === 'string' && logo.trim() !== '' ? logo : null

    useEffect(() => {
        fetch('http://localhost:3001/ligas')
            .then(res => res.json())    
            .then(data => setLigas(data))

        obtenerEquipoPorId(id)
            .then(equipo => {
                setNombre(equipo.nombre)
                setEntrenador(equipo.entrenador)
                setLigaId(equipo.ligaId.toString())
                setLogo(equipo.logo)
            })
            .catch(error => {
                console.error('Error al cargar equipo:', error)
                alert('No se pudo cargar el equipo')
            })
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const errores = validarEquipos({ nombre, entrenador })
        if (Object.keys(errores).length > 0) {
            alert(Object.values(errores).join('\n'))
            return
        }

        try {
            console.log({ nombre, entrenador, logo, ligaId })
            await editarEquipo(id, { nombre, entrenador, logo: logoFinal, ligaId })
            alert('Equipo actualizado exitosamente')
            navigate('/')
        } catch (error) {
            console.error(error)
            alert('Error al actualizar equipo')
        }
    }

    return (
        <>
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Equipo</h1>
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
    </>
    )
}