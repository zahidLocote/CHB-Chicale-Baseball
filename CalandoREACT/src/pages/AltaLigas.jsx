import { useState } from 'react';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';
import { ImageUpload } from '../components/UI/ImageUpload';
import { registrarLiga } from '../../services/ligaService';



export default function AltaJugador() {
  const [formData, setFormData] = useState({
    nombreLiga: '',
    edadMin: 0,
    edadMax: 0,
    categoria: '',
    nombrePresidente: '',
    contactoPresidente: '',
    logoLiga: null
  });

  const [errors, setErrors] = useState({});
  
  const [showPopup, setShowPopup] = useState(false); 
   
  const [imagePreview, setImagePreview] = useState(null); // Para mostrar preview de la imagen

  // Función para validar campos
  const validateForm = () => {
    const newErrors = {};

    // Validar cada campo (eliminar espacios y verificar si está vacío)
    if (!formData.nombreLiga.trim()) {
      newErrors.nombreLiga = 'El nombre de la liga es obligatorio';
    }
    
    if (formData.edadMin < 1 || formData.edadMin > 100) {
      newErrors.edadMin = 'La edad mínima debe estar entre 5 y 100 años';
    }
    
    if (formData.edadMax < 1 || formData.edadMax > 100) {
      newErrors.edadMax = 'La edad máxima debe estar entre 5 y 100 años';
    }
    
    if (formData.edadMin > formData.edadMax) {
      newErrors.rangoEdad = 'La edad mínima no puede ser mayor que la edad máxima';
    }
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria';
    }
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = 'La categoría es obligatoria';
    }
    
    if (!formData.nombrePresidente.trim()) {
      newErrors.nombrePresidente = 'El nombre del presidente es obligatorio';
    }
    
    if (!formData.contactoPresidente.trim()) {
      newErrors.contactoPresidente = 'El contacto del presidente es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

   //Funciones para manejar los number pickers
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
    
    // Limpiar errores relacionados con edad
    if (errors.edadMin || errors.edadMax || errors.rangoEdad) {
      setErrors({
        ...errors,
        edadMin: '',
        edadMax: '',
        rangoEdad: ''
      });
    }
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
    
    // Limpiar errores relacionados con edad
    if (errors.edadMin || errors.edadMax || errors.rangoEdad) {
      setErrors({
        ...errors,
        edadMin: '',
        edadMax: '',
        rangoEdad: ''
      });
    }
  };

  //Función para manejar cambio directo en el input numérico
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
    
    // Limpiar errores relacionados con edad
    if (errors.edadMin || errors.edadMax || errors.rangoEdad) {
      setErrors({
        ...errors,
        edadMin: '',
        edadMax: '',
        rangoEdad: ''
      });
    }
  };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Manejar cambios en el input de archivo
  const handleImageChange = (file, error, preview) => {
    if (error) {
      // Si hay un error, actualizarlo en el estado de errores
      setErrors({
        ...errors,
        logoLiga: error
      });
      return;
    }

    // Si todo está bien, guardar el archivo y el preview
    setFormData({
      ...formData,
      logoLiga: file
    });
    setImagePreview(preview);

    // Limpiar error si existía
    if (errors.logoLiga) {
      setErrors({
        ...errors,
        logoLiga: ''
      });
    }
  };

  // Función para remover la imagen
  const handleImageRemove = () => {
    setFormData({
      ...formData,
      logoLiga: null
    });
    setImagePreview(null);
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      /* (zahid): ESTO ES NECESARIO PARA ARCHIVOS (USAR FormData)
      const formDataToSend = new FormData();
      formDataToSend.append('nombreLiga', formData.nombreLiga.trim());
      // MODIFICACIÓN 5: Cambié el envío del rango de edad
      formDataToSend.append('edadMin', formData.edadMin.toString());
      formDataToSend.append('edadMax', formData.edadMax.toString());
      formDataToSend.append('categoria', formData.categoria.trim());
      formDataToSend.append('nombrePresidente', formData.nombrePresidente.trim());
      formDataToSend.append('contactoPresidente', formData.contactoPresidente.trim());
      
      if (formData.logoLiga) {
        formDataToSend.append('logoLiga', formData.logoLiga);
      }
      //Check
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }
      console.log(formDataToSend)
      */
      //Temporal hasta que se usen archivos (preparar la API)
      const ligaInformacion = {
        nombreLiga: formData.nombreLiga.trim(),
        edadMin: formData.edadMin,
        edadMax: formData.edadMax,
        categoria: formData.categoria.trim(),
        nombrePresidente: formData.nombrePresidente.trim(),
        contactoPresidente: formData.contactoPresidente.trim()
      };
      const response = await registrarLiga(ligaInformacion);
      
      // Mostrar popup de éxito
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
    } else {
      // Mostrar popup de error
      setShowPopup(true);
    }
  };

  // Manejar cancelación
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
    setErrors({});
  };

  // Cerrar popup 
  const handleClosePopup = () => {
    setShowPopup(false);
    setErrors({});
  };

  return (
    <>
      
      {/* Popup de alerta */}
      <AlertaPopUp
        show={showPopup}
        onClose={handleClosePopup}
        title={Object.keys(errors).length > 0 ? "Campos Obligatorios" : "¡Éxito!"}
        message={Object.keys(errors).length === 0 ? "El registro de la liga se ha completado exitosamente." : null}
        type={Object.keys(errors).length > 0 ? "error" : "success"}
        errors={errors}
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
                      min="5"
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

                {/* Separador "A:" */}
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
                      min="5"
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
              {errors.edadMin && <p className="text-red-500 text-sm mt-1">{errors.edadMin}</p>}
              {errors.edadMax && <p className="text-red-500 text-sm mt-1">{errors.edadMax}</p>}
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
              size = "w-full"
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