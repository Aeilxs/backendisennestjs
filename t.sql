-- Adminer 4.8.1 MySQL 5.5.5-10.6.16-MariaDB-0ubuntu0.22.04.1 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `lift`;
CREATE TABLE `lift` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `lift` (`id`, `name`, `status`) VALUES
(1,	'La Troïka',	0),
(2,	'Les Torres',	0),
(3,	'La Burge',	0),
(4,	'Les Amoureux',	0),
(5,	'Le Moulin',	0),
(6,	'Le Beauregard I',	0),
(7,	'Le Beauregard II',	0),
(8,	'Ste Marie Madeleine',	0),
(9,	'Les Cassettes',	0),
(10,	'Bouticari',	0),
(11,	'Le Grand Serre',	0);

DROP TABLE IF EXISTS `lift_trails_trail`;
CREATE TABLE `lift_trails_trail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `trailId` int(11) NOT NULL,
  `liftId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `trailId` (`trailId`),
  KEY `liftId` (`liftId`),
  CONSTRAINT `lift_trails_trail_ibfk_1` FOREIGN KEY (`trailId`) REFERENCES `trail` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lift_trails_trail_ibfk_2` FOREIGN KEY (`liftId`) REFERENCES `lift` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `lift_trails_trail` (`id`, `trailId`, `liftId`) VALUES
(1,	1,	1),
(2,	7,	1),
(3,	1,	2),
(4,	7,	2),
(5,	8,	3),
(6,	25,	3),
(7,	7,	4),
(8,	25,	4),
(9,	5,	5),
(10,	6,	5),
(11,	27,	6),
(12,	28,	6),
(13,	9,	6),
(14,	22,	6),
(15,	24,	7),
(16,	10,	7),
(17,	11,	7),
(18,	20,	8),
(19,	12,	8),
(20,	19,	9),
(21,	20,	9),
(22,	21,	9),
(23,	14,	9),
(24,	15,	9),
(25,	13,	10),
(26,	3,	10),
(27,	4,	10),
(28,	23,	10),
(29,	15,	11),
(30,	17,	11),
(31,	18,	11),
(32,	16,	11);

DROP TABLE IF EXISTS `trail`;
CREATE TABLE `trail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `difficulty` smallint(6) NOT NULL DEFAULT 0,
  `status` smallint(6) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `trail` (`id`, `name`, `difficulty`, `status`) VALUES
(1,	'La Monthery',	0,	0),
(2,	'Jonction Basse',	0,	0),
(3,	'Bouticari Vert',	0,	0),
(4,	'Le Forest',	0,	0),
(5,	'Les Rhodos',	1,	0),
(6,	'Les Ribettes',	1,	0),
(7,	'Les Casses',	1,	0),
(8,	'S du Chamois',	1,	0),
(9,	'Les lampions',	1,	0),
(10,	'Le Gourq',	1,	0),
(11,	'Les Clouzeaux',	1,	0),
(12,	'L\'Arbre',	1,	0),
(13,	'Bouticari Bleu',	1,	0),
(14,	'L\'Inglin',	1,	0),
(15,	'Le Grand Serre',	1,	0),
(16,	'La Gérabio',	1,	0),
(17,	'La Draye',	2,	0),
(18,	'Les Sagnières',	2,	0),
(19,	'Barrigart',	2,	0),
(20,	'Pré Méan',	2,	0),
(21,	'L\'Ousselat',	2,	0),
(22,	'La Mandarine',	2,	0),
(23,	'La Rouge Bouticari',	2,	0),
(24,	'L\'Ecureuil',	2,	0),
(25,	'Les Jockeys',	2,	0),
(26,	'Le Chamois',	2,	0),
(27,	'Le Lièvre',	3,	0),
(28,	'Le Tétras',	3,	0);

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'ROLE_USER',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;


-- 2024-04-30 18:02:11