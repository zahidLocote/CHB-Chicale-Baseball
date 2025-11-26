import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(() => {
        // Inicializar el estado directamente desde sessionStorage
        const adminGuardado = sessionStorage.getItem('admin');
        if (adminGuardado) {
            try {
                return JSON.parse(adminGuardado);
            } catch (error) {
                console.error('Error al recuperar sesión:', error);
                sessionStorage.removeItem('admin');
                return null;
            }
        }
        return null;
    });

    const login = (datosUsuario) => {
        setUsuario(datosUsuario);
        sessionStorage.setItem('admin', JSON.stringify(datosUsuario));
    };

    const logout = () => {
        setUsuario(null);
        sessionStorage.removeItem('admin');
    };

    // Función para refrescar el estado desde sessionStorage
    const refreshAuth = () => {
        const adminGuardado = sessionStorage.getItem('admin');
        if (adminGuardado) {
            try {
                const adminData = JSON.parse(adminGuardado);
                setUsuario(adminData);
            } catch (error) {
                console.error('Error al recuperar sesión:', error);
                sessionStorage.removeItem('admin');
                setUsuario(null);
            }
        } else {
            setUsuario(null);
        }
    };

    // Verificar si el usuario tiene rol de admin
    const esAdmin = Boolean(usuario && usuario.rol === "admin");

    return (
        <AuthContext.Provider value={{ usuario, login, logout, esAdmin, refreshAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
}