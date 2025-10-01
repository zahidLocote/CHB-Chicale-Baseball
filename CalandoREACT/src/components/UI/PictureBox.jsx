import { useState } from 'react'

export default function PictureBox({ editable = false, initialImage = null, onImageChange }) {
  const [preview, setPreview] = useState(initialImage)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      if (onImageChange) onImageChange(file)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-55 h-35 border rounded flex items-center justify-center bg-gray-100 overflow-hidden">
        {preview ? (
          <img src={preview} alt="Logo del equipo" className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500">Logo</span>
        )}
      </div>

      {editable && (
        <>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => document.getElementById('fileInput').click()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800 mx-auto"
          >
            Subir Archivo
          </button>
        </>
      )}
    </div>
  )
}