-- Insertar partidos (1 por liga)

-- Partido para la Liga 1: Lomas Altas vs Solidaridad
INSERT IGNORE INTO `Partido` (
    `fecha`, 
    `lugar`, 
    `hora`, 
    `estado`, 
    `equipoId1`, 
    `equipoId2`, 
    `equipoNombre1`, 
    `equipoNombre2`, 
    `score1`, 
    `score2`, 
    `ligaId`
) VALUES (
    '2026-06-15 00:00:00.000', 
    'Estadio Lomas Altas', 
    '19:00', 
    'PROGRAMADO', 
    1, 
    2, 
    'Lomas Altas', 
    'Solidaridad', 
    0, 
    0, 
    1
);

-- Partido para la Liga 2: Aguilas Mexicali vs Naranjeros
INSERT IGNORE INTO `Partido` (
    `fecha`, 
    `lugar`, 
    `hora`, 
    `estado`, 
    `equipoId1`, 
    `equipoId2`, 
    `equipoNombre1`, 
    `equipoNombre2`, 
    `score1`, 
    `score2`, 
    `ligaId`
) VALUES (
    '2026-06-16 00:00:00.000', 
    'Nido de los Aguilas', 
    '20:00', 
    'PROGRAMADO', 
    3, 
    4, 
    'Aguilas Mexicali', 
    'Naranjeros', 
    0, 
    0, 
    2
);
