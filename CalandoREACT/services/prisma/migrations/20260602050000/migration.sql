-- Insertar partidos pasados (1 por liga, ya finalizados)

-- Partido pasado para la Liga 1: Solidaridad vs Lomas Altas
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
    '2026-05-10 00:00:00.000', 
    'Estadio Solidaridad', 
    '18:00', 
    'FINALIZADO', 
    2, 
    1, 
    'Solidaridad', 
    'Lomas Altas', 
    5, 
    3, 
    1
);

-- Partido pasado para la Liga 2: Naranjeros vs Aguilas Mexicali
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
    '2026-05-12 00:00:00.000', 
    'Estadio Naranjeros', 
    '17:00', 
    'FINALIZADO', 
    4, 
    3, 
    'Naranjeros', 
    'Aguilas Mexicali', 
    2, 
    7, 
    2
);
