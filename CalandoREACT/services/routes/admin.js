import express from 'express';
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Validar que se envíen los datos
        if (!usuario || !contrasena) {
            return res.status(400).json({ 
                success: false, 
                message: 'Usuario y contraseña son requeridos' 
            });
        }

        // Buscar el usuario en la base de datos
        const admin = await prisma.administrador.findUnique({
            where: { usuario: usuario }
        });

        // Verificar si el usuario existe
        if (!admin) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }
                const passwordMatch = contrasena === admin.password;

        if (!passwordMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Credenciales inválidas' 
            });
        }

        // Login exitoso
        res.json({ 
            success: true, 
            message: 'Login exitoso',
            admin: {
                id: admin.id,
                usuario: admin.usuario,
                rol: "admin"   // <<<<<<<<<<<<<< AÑADIR ESTO
            }
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error en el servidor' 
        });
    }
});

export default router;