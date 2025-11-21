import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { obtenerJugadorPorId, editarJugador } from '../../services/jugadorService';
import placeholderfoto from '../assets/placeholderfoto.jpg';

export default function EditarJugador() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jugador, setJugador] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    numero: '',
    posicion: '',
    foto: ''
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    obtenerJugadorPorId(id)
      .then(data => {
        setJugador({
          nombre: data.nombre || '',
          apellidoPaterno: data.apellidoPaterno || '',
          apellidoMaterno: data.apellidoMaterno || '',
          fechaNacimiento: data.fechaNacimiento?.slice(0, 10) || '',
          numero: data.numero?.toString() || '',
          posicion: data.posicion || '',
          foto: data.foto || ''
        });
      })
      .catch(error => console.error('Error al cargar jugador:', error));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setJugador(prev => ({ ...prev, [name]: value }));
  };

  const handleRemoveFoto = () => {
    setJugador(prev => ({ ...prev, foto: '' }));
  };

  const validar = () => {
    const nuevosErrores = {};
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!jugador.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (!soloLetras.test(jugador.nombre)) {
      nuevosErrores.nombre = 'Solo se permiten letras y espacios';
    }

    if (!jugador.apellidoPaterno.trim()) {
      nuevosErrores.apellidoPaterno = 'El apellido paterno es obligatorio';
    } else if (!soloLetras.test(jugador.apellidoPaterno)) {
      nuevosErrores.apellidoPaterno = 'Solo se permiten letras y espacios';
    }

    if (jugador.apellidoMaterno && !soloLetras.test(jugador.apellidoMaterno)) {
      nuevosErrores.apellidoMaterno = 'Solo se permiten letras y espacios';
    }

    if (!jugador.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    } else {
      const fecha = new Date(jugador.fechaNacimiento);
      const hoy = new Date();
      if (fecha > hoy) {
        nuevosErrores.fechaNacimiento = 'La fecha no puede ser futura';
      }
    }

    if (!jugador.numero || isNaN(jugador.numero)) {
      nuevosErrores.numero = 'El número debe ser válido';
    } else if (parseInt(jugador.numero) < 1 || parseInt(jugador.numero) > 99) {
      nuevosErrores.numero = 'Debe estar entre 1 y 99';
    }

    if (!jugador.posicion) {
      nuevosErrores.posicion = 'Selecciona una posición';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validar()) return;

    try {
      const formData = new FormData();

      // Agregar cada campo del jugador
      Object.keys(jugador).forEach(key => {
        if (key !== "foto") {
          formData.append(key, jugador[key]);
        }
      });

      // Si el usuario subió un archivo nuevo
      if (jugador.foto instanceof File) {
        formData.append("foto", jugador.foto);
      }

      await editarJugador(id, formData);

      alert("Jugador actualizado correctamente");
      navigate(`/jugador/${id}`);

    } catch (error) {
      console.error(error);
      alert("Error al actualizar jugador");
    }
  };

  const fotoPreview = jugador.foto ? `/uploads/${jugador.foto}` : placeholderfoto;

  const opcionesPosicion = [
    { value: 'P', label: 'Pitcher' },
    { value: 'C', label: 'Catcher' },
    { value: 'PrimeraBase', label: 'Primera Base' },
    { value: 'SegundaBase', label: 'Segunda Base' },
    { value: 'TerceraBase', label: 'Tercera Base' },
    { value: 'SS', label: 'Shortstop' },
    { value: 'LF', label: 'Jardinero Izquierdo' },
    { value: 'CF', label: 'Jardinero Central' },
    { value: 'RF', label: 'Jardinero Derecho' },
    { value: 'DH', label: 'Bateador Designado' },
    { value: 'SUB', label: 'Suplente' },
  ];

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Editar Jugador</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={fotoPreview}
          alt="Foto del jugador"
          className="w-32 h-32 object-cover rounded-full shadow mb-2"
        />
        {jugador.foto && (
          <button
            type="button"
            onClick={handleRemoveFoto}
            className="text-red-600 hover:underline text-sm"
          >
            Quitar foto
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="nombre"
            value={jugador.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full border px-4 py-2 rounded"
          />
          {errores.nombre && <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>}
        </div>

        <div>
          <input
            type="text"
            name="apellidoPaterno"
            value={jugador.apellidoPaterno}
            onChange={handleChange}
            placeholder="Apellido Paterno"
            className="w-full border px-4 py-2 rounded"
          />
          {errores.apellidoPaterno && <p className="text-red-500 text-sm mt-1">{errores.apellidoPaterno}</p>}
        </div>

        <div>
          <input
            type="text"
            name="apellidoMaterno"
            value={jugador.apellidoMaterno}
            onChange={handleChange}
            placeholder="Apellido Materno"
            className="w-full border px-4 py-2 rounded"
          />
          {errores.apellidoMaterno && <p className="text-red-500 text-sm mt-1">{errores.apellidoMaterno}</p>}
        </div>

        <div>
          <input
            type="date"
            name="fechaNacimiento"
            value={jugador.fechaNacimiento}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          {errores.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errores.fechaNacimiento}</p>}
        </div>

        <div>
          <input
            type="number"
            name="numero"
            value={jugador.numero}
            onChange={handleChange}
            placeholder="Número"
            className="w-full border px-4 py-2 rounded"
          />
          {errores.numero && <p className="text-red-500 text-sm mt-1">{errores.numero}</p>}
        </div>

        <div>
          <select
            name="posicion"
            value={jugador.posicion}
            onChange={handleChange}
            className="border py-3 px-4 rounded w-full text-lg"
          >
            <option value="">Selecciona una posición</option>
            {opcionesPosicion.map(op => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
          {errores.posicion && <p className="text-red-500 text-sm mt-1">{errores.posicion}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
