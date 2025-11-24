import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificarCredenciales } from '../../services/adminService';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';

export default function LogIn(){
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertConfig, setAlertConfig] = useState({
        title: '',
        message: '',
        type: 'error'
    });
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await verificarCredenciales(usuario, contrasena);
            
            if (response.success) {
                // Mostrar alerta de éxito
                setAlertConfig({
                    title: 'Éxito',
                    message: 'Inicio de sesión exitoso. Redirigiendo...',
                    type: 'success'
                });
                setShowAlert(true);

                // Guardar datos del usuario en localStorage
                localStorage.setItem('admin', JSON.stringify(response.admin));
                
                // Redirigir después de 1.5 segundos
                setTimeout(() => {
                    navigate('/'); // Ajusta la ruta según tu aplicación
                }, 1500);
            }
        } catch (err) {
            // Mostrar alerta de error
            setAlertConfig({
                title: 'Error de autenticación',
                message: err.message+"." || 'Usuario o contraseña incorrectos',
                type: 'error'
            });
            setShowAlert(true);
        } finally {
            setLoading(false);
        }
    };

    return(
         <>
            <AlertaPopUp
                show={showAlert}
                onClose={() => setShowAlert(false)}
                title={alertConfig.title}
                message={alertConfig.message}
                type={alertConfig.type}
            />
            <img 
                src="../../public/loginBanner.png" 
                alt="fotoLogin" 
                className="w-150 h-177 float-left"
            />
            <div className="absolute top-30 left-210">
                <h1 className="text-6xl font-bold">Iniciar sesión</h1>
                
                <form onSubmit={handleLogin} className="mt-15">
                    <h1 className="text-xl font-bold">Ingrese su nombre de usuario:</h1>
                    <input 
                        type="text" 
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        placeholder=" Usuario" 
                        className="bg-gray-200 w-90 h-10 px-4 font-xl rounded-l placeholder:font-bold placeholder:text-gray-500"
                        required
                    />

                    <h1 className="text-xl font-bold mt-15">Ingrese su contraseña:</h1>
                    <input 
                        type="password" 
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder=" Contraseña" 
                        className="bg-gray-200 w-90 h-10 font-xl rounded-l px-4 placeholder:font-bold placeholder:text-gray-500"
                        required
                    />

                    {error && (
                        <p className="text-red-500 font-bold mt-4">{error}</p>
                    )}

                    <div className="flex justify-center mt-10 gap-x-40">
                        <button 
                            type="button"
                            onClick={() => navigate(-1)} 
                            className="bg-red-500 text-white font-bold px-6 py-2 rounded hover:bg-red-600 cursor-pointer"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600 cursor-pointer disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Verificando...' : 'Aceptar'}
                        </button>
                    </div>
                </form>
            </div>
        </>     
    )
}