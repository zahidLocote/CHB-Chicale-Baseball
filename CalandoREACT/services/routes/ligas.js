import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();
const router = express.Router();

// Multer
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const cleanName = file.originalname.replace(/\s+/g, "_");
        cb(null, Date.now() + "-" + cleanName);
    },
});

const upload = multer({ storage });

//Crear liga
router.post("/", upload.single("logo"), async (req, res) => {
    try {
        const {
            nombreLiga,
            edadMin,
            edadMax,
            categoria,
            nombrePresidente,
            contactoPresidente,
        } = req.body;

        const nueva = await prisma.liga.create({
            data: {
                nombreLiga,
                edad_min: Number(edadMin),
                edad_max: Number(edadMax),
                categoria,
                nombrePresidente,
                contactoPresidente,
                logo: req.file ? req.file.filename : null,
            },
        });

        res.json(nueva);
    } catch (error) {
        console.error("Error creando liga:", error);
        res.status(500).json({ error: "Error creando liga" });
    }
});
// Obtener todas las ligas
router.get("/", async (req, res) => {
    const ligas = await prisma.liga.findMany();
    res.json(ligas);
});
// Obtener por id
router.get("/:id", async (req, res) => {
    const liga = await prisma.liga.findUnique({
        where: { id: Number(req.params.id) },
    });

    if (!liga) return res.status(404).json({ error: "Liga no encontrada" });

    res.json(liga);
});
// Editar liga
router.put("/:id", upload.single("logo"), async (req, res) => {
    const id = Number(req.params.id);

    try {
        const ligaOriginal = await prisma.liga.findUnique({
            where: { id },
        });

        if (!ligaOriginal)
            return res.status(404).json({ error: "Liga no encontrada" });

        let nuevoLogo = ligaOriginal.logo;

        // Si se subió un nuevo archivo
        if (req.file) {
            nuevoLogo = req.file.filename;

            // Borrar logo anterior si existe
            if (ligaOriginal.logo) {
                const pathLogo = path.join("uploads", ligaOriginal.logo);
                if (fs.existsSync(pathLogo)) fs.unlinkSync(pathLogo);
            }
        }

        // Actualizar en BD
        const editada = await prisma.liga.update({
            where: { id },
            data: {
                nombreLiga: req.body.nombreLiga,
                edad_min: Number(req.body.edadMin),
                edad_max: Number(req.body.edadMax),
                categoria: req.body.categoria,
                nombrePresidente: req.body.nombrePresidente,
                contactoPresidente: req.body.contactoPresidente,
                logo: nuevoLogo,
            },
        });

        res.json(editada);
    } catch (error) {
        console.error("Error editando liga:", error);
        res.status(500).json({ error: "No se pudo editar la liga" });
    }
});
// Eliminar liga
router.delete("/:id", async (req, res) => {
    const id = Number(req.params.id);

    try {
        const liga = await prisma.liga.findUnique({ where: { id } });

        if (!liga)
            return res.status(404).json({ error: "Liga no encontrada" });

        // Borrar imagen física
        if (liga.logo) {
            const rutaLogo = path.join("uploads", liga.logo);
            if (fs.existsSync(rutaLogo)) fs.unlinkSync(rutaLogo);
        }

        // Borrar registro en BD
        await prisma.liga.delete({
            where: { id },
        });

        res.json({ mensaje: "Liga eliminada correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar liga" });
    }
});

export default router;