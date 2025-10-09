import { useState } from 'react';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';
import { ImageUpload } from '../components/UI/ImageUpload';
import { registrarLiga } from '../../services/ligaService';
import { ligaFormValidation } from '../hooks/ligaFormValidation';  // ← Importar hook

export default function AltaJugador() {
  const { errors, validarFormularioLiga, limpiarError, limpiarErrores } = ligaFormValidation();  // ← Usar hook
  
  const [formData, setFormData] = useState({
    nombreLiga: '',
    edadMin: 0,
    edadMax: 0,
    categoria: '',
    nombrePresidente: '',
    contactoPresidente: '',
    logoLiga: null
  });
  
  const [showPopup, setShowPopup] = useState(false); 
  const [popupConfig, setPopupConfig] = useState({
    title: '',
    message: '',
    type: 'error'
  });
  const [imagePreview, setImagePreview] = useState(null);

  // Funciones para manejar los number pickers
  const incrementAge = (type) => {
    if (type === 'min' && formData.edadMin < 100) {
      setFormData({
        ...formData,
        edadMin: formData.edadMin + 1
      });
    } else if (type === 'max' && formData.edadMax < 100) {
      setFormData({
        ...formData,
        edadMax: formData.edadMax + 1
      });
    }
    limpiarError('rangoEdad');  // ← Usar función del hook
  };

  const decrementAge = (type) => {
    if (type === 'min' && formData.edadMin > 1) {
      setFormData({
        ...formData,
        edadMin: formData.edadMin - 1
      });
    } else if (type === 'max' && formData.edadMax > 1) {
      setFormData({
        ...formData,
        edadMax: formData.edadMax - 1
      });
    }
    limpiarError('rangoEdad');  // ← Usar función del hook
  };

  const handleAgeInputChange = (type, value) => {
    const numValue = parseInt(value) || 1;
    if (type === 'min') {
      setFormData({
        ...formData,
        edadMin: Math.max(1, Math.min(100, numValue))
      });
    } else {
      setFormData({
        ...formData,
        edadMax: Math.max(1, Math.min(100, numValue))
      });
    }
    limpiarError('rangoEdad');  // ← Usar función del hook
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    limpiarError(name);  // ← Usar función del hook
  };

  const handleImageChange = (file, error, preview) => {
    if (error) {
      return;
    }

    setFormData({
      ...formData,
      logoLiga: file
    });
    setImagePreview(preview);
  };

  const handleImageRemove = () => {
    setFormData({
      ...formData,
      logoLiga: null
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ← Usar validación del hook
    const esValido = validarFormularioLiga({
      nombreLiga: formData.nombreLiga,
      edadMin: formData.edadMin,
      edadMax: formData.edadMax,
      categoria: formData.categoria,
      nombrePresidente: formData.nombrePresidente,
      contactoPresidente: formData.contactoPresidente
    });

    if (esValido) {
      try {
        const ligaInformacion = {
          nombreLiga: formData.nombreLiga.trim(),
          edadMin: formData.edadMin,
          edadMax: formData.edadMax,
          categoria: formData.categoria.trim(),
          nombrePresidente: formData.nombrePresidente.trim(),
          contactoPresidente: formData.contactoPresidente.trim()
        };
        
        await registrarLiga(ligaInformacion);
        
        // Mostrar popup de éxito
        setPopupConfig({
          title: '¡Éxito!',
          message: 'El registro de la liga se ha completado exitosamente.',
          type: 'success'
        });
        setShowPopup(true);
        
        // Resetear formulario
        setFormData({
          nombreLiga: '',
          edadMin: 0,
          edadMax: 0,
          categoria: '',
          nombrePresidente: '',
          contactoPresidente: '',
          logoLiga: null
        });
        setImagePreview(null);
      } catch (error) {
        console.error('Error al registrar:', error);
        setPopupConfig({
          title: 'Error',
          message: 'No se pudo registrar la liga. Intenta nuevamente.',
          type: 'error'
        });
        setShowPopup(true);
      }
    } else {
      // Mostrar popup de error con validaciones
      setPopupConfig({
        title: 'Campos Obligatorios',
        message: null,  // Se usarán los errors del hook
        type: 'error'
      });
      setShowPopup(true);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombreLiga: '',
      edadMin: 0,
      edadMax: 0,
      categoria: '',
      nombrePresidente: '',
      contactoPresidente: '',
      logoLiga: null
    });
    limpiarErrores();  // ← Usar función del hook
    setImagePreview(null);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    if (popupConfig.type !== 'success') {
      limpiarErrores();  // ← Solo limpiar si no es éxito
    }
  };

  return (
    <>
      {/* Popup de alerta */}
      <AlertaPopUp
        show={showPopup}
        onClose={handleClosePopup}
        title={popupConfig.title}
        message={popupConfig.message}
        type={popupConfig.type}
        errors={errors}  // ← Pasar errors del hook
      />

      <div className="flex flex-col items-center min-h-screen bg-gray-50">
        
        <h1 className="mt-10 text-3xl font-bold text-center">Registro de Liga</h1>

        <div className="mt-2 w-full max-w-md border border-gray-300 rounded-lg p-7 bg-white shadow">
          <form className="space-y-3" onSubmit={handleSubmit}>
            
            {/* Nombre de liga */}
            <div>
              <input
                type="text"
                name="nombreLiga"
                value={formData.nombreLiga}
                onChange={handleInputChange}
                placeholder="Nombre de la liga"
                className={`border p-2 w-full rounded-2xl ${errors.nombreLiga ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.nombreLiga && <p className="text-red-500 text-sm mt-1">{errors.nombreLiga}</p>}
            </div>

            {/* Rango de edad*/}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rango de Edad
              </label>
              <div className="flex items-center justify-center space-x-4">
                {/* Number Picker para Edad Mínima */}
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
                      value={formData.edadMin}
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

                {/* Number Picker para Edad Máxima */}
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
                      value={formData.edadMax}
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
              
              {/* Mensajes de error para el rango de edad */}
              {errors.rangoEdad && <p className="text-red-500 text-sm mt-1">{errors.rangoEdad}</p>}
            </div>

            {/* Categoría */}
            <div>
              <input
                type='text'
                name="categoria"
                value={formData.categoria}
                onChange={handleInputChange}
                placeholder="Categoria"
                className={`border p-2 w-full rounded-2xl ${errors.categoria ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
            </div>

            {/* Nombre presidente */}
            <div>
              <input
                type='text'
                name="nombrePresidente"
                value={formData.nombrePresidente}
                onChange={handleInputChange}
                placeholder="Nombre del presidente de liga"
                className={`border p-2 w-full rounded-2xl ${errors.nombrePresidente ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.nombrePresidente && <p className="text-red-500 text-sm mt-1">{errors.nombrePresidente}</p>}
            </div>

            {/* Contacto presidente */}
            <div>
              <input
                type='text'
                name="contactoPresidente"
                value={formData.contactoPresidente}
                onChange={handleInputChange}
                placeholder="Contacto del presidente"
                className={`border p-2 w-full rounded-2xl ${errors.contactoPresidente ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.contactoPresidente && <p className="text-red-500 text-sm mt-1">{errors.contactoPresidente}</p>}
            </div>

            {/*Cargar imagen*/}
            <ImageUpload
              label="Logo de la Liga (Opcional)"
              name="logoEquipoImg"
              onImageChange={handleImageChange}
              onImageRemove={handleImageRemove}
              imagePreview={imagePreview}
              error={errors.logoLiga}
              required={false}
              maxSizeMB={5}
              acceptedTypes={['image/jpeg', 'image/jpg', 'image/png']}
              placeholder="Click para subir tu logo"
              helpText="PNG y JPG"
              size="w-full"
            />     

            {/* Contenedor de botones */}
            <div className="flex justify-between">
              <button
                name='cancelarBtn'
                type="button"
                onClick={handleCancel}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-800"
              >
                Cancelar
              </button>

              <button
                name='registrarBtn'
                type="submit"
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}