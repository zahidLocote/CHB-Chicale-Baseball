-- Insertar Ligas
INSERT IGNORE INTO `Liga` (`id`, `nombreLiga`, `edad_min`, `edad_max`, `categoria`, `nombrePresidente`, `contactoPresidente`) 
VALUES (1, 'Liga Pacifica Mexicana', 20, 25, 'Juvenil', 'Hector Francisco Ibarra', '6863836645');

INSERT IGNORE INTO `Liga` (`id`, `nombreLiga`, `edad_min`, `edad_max`, `categoria`, `nombrePresidente`, `contactoPresidente`) 
VALUES (2, 'Liga Mayor de BaseBall', 25, 28, 'Profesional', 'Jesus Alonso Espinoza', '6861551258');

-- Insertar Equipos para Liga Pacifica Mexicana (id=1)
INSERT IGNORE INTO `equipo` (`id`, `nombre`, `entrenador`, `ligaId`) 
VALUES (1, 'Lomas Altas', 'Benjamin Bravo', 1);

INSERT IGNORE INTO `equipo` (`id`, `nombre`, `entrenador`, `ligaId`) 
VALUES (2, 'solidaridad', 'Hector Orozco', 1);

-- Insertar Equipos para Liga Mayor de BaseBall (id=2)
INSERT IGNORE INTO `equipo` (`id`, `nombre`, `entrenador`, `ligaId`) 
VALUES (3, 'Aguilas Mexicali', 'Marco Flores', 2);

INSERT IGNORE INTO `equipo` (`id`, `nombre`, `entrenador`, `ligaId`) 
VALUES (4, 'Naranjeros', 'Mauricio Palafox', 2);
