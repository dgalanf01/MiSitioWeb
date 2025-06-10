-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2025 a las 20:08:49
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `armas`
--

CREATE TABLE `armas` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `imagen` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `armas`
--

INSERT INTO `armas` (`id`, `nombre`, `imagen`) VALUES
(1, 'Artesana', 'imagenes/artesana.png'),
(2, 'Último Recurso', 'imagenes/ultimo_recurso.png'),
(3, 'Heroica', 'imagenes/heroica.png'),
(4, 'Acero Chocobo', 'imagenes/acero_chocobo.png'),
(5, 'Corazón de León', 'imagenes/corazon_de_leon.png'),
(6, 'Prometida', 'imagenes/prometida.png'),
(7, 'Estrella Fugaz', 'imagenes/estrella_fugaz.png'),
(8, 'Calabaza Macabra', 'imagenes/calabaza_macabra.png'),
(9, 'Recuerdos Lejanos', 'imagenes/recuerdos_lejanos.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos`
--

CREATE TABLE `juegos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos`
--

INSERT INTO `juegos` (`id`, `nombre`) VALUES
(1, 'Kingdom Hearts BbS'),
(2, 'Kingdom Hearts I'),
(3, 'Kingdom Hearts CoM'),
(4, 'Kingdom Hearts II'),
(5, 'Kingdom Hearts DDD'),
(6, 'Kingdom Hearts III');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juegos_mundos_armas`
--

CREATE TABLE `juegos_mundos_armas` (
  `juego_id` bigint(20) NOT NULL,
  `mundo_id` bigint(20) NOT NULL,
  `arma_id` bigint(20) NOT NULL,
  `fuerza` int(11) DEFAULT NULL,
  `magia` int(11) DEFAULT NULL,
  `obtencion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juegos_mundos_armas`
--

INSERT INTO `juegos_mundos_armas` (`juego_id`, `mundo_id`, `arma_id`, `fuerza`, `magia`, `obtencion`) VALUES
(2, 1, 6, 9, 1, 'Habla con Kairi en el Canal Secreto tras rescatarla.'),
(2, 1, 7, 5, 0, 'Cofre en la casa de Geppetto en Ciudad de Paso.'),
(2, 2, 2, 8, 2, 'Marca Trío blanca en el Bosque de lotos de el País de las Maravillas.'),
(2, 3, 1, 4, 2, 'Se desbloquea al completar Selva Profunda.'),
(2, 4, 3, 9, 0, 'Cofre en el vestíbulo del Coliseo del Olimpo, después de completar la Copa Fil, la Copa Pegaso y la Copa Hércules.'),
(2, 4, 4, 10, -1, 'Derrota a Cloud en la Copa Hércules.'),
(2, 4, 5, 10, 1, 'Derrota a León y Cloud en la Copa Hades.'),
(2, 5, 8, 7, 0, 'Sella la cerradura de Ciudad de Halloween.'),
(2, 6, 9, 11, -1, 'Cofre en el Gran Salón de Bastión Hueco.'),
(4, 1, 6, 7, 5, 'Se obtiene tras derrotar a Roxas.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mundos`
--

CREATE TABLE `mundos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mundos`
--

INSERT INTO `mundos` (`id`, `nombre`) VALUES
(1, 'Ciudad de Paso'),
(2, 'País de las maravillas'),
(3, 'Selva Profunda'),
(4, 'Coliseo del Olimpo'),
(5, 'Ciudad de Halloween'),
(6, 'Bastión Hueco');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sugerencias`
--

CREATE TABLE `sugerencias` (
  `id` bigint(20) NOT NULL,
  `id_usuario` bigint(20) NOT NULL,
  `contenido` text NOT NULL,
  `fecha` datetime DEFAULT current_timestamp(),
  `juego` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sugerencias`
--

INSERT INTO `sugerencias` (`id`, `id_usuario`, `contenido`, `fecha`, `juego`) VALUES
(2, 1, 'me mola el 3', '2025-06-02 01:50:43', 'kh3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` bigint(255) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `rol` varchar(255) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `rol`, `correo`, `password`) VALUES
(1, 'administrador', 'admin', 'dani@ejemplo.com', '$2y$10$BMd2DYW1U.ItYImCjGwx4.DSYSzNzrevRUjuKo.7lg7cDVWRQP2Ly'),
(6, 'Carmen', 'user', 'carmen@tutora.agora', '$2y$10$qFHU3bymoU/HhDkVeiF0pOKUfzrjvAzNO/5.ETMEYyvMq7oZcy2qa');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `armas`
--
ALTER TABLE `armas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juegos`
--
ALTER TABLE `juegos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `juegos_mundos_armas`
--
ALTER TABLE `juegos_mundos_armas`
  ADD PRIMARY KEY (`juego_id`,`mundo_id`,`arma_id`),
  ADD KEY `mundo_id` (`mundo_id`),
  ADD KEY `arma_id` (`arma_id`);

--
-- Indices de la tabla `mundos`
--
ALTER TABLE `mundos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `armas`
--
ALTER TABLE `armas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `juegos`
--
ALTER TABLE `juegos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `mundos`
--
ALTER TABLE `mundos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `juegos_mundos_armas`
--
ALTER TABLE `juegos_mundos_armas`
  ADD CONSTRAINT `juegos_mundos_armas_ibfk_1` FOREIGN KEY (`juego_id`) REFERENCES `juegos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `juegos_mundos_armas_ibfk_2` FOREIGN KEY (`mundo_id`) REFERENCES `mundos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `juegos_mundos_armas_ibfk_3` FOREIGN KEY (`arma_id`) REFERENCES `armas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `sugerencias`
--
ALTER TABLE `sugerencias`
  ADD CONSTRAINT `sugerencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
