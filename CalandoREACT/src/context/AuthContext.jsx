import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

export function AuthProvider({ children }){
    const [usuario, setUsuario] = useState(null)

    const login = (datosUsuario) => setUsuario(datosUsuario)
    const logout = () => setUsuario(null)
    const esAdmin = usuario?.rol === 'admin'

    return(
        <AuthContext.Provider value={{ usuario, login, logout, esAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}
export function useAuth(){
    return useContext(AuthContext)
}