import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'


dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Registro de partidos
app.post('/partido', async (req, res) =>{
    try{
        const {fecha, lugar,hora, equipoId1,equipoId2,equipoNombre1,equipoNombre2} = req.body

        const nuevoPartido = await prisma.partido.create({
            data: {
                fecha,
                lugar,
                hora,
                equipoId1,
                equipoId2,
                equipoNombre1,
                equipoNombre2
            }
        })

        res.json({
            succes: true,
            message: 'Partido registrado correctamente.',
            data: nuevoPartido
        })

    }catch (error) {
        console.error('Error al crear partido:', error)
        res.status(500).json({ 
            error: 'Error al registrar el partido',
            details: error.message 
        })
    }

})

app.listen(3001, () => console.log('Servidor corriendo en puerto 3001'))