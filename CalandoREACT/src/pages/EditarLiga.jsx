import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { ImageUpload } from "../components/UI/ImageUpload";
import { obtenerLigaPorId } from "../../services/ligaService";
import { ligaFormValidation } from "../hooks/ligaFormValidation";
import { AlertaPopUp } from "../components/UI/AlertaPopUp";
import { editarLigas } from "../../services/ligaService";



export default function EditarLiga() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { errors, validarFormularioLiga, limpiarError, limpiarErrores } = ligaFormValidation()  // ← Usar hook
    // Estados para el popup
    const [showPopup, setShowPopup] = useState(false);  // ← Agregar
    const [popupConfig, setPopupConfig] = useState({    // ← Agregar
        title: '',
        message: '',
        type: 'error'
    });



    const [nombreLiga, setNombreLiga] = useState('');
    const [edadMin, setEdadMin] = useState(1);
    const [edadMax, setEdadMax] = useState(1);
    const [categoria, setCategoria] = useState('');
    const [nombrePresidente, setNombrePresidente] = useState('');
    const [contactoPresidente, setContactoPresidente] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [logoLiga, setLogoLiga] = useState(null);

    useEffect(() => {
  const cargarLiga = async () => {
    try {
      const liga = await obtenerLigaPorId(id);
      
      setNombreLiga(liga.nombreLiga);
      setEdadMin(liga.edad_min);
      setEdadMax(liga.edad_max);
      setCategoria(liga.categoria);
      setNombrePresidente(liga.nombrePresidente);
      setContactoPresidente(liga.contactoPresidente);
      setImagePreview(liga.logoUrl || null); // si tienes logo
      
    } catch (error) {
      console.error('Error al cargar la liga:', error);
      // Mostrar error con popup
                
      setPopupConfig({
        title: 'Error',            
        message: 'No se pudo cargar la información de la liga',
        type: 'error'
                
    });
    setShowPopup(true);
    }
  };

  if (id) cargarLiga();
}, [id]);



    // Incrementar edad
    const incrementAge = (type) => {
        if (type === 'min' && edadMin < 100) setEdadMin(edadMin + 1);
        else if (type === 'max' && edadMax < 100) setEdadMax(edadMax + 1);
        limpiarError('rangoEdad');
    };

    // Decrementar edad
    const decrementAge = (type) => {
        if (type === 'min' && edadMin > 1) setEdadMin(edadMin - 1);
        else if (type === 'max' && edadMax > 1) setEdadMax(edadMax - 1);
        limpiarError('rangoEdad');
    };

    // Cambiar edad por input
    const handleAgeInputChange = (type, value) => {
        const numValue = parseInt(value) || 1;
        if (type === 'min') setEdadMin(Math.max(1, Math.min(100, numValue)));
        else setEdadMax(Math.max(1, Math.min(100, numValue)));
         limpiarError('rangoEdad');
    };

    // Cambiar valores de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'nombreLiga': setNombreLiga(value); 
            limpiarError('nombreLiga');
            break;
            case 'categoria': setCategoria(value); 
            limpiarError('categoria');
            break;
            case 'nombrePresidente': setNombrePresidente(value);
            limpiarError('nombrePresidente');
            break;
            case 'contactoPresidente': 
            setContactoPresidente(value);
            limpiarError('contactoPresidente');
            break;
            default: break;
        }
    };

    // Imagen
    const handleImageChange = (file, error, preview) => {
        if (error) return;
        setLogoLiga(file);
        setImagePreview(preview);
    };

    const handleImageRemove = () => {
        setLogoLiga(null);
        setImagePreview(null);
    };

    // Cancelar
    const handleCancelar = () => {
        navigate('/');
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        limpiarErrores();
        
        // Si fue éxito, regresar a la página anterior
        if (popupConfig.type === 'success') {
            navigate('/');
        }
    };

    const handleSubmit = async (e) =>{
        e.preventDefault()

        const esValido = validarFormularioLiga({
            nombreLiga,
            edadMin,
            edadMax,
            categoria,
            nombrePresidente,
            contactoPresidente
        });

        if (!esValido) {
            // Mostrar errores en popup
            setPopupConfig({
                title: 'Campos Obligatorios',
                message: null,  // Se generará desde errors
                type: 'error'
            });
            setShowPopup(true);
            return;
        }

         console.log('Formulario válido, enviando...');
        try {
            // Aquí harías la actualización a la API

            await editarLigas(id, {nombreLiga, edadMin, edadMax, categoria, nombrePresidente, contactoPresidente})
            setPopupConfig({
                title: '¡Éxito!',
                message: 'La liga se ha actualizado correctamente',
                type: 'success'
            });
            setShowPopup(true);
        } catch (error) {
            console.error('Error al actualizar:', error);
            setPopupConfig({
                title: 'Error',
                message: 'No se pudo actualizar la liga. Intenta nuevamente.',
                type: 'error'
            });
            setShowPopup(true);
        }

    }

    return (
        <>
        {/* Popup de alerta */}
            <AlertaPopUp
                show={showPopup}
                onClose={handleClosePopup}
                title={popupConfig.title}
                message={popupConfig.message}
                type={popupConfig.type}
                errors={errors}
            />
        
            <h1 className="text-center text-3xl mb-6 mt-10">Editar Liga</h1>
            <div className="flex justify-center items-center px-4">
                <div className="w-full max-w-md border border-gray-400 rounded-lg p-7 bg-white shadow-xl">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Nombre de la liga */}
                        <input
                            type="text"
                            name="nombreLiga"
                            value={nombreLiga}
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
                                {/* Edad mínima */}
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
                                            value={edadMin}
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

                                {/* Edad máxima */}
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
                                            value={edadMax}
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
                            value={categoria}
                            onChange={handleInputChange}
                            placeholder="Categoría"
                            className="border p-2 w-full rounded-2xl"
                        />

                        {/* Nombre del presidente */}
                        <input
                            type="text"
                            name="nombrePresidente"
                            value={nombrePresidente}
                            onChange={handleInputChange}
                            placeholder="Nombre del presidente"
                            className="border p-2 w-full rounded-2xl"
                        />

                        {/* Contacto del presidente */}
                        <input
                            type="text"
                            name="contactoPresidente"
                            value={contactoPresidente}
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
    );
}
