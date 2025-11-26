import { useState } from "react";
import { crearJugador } from '../../services/jugadorService';
import { ImageUpload } from '../components/UI/ImageUpload';
import { AlertaPopUp } from '../components/UI/AlertaPopUp';

export default function AltaJugador({ equipoId, onClose }) {

  const [form, setForm] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    fechaNacimiento: "",
    numero: "",
    posicion: "",
    foto: null,
    fotoPreview: null,
  });

  const [showAlerta, setShowAlerta] = useState(false);
  const [alertaConfig, setAlertaConfig] = useState({
    title: '',
    message: '',
    type: 'error',
    errors: {}
  });

  const handleImageChange = (file, error, preview) => {
    if (error) {
      setAlertaConfig({
        title: "Error",
        message: error,
        type: "error",
        errors: {}
      });
      setShowAlerta(true);
      return;
    }

    setForm({
      ...form,
      foto: file,
      fotoPreview: preview
    });
  };

  const validar = () => {
    const errors = {};

    if (!form.nombre.trim()) errors.nombre = "El nombre es obligatorio";
    if (!form.apellidoPaterno.trim()) errors.apellidoPaterno = "El apellido paterno es obligatorio";
    if (!form.fechaNacimiento) errors.fechaNacimiento = "La fecha es obligatoria";
    if (!form.numero) errors.numero = "Número requerido";
    if (!form.posicion) errors.posicion = "Posición requerida";

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validar();
    if (Object.keys(errors).length > 0) {
      setAlertaConfig({
        title: 'Error de Validación',
        type: 'error',
        errors
      });
      setShowAlerta(true);
      return;
    }

    const jugador = {
      nombre: form.nombre,
      apellidoPaterno: form.apellidoPaterno,
      apellidoMaterno: form.apellidoMaterno || "N/A",
      fechaNacimiento: form.fechaNacimiento,
      numero: form.numero,
      posicion: form.posicion,
      foto: form.foto,
      equipoId
    };

    try {
      const result = await crearJugador(jugador);

      setAlertaConfig({
        title: 'Éxito',
        message: result.message,
        type: 'success'
      });
      setShowAlerta(true);

      setTimeout(() => onClose(), 1500);

    } catch (error) {
      setAlertaConfig({
        title: 'Error',
        message: error.message,
        type: 'error'
      });
      setShowAlerta(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-[1100px]">

          <h2 className="text-4xl font-bold text-center mb-6">
            Registro de Jugador
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-12">

            {/* Inputs */}
            <div className="space-y-5">

              <input
                name="nombre"
                value={form.nombre}
                onChange={e => setForm({ ...form, nombre: e.target.value })}
                placeholder="Nombre(s)"
                className="border p-3 rounded w-full"
              />

              <input
                name="apellidoPaterno"
                value={form.apellidoPaterno}
                onChange={e => setForm({ ...form, apellidoPaterno: e.target.value })}
                placeholder="Apellido Paterno"
                className="border p-3 rounded w-full"
              />

              <input
                name="apellidoMaterno"
                value={form.apellidoMaterno}
                onChange={e => setForm({ ...form, apellidoMaterno: e.target.value })}
                placeholder="Apellido Materno"
                className="border p-3 rounded w-full"
              />

              <input
                type="date"
                name="fechaNacimiento"
                value={form.fechaNacimiento}
                onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })}
                className="border p-3 rounded w-full"
              />

              <select
                name="posicion"
                value={form.posicion}
                onChange={e => setForm({ ...form, posicion: e.target.value })}
                className="border p-3 rounded w-full"
              >
                <option value="">Posición</option>
                <option value="P">Pitcher</option>
                <option value="C">Catcher</option>
                <option value="1B">Primera Base</option>
                <option value="2B">Segunda Base</option>
                <option value="3B">Tercera Base</option>
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
                value={form.numero}
                onChange={e => setForm({ ...form, numero: e.target.value })}
                placeholder="Número"
                className="border p-3 rounded w-full"
              />

            </div>

            {/* Upload component */}
            <div className="flex flex-col items-center justify-center">
              <ImageUpload
                label="Foto del jugador"
                name="foto"
                imagePreview={form.fotoPreview}
                onImageChange={handleImageChange}
                onImageRemove={() => setForm({ ...form, foto: null, fotoPreview: null })}
              />
            </div>

            <div className="col-span-2 flex justify-center gap-6 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 text-white px-6 py-2 rounded"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded"
              >
                Agregar
              </button>
            </div>

          </form>
        </div>
      </div>

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
