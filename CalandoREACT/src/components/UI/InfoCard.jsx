import placeholderfoto from "../../assets/placeholderfoto.jpg"
export default function InfoCard({ data }) {
  const esLiga = data.nombreLiga !== undefined
  const esEquipo = data.nombre !== undefined

  const nombre = esLiga ? data.nombreLiga : data.nombre
  const id = data.id
    const logo = data.logo ? `/uploads/${data.logo}` : placeholderfoto

  return (
    <div className="mt-5 w-70 border border-gray-400 rounded-4xl p-7 bg-white shadow-xl">
      <h1 className="text-xl text-gray-400">ID: 000{id}</h1>

      <img
        src={logo}
        alt={nombre}
        className="w-30 mx-auto"
      />

      <h2 className="text-xl text-center font-bold mb-1">{nombre}</h2>

      <div className="flex justify-between">
        <button className="bg-blue-300 text-blue-500 font-bold px-4 py-2 rounded-xl hover:bg-blue-200">
          Editar
        </button>
        <button className="bg-red-300 text-red-500 font-bold px-4 py-2 rounded-xl hover:bg-red-200">
          Eliminar
        </button>
      </div>
    </div>
  )
}