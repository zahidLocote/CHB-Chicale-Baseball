-- Insertar jugadores (2 por equipo)

-- Equipo 1: Lomas Altas
INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Carlos', 'Martinez', 'Lopez', '2000-05-14 00:00:00.000', 10, 'RF', 1);

INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Luis', 'Hernandez', 'Gomez', '1999-08-22 00:00:00.000', 4, 'TerceraBase', 1);

-- Equipo 2: Solidaridad
INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Jorge', 'Rodriguez', 'Perez', '2001-03-10 00:00:00.000', 1, 'P', 2);

INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Andres', 'Sanchez', 'Diaz', '2002-11-05 00:00:00.000', 8, 'SegundaBase', 2);

-- Equipo 3: Aguilas Mexicali
INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Miguel', 'Ramirez', 'Torres', '1998-01-30 00:00:00.000', 7, 'CF', 3);

INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Alejandro', 'Flores', 'Cruz', '2000-07-19 00:00:00.000', 6, 'SS', 3);

-- Equipo 4: Naranjeros
INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Fernando', 'Garcia', 'Morales', '1997-12-12 00:00:00.000', 9, 'LF', 4);

INSERT IGNORE INTO `jugador` (`nombre`, `apellidoPaterno`, `apellidoMaterno`, `fechaNacimiento`, `numero`, `posicion`, `equipoId`) VALUES
('Ricardo', 'Vazquez', 'Reyes', '2001-04-25 00:00:00.000', 2, 'C', 4);
