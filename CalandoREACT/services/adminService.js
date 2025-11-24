const BASE_URL = 'http://localhost:3001/api/admin';

export async function verificarCredenciales(usuario, contrasena) {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario, contrasena })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error al iniciar sesión');
        }

        return data;
    } catch (error) {
        console.error('Error en verificarCredenciales:', error);
        throw error;
    }
}