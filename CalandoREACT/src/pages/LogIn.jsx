import { useNavigate } from 'react-router-dom';

export default function LogIn(){
    const navigate = useNavigate();
    return(
        <>
            <img src="../../public/loginBanner.png" alt="fotoLogin" className="w-150 h-177 float-left"/>
            <div className="absolute top-30 left-210">
                <h1 className="text-6xl font-bold">Iniciar sesión</h1>
                <div className="mt-15">
                    <h1 className="text-xl font-bold">Ingrese su nombre de usuario:</h1>
                    <input type="text" name="usuario" placeholder=" Usuario" className="bg-gray-200 w-90 h-10 font-xl rounded-l placeholder:font-bold placeholder:text-gray-500" />

                    <h1 className="text-xl font-bold mt-15">Ingrese su contraseña:</h1>
                    <input type="text" name="usuario" placeholder=" Contraseña" className="bg-gray-200 w-90 h-10 font-xl rounded-l placeholder:font-bold placeholder:text-gray-500" />

                    <div className="flex justify-center mt-10 gap-x-40">
                        <button  onClick={() => navigate(-1)} className="bg-red-500 text-white font-bold px-6 py-2 rounded hover:bg-red-600 cursor-pointer">
                            Cancelar
                        </button>
                        <button className="bg-blue-500 text-white font-bold px-6 py-2 rounded hover:bg-blue-600 cursor-pointer">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}