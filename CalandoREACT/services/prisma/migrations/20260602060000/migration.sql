-- Insertar jugadores para Los Diablos Rojos (equipoId 6) en la Liga Mayor de BaseBall

-- Jugador 1: Roberto Osuna
INSERT IGNORE INTO `jugador` (
    `nombre`,
    `apellidoPaterno`,
    `apellidoMaterno`,
    `fechaNacimiento`,
    `numero`,
    `posicion`,
    `foto`,
    `equipoId`
) VALUES (
    'Roberto',
    'Osuna',
    'Quintero',
    '1995-02-07 00:00:00.000',
    54,
    'P',
    '17803761234-roberto.png',
    6
);

-- Jugador 2: Japhet Amador
INSERT IGNORE INTO `jugador` (
    `nombre`,
    `apellidoPaterno`,
    `apellidoMaterno`,
    `fechaNacimiento`,
    `numero`,
    `posicion`,
    `foto`,
    `equipoId`
) VALUES (
    'Japhet',
    'Amador',
    'Lopez',
    '1987-01-19 00:00:00.000',
    7,
    'PrimeraBase',
    '17803765678-japhet.png',
    6
);
