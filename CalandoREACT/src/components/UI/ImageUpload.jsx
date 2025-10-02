import { useState } from 'react';

/**
 * Componente reutilizable para subir y previsualizar imágenes
 * 
 * @param {Object} props
 * @param {string} props.label - Texto del label (ej: "Logo de la Liga")
 * @param {Function} props.onImageChange - Callback cuando se selecciona una imagen
 * @param {Function} props.onImageRemove - Callback cuando se elimina la imagen
 * @param {string|null} props.imagePreview - URL de la imagen para preview
 * @param {string} props.error - Mensaje de error a mostrar
 * @param {string} props.name - Nombre del input (para formularios)
 * @param {boolean} props.required - Si el campo es obligatorio
 * @param {number} props.maxSizeMB - Tamaño máximo en MB (default: 5)
 * @param {Array<string>} props.acceptedTypes - Tipos de archivos aceptados
 */
export function ImageUpload({
  label = "Subir Imagen",
  onImageChange,
  onImageRemove,
  imagePreview = null,
  error = null,
  name = "image",
  required = false,
  maxSizeMB = 5,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  placeholder = "Click para subir tu imagen",
  helpText = "PNG y JPG",
  size = ""
}) {
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Validar tipo de archivo
    if (!acceptedTypes.includes(file.type)) {
      const typesText = acceptedTypes
        .map(type => type.split('/')[1].toUpperCase())
        .join(', ');
      onImageChange(null, `Por favor, selecciona un archivo válido (${typesText})`);
      return;
    }

    // Validar tamaño
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      onImageChange(null, `La imagen debe ser menor a ${maxSizeMB}MB`);
      return;
    }

    // Si todo está bien, retornar el archivo y su preview
    const reader = new FileReader();
    reader.onload = (event) => {
      onImageChange(file, null, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    // Limpiar el input file
    const fileInput = document.querySelector(`input[name="${name}"]`);
    if (fileInput) {
      fileInput.value = '';
    }
    onImageRemove();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {/* Preview de la imagen */}
      {imagePreview && (
        <div className="mb-3 relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-32 h-32 object-cover rounded-lg border-2 border-gray-300 mx-auto"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
            aria-label="Eliminar imagen"
          >
            ×
          </button>
        </div>
      )}
      
      {/* Input de archivo (solo se muestra si no hay preview) */}
      {!imagePreview && (
        <div className={"items-center justify-center " + size}>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg 
                className="w-8 h-8 mb-4 text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">{placeholder}</span>
              </p>
              <p className="text-xs text-gray-500">
                {helpText} (máx. {maxSizeMB}MB)
              </p>
            </div>
            <input 
              type="file" 
              name={name}
              className="hidden" 
              accept={acceptedTypes.join(',')}
              onChange={handleFileChange}
              required={required}
            />
          </label>
        </div>
      )}
      
      {/* Mensaje de error */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}