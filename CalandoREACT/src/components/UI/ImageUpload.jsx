import { useState } from 'react';

export function ImageUpload({
  label = "Subir Imagen",
  name = "logo",
  onImageChange,
  onImageRemove,
  imagePreview = null,
  error = null,
  required = false,
  maxSizeMB = 15,
  acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png'],
  placeholder = "Click para subir tu imagen",
  helpText = "PNG y JPG",
  size = ""
}) {

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validar tipo
    if (!acceptedTypes.includes(file.type)) {
      const typesText = acceptedTypes
        .map(type => type.split('/')[1].toUpperCase())
        .join(', ');
      onImageChange(null, `Archivo inválido (${typesText})`);
      return;
    }

    // Validar tamaño
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      onImageChange(null, `La imagen debe ser menor a ${maxSizeMB} MB`);
      return;
    }

    // Generar preview
    const reader = new FileReader();
    reader.onload = (event) => {
      onImageChange(file, null, event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    const fileInput = document.querySelector(`input[name="${name}"]`);
    if (fileInput) fileInput.value = '';
    onImageRemove();
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Vista previa */}
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
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ×
          </button>
        </div>
      )}

      {/* Input */}
      {!imagePreview && (
        <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${size}`}>
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
            <p className="text-xs text-gray-500">{helpText} (máx. {maxSizeMB}MB)</p>
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
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
