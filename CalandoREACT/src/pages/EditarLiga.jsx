import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';  // ← Agregar useNavigate
import { ImageUpload } from "../components/UI/ImageUpload";
import { obtenerLigaPorId } from "../../services/ligaService";

export default function EditarLiga(){
    const { id } = useParams();
    const navigate = useNavigate();  // ← Agregar esto

    
    const [informacion, setInformacion] = useState({
        nombreLiga: '',
        edadMin: 0,
        edadMax: 0,
        categoria: '',
        nombrePresidente: '',
        contactoPresidente: '',
        logoLiga: null
    });

    useEffect(() => {
  const cargarLiga = async () => {
    try {
      const datos = await obtenerLigaPorId(id);

      setInformacion({
        nombreLiga: datos.nombreLiga || '',
        edadMin: datos.edad_min || 0,
        edadMax: datos.edad_max || 0,
        categoria: datos.categoria || '',
        nombrePresidente: datos.nombrePresidente || '',
        contactoPresidente: datos.contactoPresidente || '',
        logoLiga: null
      });
    } catch (error) {
      console.error("Error al cargar liga:", error);
    }
  };

  cargarLiga();
}, [id]);


    const [imagePreview, setImagePreview] = useState(null);

    const incrementAge = (type) => {
        if (type === 'min' && informacion.edadMin < 100) {
            setInformacion({
                ...informacion,
                edadMin: informacion.edadMin + 1
            });
        } else if (type === 'max' && informacion.edadMax < 100) {
            setInformacion({
                ...informacion,
                edadMax: informacion.edadMax + 1
            });
        }
    };

    const decrementAge = (type) => {
        if (type === 'min' && informacion.edadMin > 1) {
            setInformacion({
                ...informacion,
                edadMin: informacion.edadMin - 1
            });
        } else if (type === 'max' && informacion.edadMax > 1) {
            setInformacion({
                ...informacion,
                edadMax: informacion.edadMax - 1
            });
        }
    };

    const handleAgeInputChange = (type, value) => {
        const numValue = parseInt(value) || 1;
        if (type === 'min') {
            setInformacion({
                ...informacion,
                edadMin: Math.max(1, Math.min(100, numValue))
            });
        } else {
            setInformacion({
                ...informacion,
                edadMax: Math.max(1, Math.min(100, numValue))
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInformacion({
            ...informacion,
            [name]: value
        });
    };

    const handleImageChange = (file, error, preview) => {
        if (error) return;
        setInformacion({ ...informacion, logoLiga: file });
        setImagePreview(preview);
    };

    const handleImageRemove = () => {
        setInformacion({ ...informacion, logoLiga: null });
        setImagePreview(null);
    };

    const handleCancelar = () => {
        navigate(-1);  // ← Agregar esta función
    };

    return(
        <>
            <h1 className="text-center text-3xl mb-6 mt-10">Editar Liga</h1>
            {/* Contenedor centrado */}
            <div className="flex justify-center items-center px-4">
                <div className="w-full max-w-md border border-gray-400 rounded-lg p-7 bg-white shadow-xl">
                    <form className="space-y-4">
                        
                        {/* Nombre de la liga */}
                        <input
                            type="text"
                            name="nombreLiga"
                            value={informacion.nombreLiga}
                            onChange={handleInputChange}
                            placeholder="Nombre de la liga"
                            className="border p-2 w-full rounded-2xl"
                        />

                        {/* Number Pickers */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rango de Edad
                            </label>
                            <div className="flex items-center justify-center space-x-4">
                                <div className="flex flex-col items-center">
                                    <label className="text-xs text-gray-500 mb-1">Edad Mín.</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => decrementAge('min')}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={informacion.edadMin}
                                            onChange={(e) => handleAgeInputChange('min', e.target.value)}
                                            className="w-12 h-8 text-center border-0 focus:outline-none"
                                            min="1"
                                            max="100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => incrementAge('min')}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="text-xl font-bold text-gray-700 pt-6">
                                    A:
                                </div>

                                <div className="flex flex-col items-center">
                                    <label className="text-xs text-gray-500 mb-1">Edad Máx.</label>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            type="button"
                                            onClick={() => decrementAge('max')}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold"
                                        >
                                            −
                                        </button>
                                        <input
                                            type="number"
                                            value={informacion.edadMax}
                                            onChange={(e) => handleAgeInputChange('max', e.target.value)}
                                            className="w-12 h-8 text-center border-0 focus:outline-none"
                                            min="1"
                                            max="100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => incrementAge('max')}
                                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 text-gray-600 font-bold"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Categoría */}
                        <input
                            type="text"
                            name="categoria"
                            value={informacion.categoria}
                            onChange={handleInputChange}
                            placeholder="Categoría"
                            className="border p-2 w-full rounded-2xl"
                        />

                        {/* Nombre del presidente */}
                        <input
                            type="text"
                            name="nombrePresidente"
                            value={informacion.nombrePresidente}
                            onChange={handleInputChange}
                            placeholder="Nombre del presidente"
                            className="border p-2 w-full rounded-2xl"
                        />

                        {/* Contacto del presidente */}
                        <input
                            type="text"
                            name="contactoPresidente"
                            value={informacion.contactoPresidente}
                            onChange={handleInputChange}
                            placeholder="Contacto del presidente"
                            className="border p-2 w-full rounded-2xl"
                        />
                        
                        {/* Upload de imagen */}
                        <ImageUpload
                            label="Logo de la Liga"
                            name="logoLiga"
                            onImageChange={handleImageChange}
                            onImageRemove={handleImageRemove}
                            imagePreview={imagePreview}
                        />

                        {/* Botones */}
                        <div className="flex justify-between pt-4">
                            <button
                                type="button"
                                onClick={handleCancelar}
                                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800"
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-800"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}