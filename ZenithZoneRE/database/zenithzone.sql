-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2024 a las 20:36:27
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
-- Base de datos: `zenithzone`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `activity`
--

CREATE TABLE `activity` (
  `code_act` int(11) NOT NULL,
  `name_act` varchar(255) DEFAULT NULL,
  `img_act` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `activity`
--

INSERT INTO `activity` (`code_act`, `name_act`, `img_act`) VALUES
(1, 'Ballet', 'view/img/activity/act_ballet.webp'),
(2, 'HipHop', 'view/img/activity/act_hip.webp'),
(3, 'Pilates', 'view/img/activity/act_pilates.webp'),
(4, 'Salon', 'view/img/activity/act_salon.webp'),
(5, 'Yoga', 'view/img/activity/act_yoga.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `code_cat` int(11) NOT NULL,
  `name_cat` varchar(255) DEFAULT NULL,
  `img_cat` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`code_cat`, `name_cat`, `img_cat`) VALUES
(1, 'FOR SALE', 'view/img/category/cat_sale.png'),
(2, 'FOR RENT', 'view/img/category/cat_rent.png'),
(3, 'FOR SHARE', 'view/img/category/cat_share.png'),
(4, 'A ROOM', 'view/img/category/cat_room.png'),
(5, 'NEW BUILD', 'view/img/category/cat_new.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `city`
--

CREATE TABLE `city` (
  `code_city` int(11) NOT NULL,
  `name_city` varchar(255) DEFAULT NULL,
  `img_city` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `city`
--

INSERT INTO `city` (`code_city`, `name_city`, `img_city`) VALUES
(1, 'Valencia', 'view/img/city/city_valencia.webp'),
(2, 'Alicante', 'view/img/city/city_alicante.webp'),
(3, 'Madrid', 'view/img/city/city_madrid.webp'),
(4, 'Barcelona', 'view/img/city/city_barcelona.webp'),
(5, 'Sevilla', 'view/img/city/city_sevilla.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `exceptions`
--

CREATE TABLE `exceptions` (
  `type_error` int(10) NOT NULL,
  `place` varchar(100) NOT NULL,
  `current_date_time` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extra`
--

CREATE TABLE `extra` (
  `code_extra` int(11) NOT NULL,
  `name_extra` varchar(255) DEFAULT NULL,
  `img_extra` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `extra`
--

INSERT INTO `extra` (`code_extra`, `name_extra`, `img_extra`) VALUES
(1, 'Pool', 'view/img/extra/extra_pool.webp'),
(2, 'Garden', 'view/img/extra/extra_garden.webp'),
(3, 'Terrace', 'view/img/extra/extra_terrace.webp'),
(4, 'Balcony', 'view/img/extra/extra_balcony.webp'),
(5, 'Storage', 'view/img/extra/extra_storage.webp'),
(6, 'Empty', 'view/img/extra/extra_empty.webp'),
(7, 'Furnished', 'view/img/extra/extra_furnished.webp'),
(8, 'Parking', 'view/img/extra/extra_parking.webp'),
(9, 'Lift', 'view/img/extra/extra_lift.webp'),
(10, 'Heating', 'view/img/extra/extra_heating.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `images`
--

CREATE TABLE `images` (
  `code_img` int(11) NOT NULL,
  `code_prop` int(11) DEFAULT NULL,
  `img_prop` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `images`
--

INSERT INTO `images` (`code_img`, `code_prop`, `img_prop`) VALUES
(1, 1, 'view/img/property/prop1.1.webp'),
(2, 1, 'view/img/property/prop1.2.webp'),
(3, 1, 'view/img/property/prop1.3.webp'),
(4, 1, 'view/img/property/prop1.4.webp'),
(5, 1, 'view/img/property/prop1.5.webp'),
(6, 2, 'view/img/property/prop2.1.webp'),
(7, 2, 'view/img/property/prop2.2.webp'),
(8, 2, 'view/img/property/prop2.3.webp'),
(9, 2, 'view/img/property/prop2.4.webp'),
(10, 2, 'view/img/property/prop2.5.webp'),
(11, 3, 'view/img/property/prop3.1.webp'),
(12, 3, 'view/img/property/prop3.2.webp'),
(13, 3, 'view/img/property/prop3.3.webp'),
(14, 3, 'view/img/property/prop3.4.webp'),
(15, 3, 'view/img/property/prop3.5.webp'),
(16, 4, 'view/img/property/prop4.1.webp'),
(17, 4, 'view/img/property/prop4.2.webp'),
(18, 4, 'view/img/property/prop4.3.webp'),
(19, 4, 'view/img/property/prop4.4.webp'),
(20, 4, 'view/img/property/prop4.5.webp'),
(21, 5, 'view/img/property/prop5.1.webp'),
(22, 5, 'view/img/property/prop5.2.webp'),
(23, 5, 'view/img/property/prop5.3.webp'),
(24, 5, 'view/img/property/prop5.4.webp'),
(25, 5, 'view/img/property/prop5.5.webp'),
(26, 6, 'view/img/property/prop6.1.webp'),
(27, 6, 'view/img/property/prop6.2.webp'),
(28, 6, 'view/img/property/prop6.3.webp'),
(29, 6, 'view/img/property/prop6.4.webp'),
(30, 6, 'view/img/property/prop6.5.webp'),
(31, 7, 'view/img/property/prop7.1.webp'),
(32, 7, 'view/img/property/prop7.2.webp'),
(33, 7, 'view/img/property/prop7.3.webp'),
(34, 7, 'view/img/property/prop7.4.webp'),
(35, 7, 'view/img/property/prop7.5.webp'),
(36, 8, 'view/img/property/prop8.1.webp'),
(37, 8, 'view/img/property/prop8.2.webp'),
(38, 8, 'view/img/property/prop8.3.webp'),
(39, 8, 'view/img/property/prop8.4.webp'),
(40, 8, 'view/img/property/prop8.5.webp'),
(41, 9, 'view/img/property/prop9.1.webp'),
(42, 9, 'view/img/property/prop9.2.webp'),
(43, 9, 'view/img/property/prop9.3.webp'),
(44, 9, 'view/img/property/prop9.4.webp'),
(45, 9, 'view/img/property/prop9.5.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property`
--

CREATE TABLE `property` (
  `code_prop` int(11) NOT NULL,
  `ref_cat` varchar(255) DEFAULT NULL,
  `name_prop` varchar(255) DEFAULT NULL,
  `m2` int(11) DEFAULT NULL,
  `rooms` int(11) DEFAULT NULL,
  `baths` int(11) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `price` int(25) DEFAULT NULL,
  `publication` date DEFAULT NULL,
  `code_city` int(11) DEFAULT NULL,
  `last_visit` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property`
--

INSERT INTO `property` (`code_prop`, `ref_cat`, `name_prop`, `m2`, `rooms`, `baths`, `description`, `price`, `publication`, `code_city`, `last_visit`) VALUES
(1, '1235A', 'Spacious house with garden', 200, 4, 2, 'Enjoy the spaciousness of this 200m² house with 4 bedrooms and 2 baths, complemented by a serene garden, offering a perfect blend of comfort and tranquility', 300000, '2024-01-25', 1, '2024-03-07 20:33:33'),
(2, '4567B', 'Cozy flat in the city center', 100, 2, 1, 'Nestled in the city center, this cozy 100m² flat boasts 2 bedrooms and 1 bath, promising urban convenience combined with warmth and charm.', 150000, '2024-01-25', 5, '2024-03-07 20:22:12'),
(3, '8912C', 'Beautiful house with a view', 180, 3, 2, 'Revel in the beauty of this 180m² house, featuring 3 bedrooms and 2 baths, offering picturesque views that redefine the concept of home.', 250000, '2024-01-25', 2, NULL),
(4, '3456D', 'Large commercial space', 300, 0, 1, 'Embark on vast commercial ventures with this 300m² property, designed for expansive enterprises, promising ample space for your business aspirations.', 500000, '2024-01-25', 4, NULL),
(5, '6789E\r\n', 'Spacious land for development', 500, 0, 0, 'Unleash your development dreams on this 500m² expanse of land, offering endless possibilities and a canvas for your visionary projects.', 100000, '2024-01-25', 1, NULL),
(6, '5896F', 'Modern house with swimming pool', 220, 5, 3, 'Step into modern luxury with this 220m² house, boasting 5 bedrooms, 3 baths, and a refreshing swimming pool, promising an epitome of contemporary living.', 350000, '2024-01-25', 2, NULL),
(7, '1246G', 'Bright flat with balcony', 120, 2, 1, 'Illuminate your life in this bright 120m² flat, featuring 2 bedrooms and 1 bath, complemented by a charming balcony, offering a delightful urban retreat.', 180000, '2024-01-25', 3, NULL),
(8, '5789H', 'Commercial property with parking', 400, 0, 1, 'Unlock the potential of your business in this 400m² property, equipped with parking facilities, offering a strategic location for your commercial endeavors.', 600000, '2024-01-25', 4, NULL),
(9, '6485J', 'Spacious garage for multiple cars', 10, 0, 0, 'Safeguard your vehicles in this spacious 10m² garage, providing ample room for multiple cars, ensuring convenience and security for your prized possessions.', 25000, '2024-01-25', 5, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_activity`
--

CREATE TABLE `property_activity` (
  `code_prop` int(11) NOT NULL,
  `code_act` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_activity`
--

INSERT INTO `property_activity` (`code_prop`, `code_act`) VALUES
(1, 5),
(2, 1),
(3, 5),
(4, 4),
(5, 3),
(6, 2),
(7, 5),
(8, 1),
(9, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_category`
--

CREATE TABLE `property_category` (
  `code_prop` int(11) NOT NULL,
  `code_cat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_category`
--

INSERT INTO `property_category` (`code_prop`, `code_cat`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4),
(6, 1),
(7, 2),
(8, 3),
(9, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_extras`
--

CREATE TABLE `property_extras` (
  `code_prop` int(11) NOT NULL,
  `code_extra` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_extras`
--

INSERT INTO `property_extras` (`code_prop`, `code_extra`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4),
(6, 1),
(7, 2),
(8, 3),
(9, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `property_type`
--

CREATE TABLE `property_type` (
  `code_prop` int(11) NOT NULL,
  `code_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `property_type`
--

INSERT INTO `property_type` (`code_prop`, `code_type`) VALUES
(1, 1),
(2, 2),
(3, 1),
(4, 3),
(5, 4),
(6, 1),
(7, 2),
(8, 3),
(9, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `type`
--

CREATE TABLE `type` (
  `code_type` int(11) NOT NULL,
  `name_type` varchar(255) DEFAULT NULL,
  `img_type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `type`
--

INSERT INTO `type` (`code_type`, `name_type`, `img_type`) VALUES
(1, 'House', 'view/img/type/type_house.webp'),
(2, 'Flat', 'view/img/type/type_flat.webp'),
(3, 'Business', 'view/img/type/type_business.webp'),
(4, 'Terrain', 'view/img/type/type_terrain.webp'),
(5, 'Garage', 'view/img/type/type_garage.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visited`
--

CREATE TABLE `visited` (
  `code_visit` int(11) NOT NULL,
  `code_prop` int(11) NOT NULL,
  `visits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `visited`
--

INSERT INTO `visited` (`code_visit`, `code_prop`, `visits`) VALUES
(1, 1, 7),
(2, 2, 1),
(3, 3, 4),
(4, 4, 0),
(5, 5, 2),
(6, 6, 0),
(7, 7, 0),
(8, 8, 0),
(9, 9, 6);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`code_act`),
  ADD UNIQUE KEY `name_act` (`name_act`);

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`code_cat`);

--
-- Indices de la tabla `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`code_city`);

--
-- Indices de la tabla `extra`
--
ALTER TABLE `extra`
  ADD PRIMARY KEY (`code_extra`);

--
-- Indices de la tabla `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`code_img`),
  ADD KEY `code_prop` (`code_prop`);

--
-- Indices de la tabla `property`
--
ALTER TABLE `property`
  ADD PRIMARY KEY (`code_prop`),
  ADD UNIQUE KEY `ref_cat` (`ref_cat`),
  ADD KEY `code_city` (`code_city`);

--
-- Indices de la tabla `property_activity`
--
ALTER TABLE `property_activity`
  ADD PRIMARY KEY (`code_prop`,`code_act`),
  ADD KEY `code_act` (`code_act`);

--
-- Indices de la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD PRIMARY KEY (`code_prop`,`code_cat`),
  ADD KEY `code_cat` (`code_cat`);

--
-- Indices de la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD PRIMARY KEY (`code_prop`,`code_extra`),
  ADD KEY `code_extra` (`code_extra`);

--
-- Indices de la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD PRIMARY KEY (`code_prop`,`code_type`),
  ADD KEY `code_type` (`code_type`);

--
-- Indices de la tabla `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`code_type`);

--
-- Indices de la tabla `visited`
--
ALTER TABLE `visited`
  ADD KEY `code_prop` (`code_prop`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `activity`
--
ALTER TABLE `activity`
  MODIFY `code_act` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `category`
--
ALTER TABLE `category`
  MODIFY `code_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `city`
--
ALTER TABLE `city`
  MODIFY `code_city` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `extra`
--
ALTER TABLE `extra`
  MODIFY `code_extra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `images`
--
ALTER TABLE `images`
  MODIFY `code_img` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT de la tabla `property`
--
ALTER TABLE `property`
  MODIFY `code_prop` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `type`
--
ALTER TABLE `type`
  MODIFY `code_type` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`);

--
-- Filtros para la tabla `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_ibfk_1` FOREIGN KEY (`code_city`) REFERENCES `city` (`code_city`);

--
-- Filtros para la tabla `property_activity`
--
ALTER TABLE `property_activity`
  ADD CONSTRAINT `property_activity_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_activity_ibfk_2` FOREIGN KEY (`code_act`) REFERENCES `activity` (`code_act`);

--
-- Filtros para la tabla `property_category`
--
ALTER TABLE `property_category`
  ADD CONSTRAINT `property_category_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_category_ibfk_2` FOREIGN KEY (`code_cat`) REFERENCES `category` (`code_cat`);

--
-- Filtros para la tabla `property_extras`
--
ALTER TABLE `property_extras`
  ADD CONSTRAINT `property_extras_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_extras_ibfk_2` FOREIGN KEY (`code_extra`) REFERENCES `extra` (`code_extra`);

--
-- Filtros para la tabla `property_type`
--
ALTER TABLE `property_type`
  ADD CONSTRAINT `property_type_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`),
  ADD CONSTRAINT `property_type_ibfk_2` FOREIGN KEY (`code_type`) REFERENCES `type` (`code_type`);

--
-- Filtros para la tabla `visited`
--
ALTER TABLE `visited`
  ADD CONSTRAINT `visited_ibfk_1` FOREIGN KEY (`code_prop`) REFERENCES `property` (`code_prop`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
