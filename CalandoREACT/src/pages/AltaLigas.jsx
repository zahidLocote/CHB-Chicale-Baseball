import { Header } from '../components/UI/Header'

export default function AltaJugador() {
  return (
    <>
    {/*<Header></Header>*/}
    <div className="p-6">
      <h1 className="text-2xl font-bold">Alta de Liga</h1>
      <form className="mt-4 space-y-3">
        <input
          type="text"
          placeholder="Nombre del jugador"
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          placeholder="Edad"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Guardar
        </button>
      </form>
    </div>
    </>
  );
}
