import { useState, useEffect } from 'react';

export function AlertaPopUp({ show, onClose, title = "Error", message, type = "error", errors = {} }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    }
  }, [show]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  };

  if (!show) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-500 border-red-600';
      case 'warning':
        return 'bg-yellow-500 border-yellow-600';
      case 'success':
        return 'bg-green-500 border-green-600';
      default:
        return 'bg-red-500 border-red-600';
    }
  };

  // Crear mensaje a partir de los errores
  const createErrorMessage = () => {
    if (message) return message;
    
    const errorList = Object.values(errors).filter(error => error);
    if (errorList.length > 0) {
      return `Por favor, corrige los siguientes errores:\n\n• ${errorList.join('\n• ')}`;
    }
    
    return 'Se encontraron errores en el formulario.';
  };

  return (
    <div 
      className={`fixed inset-0 bg-opacity-0 flex items-center justify-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 ${
          isVisible ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`${getTypeStyles()} text-white px-6 py-4 rounded-t-lg flex justify-between items-center`}>
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>
        
        <div className="px-6 py-4">
          <p className="text-gray-700 whitespace-pre-line">{createErrorMessage()}</p>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}