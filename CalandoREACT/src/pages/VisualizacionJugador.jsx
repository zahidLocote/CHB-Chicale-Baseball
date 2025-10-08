// src/pages/VisualizacionJugador.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/UI/Header";

export const VisualizacionJugador = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jugador, setJugador] = useState(null);

  useEffect(() => {
    // Simula la carga de datos (más adelante puedes conectar una API)
    const datosSimulados = {
      1: { nombre: "Juan Pérez", fechaNacimiento: "2010-05-12", posicion: "Delantero", NumeroCamiseta: "09" },
      2: { nombre: "Luis Gómez", fechaNacimiento: "2009-11-23", posicion: "Portero", NumeroCamiseta: "22" },
      3: { nombre: "Carlos Ruiz", fechaNacimiento: "2011-02-17", posicion: "Defensa", NumeroCamiseta: "02" },
    };

    setJugador(datosSimulados[id]);
  }, [id]);

  if (!jugador) {
    return <div className="text-center mt-10">Cargando datos del jugador...</div>;
  }

  return (
    <div>
      <Header />

      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Información del Jugador</h2>

        <p><strong>Nombre:</strong> {jugador.nombre}</p>
        <p><strong>Fecha de nacimiento:</strong> {jugador.fechaNacimiento}</p>
        <p><strong>Posición:</strong> {jugador.posicion}</p>
        <p><strong>Número de camiseta:</strong> {jugador.NumeroCamiseta}</p>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}
            className="bg-red-900 text-white px-4 py-2 rounded hover:bg-red-800 transition"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
};
