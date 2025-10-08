import React, { useState, useEffect } from "react";
import { Header } from "../components/UI/Header";
import { useParams, useNavigate } from "react-router-dom";

export const EdicionJugador = () => {
  const { id } = useParams(); // recibe el ID del jugador desde la URL
  const navigate = useNavigate(); // para volver atrás o navegar

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [posicion, setPosicion] = useState("");
  const [NumeroCamiseta, setNumeroCamiseta] = useState("");

  useEffect(() => {
    console.log("Editar jugador con ID:", id);
    // Datos simulados
    setNombreCompleto("Nombre del jugador " + id);
    setCategoria("Juvenil");
    setFechaNacimiento("--/--/----");
    setPosicion("Posición del jugador");
    setNumeroCamiseta("Número de Camiseta del jugador");
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // ⚠️ Ventana de confirmación antes de guardar
    const confirmar = window.confirm("¿Deseas guardar los cambios del jugador?");
    if (!confirmar) {
      return; // si el usuario cancela, no se guarda
    }

    console.log({
      id,
      nombreCompleto,
      categoria,
      fechaNacimiento,
      posicion,
      NumeroCamiseta,
    });

    // Aquí puedes agregar tu lógica para enviar los cambios al backend

    alert("Los cambios del jugador se han guardado correctamente ✅");
    navigate("/"); // Redirige a InfoEquipo después de guardar
  };

  const handleCancelar = () => {
    const confirmar = window.confirm("¿Seguro que deseas cancelar la edición?");
    if (confirmar) {
      navigate("/"); // Regresa a InfoEquipo
    }
  };

  return (
    <div>
      <Header />

      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6">
          Editar Información del Jugador
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nombre Completo:</label>
            <input
              type="text"
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Selecciona una categoría --</option>
              <option value="Infantil">Infantil</option>
              <option value="Juvenil">Juvenil</option>
              <option value="Adultos">Adultos</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Fecha nacimiento:</label>
            <input
              type="text"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Posición:</label>
            <input
              type="text"
              value={posicion}
              onChange={(e) => setPosicion(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Número camiseta:</label>
            <input
              type="text"
              value={NumeroCamiseta}
              onChange={(e) => setNumeroCamiseta(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>

          {/* Botones alineados */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="submit"
              className="bg-red-900 text-white px-5 py-2 rounded hover:bg-red-800 transition"
            >
              Guardar cambios
            </button>

            <button
              type="button"
              onClick={handleCancelar}
              className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
