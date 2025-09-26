
export const Header = () =>{
    return(
        <header className="bg-red-900 p-4">
            <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
                <a className="block text-teal-500" href="#">
  
                    <span className="sr-only">Home</span>
                    <img 
                        src="../../public/logo.png" 
                        alt="Logo" 
                        className="h-23 w-auto"
                    />
                </a>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      <nav aria-label="Global" className="hidden md:block">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> About </a>
          </li>

          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> Careers </a>
          </li>

          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> History </a>
          </li>

          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> Services </a>
          </li>

          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> Projects </a>
          </li>

          <li>
            <a className="text-white text-lg transition hover:text-red-200" href="#"> Blog </a>
          </li>
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <a
            className="block rounded-md bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-gray-200"
            href="#"
          >
            Iniciar sesion
          </a>

          <a
            className="hidden rounded-md bg-red-200 px-5 py-2.5 text-sm font-medium text-black transition hover:text-gray-600/75 sm:block"
            href="#"
          >
            Registrar
          </a>
        </div>

        <button
          className="block rounded-sm bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
        >
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</header>
    )
}