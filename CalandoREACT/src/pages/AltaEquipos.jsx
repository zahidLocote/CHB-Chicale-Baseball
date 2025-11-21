import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { crearEquipo } from '../../services/equipoService'
import { ImageUpload } from '../components/UI/ImageUpload'
import useFormValidation from '../hooks/useFormValidation'

export default function AltaEquipos() {
  const navigate = useNavigate()
  const location = useLocation()
  const { validarEquipos } = useFormValidation()

  const [nombre, setNombre] = useState('')
  const [entrenador, setEntrenador] = useState('')
  const [ligaId, setLigaId] = useState(null)

  // Imagen
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [errorLogo, setErrorLogo] = useState(null)

  useEffect(() => {
    if (location.state?.ligaId) {
      setLigaId(location.state.ligaId)
    }
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const errores = validarEquipos({ nombre, entrenador })
    if (Object.keys(errores).length > 0) {
      alert(Object.values(errores).join('\n'))
      return
    }

    if (!logoFile) {
      alert("Debes subir un logo para el equipo")
      return
    }

    try {
      const formData = new FormData()
      formData.append("nombre", nombre)
      formData.append("entrenador", entrenador)
      formData.append("ligaId", ligaId)
      formData.append("logo", logoFile)

      await crearEquipo(formData)

      setNombre('')
      setEntrenador('')
      setLogoFile(null)
      setLogoPreview(null)

      alert('Equipo registrado exitosamente')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Registro Equipo</h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="flex flex-row gap-6">
          {/* Formulario de texto */}
          <div className="flex flex-col flex-1 space-y-4">
            <input
              type="text"
              placeholder="Nombre de Equipo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 w-full rounded text-center placeholder:text-center"
            />

            <input
              type="text"
              placeholder="Entrenador"
              value={entrenador}
              onChange={(e) => setEntrenador(e.target.value)}
              className="border p-2 w-full rounded text-center placeholder:text-center"
            />
          </div>

          {/* Upload del logo */}
          <div className="flex flex-col items-center space-y-2 pt-1">
            <ImageUpload
              label="Logo del Equipo"
              name="logo"
              imagePreview={logoPreview}
              error={errorLogo}
              required={true}
              onImageChange={(file, error, preview) => {
                setErrorLogo(error)
                if (!error) {
                  setLogoFile(file)
                  setLogoPreview(preview)
                }
              }}
              onImageRemove={() => {
                setLogoFile(null)
                setLogoPreview(null)
              }}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
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
  )
}
