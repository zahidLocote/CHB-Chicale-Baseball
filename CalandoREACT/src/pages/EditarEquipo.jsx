import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { obtenerEquipoPorId, editarEquipo } from '../../services/equipoService'
import { ImageUpload } from '../components/UI/ImageUpload'
import useFormValidation from '../hooks/useFormValidation'

export default function EditarEquipo() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { validarEquipos } = useFormValidation()

    const [nombre, setNombre] = useState('')
    const [entrenador, setEntrenador] = useState('')
    const [ligaId, setLigaId] = useState(null)
    const [logo, setLogo] = useState(null)
    const [logoPreview, setLogoPreview] = useState(null)

    useEffect(() => {
        obtenerEquipoPorId(id)
            .then(equipo => {
                setNombre(equipo.nombre)
                setEntrenador(equipo.entrenador)
                setLigaId(equipo.ligaId.toString())
                setLogo(equipo.logo) // string
                setLogoPreview(equipo.logoUrl)
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
            await editarEquipo(id, {
                nombre,
                entrenador,
                ligaId,
                logo // puede ser string o File
            })

            alert('Equipo actualizado exitosamente')
            navigate('/')
        } catch (error) {
            console.error(error)
            alert('Error al actualizar equipo')
        }
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Editar Equipo</h1>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div className="flex flex-row gap-6">

                    <div className="flex flex-col flex-1 space-y-15">
                        <input
                            type="text"
                            placeholder="Nombre de Equipo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            className="border p-2 w-full rounded text-center max-w-sm"
                        />
                        <input
                            type="text"
                            placeholder="Entrenador"
                            value={entrenador}
                            onChange={(e) => setEntrenador(e.target.value)}
                            className="border p-2 w-full rounded text-center max-w-sm"
                        />
                    </div>

                    {/* Imagen */}
                    <ImageUpload
                        label="Logo del equipo"
                        imagePreview={logoPreview}
                        onImageChange={(file, error, preview) => {
                            if (!error) {
                                setLogo(file)
                                setLogoPreview(preview)
                            }
                        }}
                        onImageRemove={() => {
                            setLogo(null)
                            setLogoPreview(null)
                        }}
                    />
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => navigate('/')}
                    >
                        CANCELAR
                    </button>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        ACEPTAR
                    </button>
                </div>
            </form>
        </div>
    )
}
