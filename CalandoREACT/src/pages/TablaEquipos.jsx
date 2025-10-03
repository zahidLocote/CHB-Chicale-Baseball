import placeholderfoto from "../assets/placeholderfoto.jpg";
export default function TablaEquipos({ equipos }){
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {equipos.map((equipo, index) => (
                <div key={index} className='bg-white shadow-md rounded p-4 flex flex-col items-center'>
                    <img
                        src={equipo.logo ? '/uploads/${equipo.logo}' : placeholderfoto}
                        alt={equipo.nombre}
                        className='h-24 w-24 object-cover rounded-full mb-2'
                    />
                    <h2 className='text-lg font-semibold text-center'>{equipo.nombre}</h2>
                </div>
            ))}
        </div>
    )
}