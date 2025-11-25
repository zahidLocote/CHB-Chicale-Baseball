import { useState } from "react";
import defaultPlayer from '../assets/picture.jpg';
import { crearJugador } from '../../services/jugadorService';
import { AlertaPopUp } from '../components/UI/AlertaPopUp'

export default function AltaJugador({ equipoId, onClose }) {
  const [form, setForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    numero: "",
    posicion: "",
    foto: null,
  });

  // Estados para la alerta
  const [showAlerta, setShowAlerta] = useState(false);
  const [alertaConfig, setAlertaConfig] = useState({
    title: '',
    message: '',
    type: 'error',
    errors: {}
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const hayDatosLlenados = () => {
    return Object.values(form).some((valor) => {
      if (typeof valor === "string") return valor.trim() !== "";
      return valor !== null;
    });
  };

  const handleCancelar = () => {
    if (hayDatosLlenados()) {
      const confirmar = window.confirm("Hay datos llenados. ¿Seguro que deseas cancelar?");
      if (!confirmar) return;
    }
    onClose();
  };

  // Validar el formulario
  const validarFormulario = () => {
    const errores = {};

    if (!form.nombre.trim()) {
      errores.nombre = "El nombre es obligatorio";
    }

    if (!form.apellidoPaterno.trim()) {
      errores.apellidoPaterno = "El apellido paterno es obligatorio";
    }

    if (!form.fechaNacimiento) {
      errores.fechaNacimiento = "La fecha de nacimiento es obligatoria";
    }

    if (!form.numero || form.numero <= 0) {
      errores.numero = "El número debe ser mayor a 0";
    }

    if (!form.posicion) {
      errores.posicion = "La posición es obligatoria";
    }

    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario
    const errores = validarFormulario();
    
    if (Object.keys(errores).length > 0) {
      setAlertaConfig({
        title: 'Error de Validación',
        message: '',
        type: 'error',
        errors: errores
      });
      setShowAlerta(true);
      return;
    }

    const jugador = {
      nombre: form.nombre,
      apellidoPaterno: form.apellidoPaterno,
      apellidoMaterno: form.apellidoMaterno || "N/A",
      fechaNacimiento: form.fechaNacimiento,
      numero: parseInt(form.numero),
      posicion: form.posicion,
      foto: null,
      equipoId: equipoId
    };

    try {
      const result = await crearJugador(jugador);
      
      // Mostrar éxito
      setAlertaConfig({
        title: 'Éxito',
        message: result.message || 'Jugador registrado exitosamente',
        type: 'success',
        errors: {}
      });
      setShowAlerta(true);

      // Cerrar después de un breve delay
      setTimeout(() => {
        onClose();
      }, 1500);
      
    } catch (error) {
      console.error(error);
      
      // Mostrar error del servidor
      setAlertaConfig({
        title: 'Error',
        message: error.message || 'Error al registrar jugador. Por favor, intenta de nuevo.',
        type: 'error',
        errors: {}
      });
      setShowAlerta(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-[1200px] h-[720px]">
          <h2 style={{ fontFamily: 'MiFuente' }} className="text-4xl font-bold mb-6 text-center">
            Registro de Jugador
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-12 h-[520px]">
            <div className="space-y-5">
              <input 
                type="text" 
                name="nombre" 
                placeholder="Nombre(s)" 
                value={form.nombre}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg" 
              />
              <input 
                type="text" 
                name="apellidoPaterno" 
                placeholder="Apellido Paterno" 
                value={form.apellidoPaterno}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg" 
              />
              <input 
                type="text" 
                name="apellidoMaterno" 
                placeholder="Apellido Materno (Opcional)" 
                value={form.apellidoMaterno}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg" 
              />
              <input 
                type="date" 
                name="fechaNacimiento" 
                value={form.fechaNacimiento}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg" 
              />
              <select 
                name="posicion" 
                value={form.posicion}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg"
              >
                <option value="">Posición</option>
                <option value="P">Pitcher</option>
                <option value="C">Catcher</option>
                <option value="PrimeraBase">Primera Base</option>
                <option value="SegundaBase">Segunda Base</option>
                <option value="TerceraBase">Tercera Base</option>
                <option value="SS">Shortstop</option>
                <option value="LF">Jardinero Izquierdo</option>
                <option value="CF">Jardinero Central</option>
                <option value="RF">Jardinero Derecho</option>
                <option value="DH">Bateador Designado</option>
                <option value="SUB">Suplente</option>
              </select>
              <input 
                type="number" 
                name="numero" 
                placeholder="Número" 
                value={form.numero}
                onChange={handleChange} 
                className="border py-4 px-3 rounded w-[600px] text-lg" 
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-100 h-[420px] border-2 border-gray-300 flex items-center justify-center overflow-hidden bg-gray-100 rounded-md">
                <img 
                  src={form.foto ? URL.createObjectURL(form.foto) : defaultPlayer} 
                  alt="preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <label className="mt-4 cursor-pointer bg-gray-200 px-4 py-2 rounded shadow flex items-center gap-2 text-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                Subir Foto
                <input 
                  type="file" 
                  name="foto" 
                  accept="image/*" 
                  onChange={handleChange} 
                  className="hidden" 
                />
              </label>

              <div className="flex gap-6 mt-8 justify-center">
                <button 
                  type="button" 
                  onClick={handleCancelar} 
                  className="bg-red-600 text-white px-8 py-4 rounded shadow text-xl"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="bg-green-600 text-white px-8 py-4 rounded shadow text-xl"
                >
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Alerta PopUp */}
      <AlertaPopUp
        show={showAlerta}
        onClose={() => setShowAlerta(false)}
        title={alertaConfig.title}
        message={alertaConfig.message}
        type={alertaConfig.type}
        errors={alertaConfig.errors}
      />
    </>
  );
}