import React, { useState } from "react";
import { Header } from "../components/UI/Header";
import { useNavigate } from "react-router-dom";

export const InfoEquipo = () => {
  const navigate = useNavigate();

  const [jugadores, setJugadores] = useState([
    { id: 1, nombre: "Juan Pérez", fechaNacimiento: "2010-05-12", posicion: "Delantero", NumeroCamiseta: "09" },
    { id: 2, nombre: "Luis Gómez", fechaNacimiento: "2009-11-23", posicion: "Portero", NumeroCamiseta: "22" },
    { id: 3, nombre: "Carlos Ruiz", fechaNacimiento: "2011-02-17", posicion: "Defensa", NumeroCamiseta: "02" },
  ]);

  const handleEditar = (id) => {
    navigate(`/editar/${id}`);
  };

  const handleVer = (id) => {
    navigate(`/jugador/${id}`);
  };

  return (
    <div>
      <Header />

      <div className="mt-10 max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Jugadores del equipo</h2>

        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Nombre</th>
              <th className="border border-gray-300 px-4 py-2">Fecha de nacimiento</th>
              <th className="border border-gray-300 px-4 py-2">Posición</th>
              <th className="border border-gray-300 px-4 py-2">Número camiseta</th>
              <th className="border border-gray-300 px-4 py-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {jugadores.map((jugador) => (
              <tr key={jugador.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{jugador.id}</td>
                <td className="border border-gray-300 px-4 py-2">{jugador.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{jugador.fechaNacimiento}</td>
                <td className="border border-gray-300 px-4 py-2">{jugador.posicion}</td>
                <td className="border border-gray-300 px-4 py-2">{jugador.NumeroCamiseta}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleVer(jugador.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800 mr-2"
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => handleEditar(jugador.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-800 mr-2"
                  >
                    Editar
                  </button>
                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
