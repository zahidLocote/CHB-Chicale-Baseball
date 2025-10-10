export default function EliminarPopUp({ liga, onConfirmar, onCancelar }) {
    // Si no hay liga, no mostrar el popup
    if (!liga) return null;

    return (
        // Overlay de fondo oscuro
        <div className="fixed inset-0 flex items-center justify-center">
            {/* Cuadro blanco del popup */}
            <div className="bg-white rounded-lg overflow-hidden p-0 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <h1 className="w-full bg-red-500 text-white text-3xl font-bold text-center py-4"> Eliminar Liga </h1>

                <div className="p-5">
                    <h1 className="text-center text-2xl">¿Esta seguro que desea eliminar la liga "Nombre de liga” ID:"id de liga"?</h1>
                    <div className="flex justify-center space-x-20">
                        <button className="bg-red-500 text-white font-bold font-bold px-4 py-2 rounded-xl hover:bg-red-600 mt-5" onClick={onCancelar}>
                         Cancelar
                        </button>

                        <button className="bg-green-500 text-white font-bold font-bold px-4 py-2 rounded-xl hover:bg-green-600 mt-5">
                         Aceptar
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}