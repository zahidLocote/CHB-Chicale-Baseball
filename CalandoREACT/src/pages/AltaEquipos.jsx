import { useState, useEffect } from 'react'
import PictureBox from '../components/UI/PictureBox'
export default function AltaEquipos() {
    const [nombre, setNombre] = useState('')
    const [entrenador, setEntrenador] = useState('')
    const [ligaId, setLigaId] = useState('')
    const [ligas, setLigas] = useState([])
    const [logo, setLogo] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/ligas')
            .then(res => res.json())
            .then(data => setLigas(data))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const equipo = {
            nombre,
            entrenador,
            ligaId: Number(ligaId),
            logo: logo ? logo.name : null
        }

        await fetch('/api/equipos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipo),
        })
    }

    return (
        <>
            <div className="p-6 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Registro Equipo</h1>

                <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                    <div className="flex flex-row gap-6">
                        {/* Campos de texto */}
                        <div className="flex-1 space-y-4">
                            <input
                                type="text"
                                placeholder="Nombre de Equipo"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                className="border p-2 w-full rounded text-center placeholder:text-center max-w-sm"
                            />
                            <input
                                type="text"
                                placeholder="Entrenador"
                                value={entrenador}
                                onChange={(e) => setEntrenador(e.target.value)}
                                className="border p-2 w-full rounded text-center placeholder:text-center max-w-sm"
                            />
                            <select value={ligaId} onChange={e => setLigaId(Number(e.target.value))}>
                                <option value="">Selecciona una liga</option>
                                {ligas.map(l => (
                                    <option key={l.id} value={l.id}>{l.nombre}</option>
                                ))}
                            </select>
                        </div>

                        {/* PictureBox */}
                        <div className="flex flex-col items-center space-y-2 pt-1">
                            <PictureBox editable={true} onImageChange={(file) => setLogo(file)} />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-pink-700"
                        >
                            CANCELAR
                        </button>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
                        >
                            ACEPTAR
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
