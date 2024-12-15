CREATE DATABASE  IF NOT EXISTS `musorujsag` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_hungarian_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `musorujsag`;
-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: musorujsag
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `admin_nev` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `jelszo` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `utolso_belepes_datuma` datetime DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('admin','admin','admin',NULL),('beth@citadel.com','Beth Smith','spacehorse22','2024-10-07 20:00:00'),('jerry@citadel.com','Jerry Smith','imloser666','2024-10-06 10:30:00'),('morty@citadel.com','Morty Smith','awjeez123','2024-10-10 09:15:00'),('rick@citadel.com','Rick Sanchez','wubbalubbadubdub','2024-10-09 14:30:00'),('summer@citadel.com','Summer Smith','keeplooking','2024-10-08 18:45:00');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `csatorna`
--

DROP TABLE IF EXISTS `csatorna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `csatorna` (
  `csatorna_nev` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `kategoria` varchar(50) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `leiras` text COLLATE utf8mb3_hungarian_ci,
  PRIMARY KEY (`csatorna_nev`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `csatorna`
--

LOCK TABLES `csatorna` WRITE;
/*!40000 ALTER TABLE `csatorna` DISABLE KEYS */;
INSERT INTO `csatorna` VALUES ('Blips and Chitz','Játék','Intergalaktikus játékterem és szórakoztató központ'),('Gazorpazorp TV','Dráma','A Gazorpazorp bolygó legjobb drámái'),('Gear World Network','Ismeretterjesztő','Minden, amit a fogaskerekekről tudni kell'),('Interdimensional Cable','Szórakoztató','Végtelen dimenziók végtelen TV műsorai'),('Plumbus Channel','Háztartási','A galaxis leghasznosabb háztartási eszközének dedikált csatorna');
/*!40000 ALTER TABLE `csatorna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kezelete_musor_szereploi`
--

DROP TABLE IF EXISTS `kezelete_musor_szereploi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kezelete_musor_szereploi` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `szereplo_id` int NOT NULL,
  `musorcim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`email`,`szereplo_id`,`musorcim`,`epizod`),
  KEY `kezelete_musor_szereploi_ibfk_1` (`szereplo_id`),
  KEY `kezelete_musor_szereploi_ibfk_2` (`musorcim`,`epizod`),
  CONSTRAINT `kezelete_musor_szereploi_ibfk_1` FOREIGN KEY (`szereplo_id`) REFERENCES `szereplo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelete_musor_szereploi_ibfk_2` FOREIGN KEY (`musorcim`, `epizod`) REFERENCES `musor` (`musor_cim`, `epizod`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelete_musor_szereploi_ibfk_3` FOREIGN KEY (`email`) REFERENCES `admin` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kezelete_musor_szereploi`
--

LOCK TABLES `kezelete_musor_szereploi` WRITE;
/*!40000 ALTER TABLE `kezelete_musor_szereploi` DISABLE KEYS */;
/*!40000 ALTER TABLE `kezelete_musor_szereploi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kezelte_csatorna`
--

DROP TABLE IF EXISTS `kezelte_csatorna`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kezelte_csatorna` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `csatornanev` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`csatornanev`,`email`),
  KEY `kezelte_csatorna_ibfk_1` (`email`),
  CONSTRAINT `kezelte_csatorna_ibfk_1` FOREIGN KEY (`email`) REFERENCES `admin` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelte_csatorna_ibfk_2` FOREIGN KEY (`csatornanev`) REFERENCES `csatorna` (`csatorna_nev`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kezelte_csatorna`
--

LOCK TABLES `kezelte_csatorna` WRITE;
/*!40000 ALTER TABLE `kezelte_csatorna` DISABLE KEYS */;
/*!40000 ALTER TABLE `kezelte_csatorna` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kezelte_kozvetites`
--

DROP TABLE IF EXISTS `kezelte_kozvetites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kezelte_kozvetites` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `csatornanev` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `musorcim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `idopont` datetime NOT NULL,
  PRIMARY KEY (`email`,`csatornanev`,`musorcim`,`epizod`,`idopont`),
  KEY `kezelte_kozvetites_ibfk_1` (`csatornanev`,`musorcim`,`epizod`,`idopont`),
  CONSTRAINT `kezelte_kozvetites_ibfk_1` FOREIGN KEY (`csatornanev`, `musorcim`, `epizod`, `idopont`) REFERENCES `kozvetites` (`csatorna_nev`, `musor_cim`, `epizod`, `idopont`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelte_kozvetites_ibfk_2` FOREIGN KEY (`email`) REFERENCES `admin` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kezelte_kozvetites`
--

LOCK TABLES `kezelte_kozvetites` WRITE;
/*!40000 ALTER TABLE `kezelte_kozvetites` DISABLE KEYS */;
/*!40000 ALTER TABLE `kezelte_kozvetites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kezelte_musor`
--

DROP TABLE IF EXISTS `kezelte_musor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kezelte_musor` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `musorcim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`email`,`musorcim`,`epizod`),
  KEY `kezelte_musor_ibfk_1` (`musorcim`,`epizod`),
  CONSTRAINT `kezelte_musor_ibfk_1` FOREIGN KEY (`musorcim`, `epizod`) REFERENCES `musor` (`musor_cim`, `epizod`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelte_musor_ibfk_2` FOREIGN KEY (`email`) REFERENCES `admin` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kezelte_musor`
--

LOCK TABLES `kezelte_musor` WRITE;
/*!40000 ALTER TABLE `kezelte_musor` DISABLE KEYS */;
/*!40000 ALTER TABLE `kezelte_musor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kezelte_szereplo`
--

DROP TABLE IF EXISTS `kezelte_szereplo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kezelte_szereplo` (
  `email` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `szereplo_id` int NOT NULL,
  PRIMARY KEY (`szereplo_id`,`email`),
  KEY `kezelte_szereplo_ibfk_1` (`email`),
  CONSTRAINT `kezelte_szereplo_ibfk_1` FOREIGN KEY (`email`) REFERENCES `admin` (`email`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `kezelte_szereplo_ibfk_2` FOREIGN KEY (`szereplo_id`) REFERENCES `szereplo` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kezelte_szereplo`
--

LOCK TABLES `kezelte_szereplo` WRITE;
/*!40000 ALTER TABLE `kezelte_szereplo` DISABLE KEYS */;
/*!40000 ALTER TABLE `kezelte_szereplo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kozvetites`
--

DROP TABLE IF EXISTS `kozvetites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kozvetites` (
  `csatorna_nev` varchar(100) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `musor_cim` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_hungarian_ci NOT NULL,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `idopont` datetime NOT NULL,
  PRIMARY KEY (`csatorna_nev`,`musor_cim`,`epizod`,`idopont`),
  KEY `kozvetites_ibfk_1` (`musor_cim`,`epizod`),
  CONSTRAINT `kozvetites_ibfk_1` FOREIGN KEY (`musor_cim`, `epizod`) REFERENCES `musor` (`musor_cim`, `epizod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `kozvetites_ibfk_2` FOREIGN KEY (`csatorna_nev`) REFERENCES `csatorna` (`csatorna_nev`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kozvetites`
--

LOCK TABLES `kozvetites` WRITE;
/*!40000 ALTER TABLE `kozvetites` DISABLE KEYS */;
INSERT INTO `kozvetites` VALUES ('Interdimensional Cable','Ball Fondlers','S01E01','2024-10-12 20:00:00'),('Interdimensional Cable','Ball Fondlers','S01E02','2024-10-13 20:00:00'),('Gazorpazorp TV','Eyeholes','S01E06','2024-12-19 20:54:00'),('Gear World Network','Eyeholes','S01E06','2024-11-07 05:57:00'),('Blips and Chitz','Gear Talk with Rick','S01E01','2024-07-03 22:10:00'),('Gear World Network','Gear Talk with Rick','S01E01','2024-10-12 18:00:00'),('Interdimensional Cable','Gear Talk with Rick','S01E01','2024-12-18 11:01:00'),('Gear World Network','Gear Talk with Rick','S01E02','2024-10-13 18:00:00'),('Gazorpazorp TV','How They Do It: Plumbus','S01E01','2024-10-12 21:30:00'),('Gazorpazorp TV','How They Do It: Plumbus','S01E02','2024-10-13 19:30:00'),('Blips and Chitz','Interdimensional Mind Benders','S01E08','2024-11-28 16:50:00'),('Interdimensional Cable','Interdimensional Mind Benders','S01E08','2024-11-27 14:50:00'),('Blips and Chitz','Intergalactic Sports Show','2024-10-12','2024-10-12 19:00:00'),('Gazorpazorp TV','Intergalactic Sports Show','2024-10-12','2024-10-12 19:00:00'),('Interdimensional Cable','Intergalactic Sports Show','2024-10-12','2024-10-12 19:00:00'),('Interdimensional Cable','Numbericon','S01E07','2024-01-12 16:12:00'),('Blips and Chitz','Pimp My Plumbus','S01E07','2024-11-30 16:02:00'),('Gear World Network','Pimp My Plumbus','S01E07','2024-11-30 07:08:00'),('Interdimensional Cable','Pimp My Plumbus','S01E07','2024-11-11 16:56:00'),('Plumbus Channel','Pimp My Plumbus','S01E07','2024-12-22 07:58:00'),('Plumbus Channel','Plumbus Master Class','S01E01','2024-10-12 22:00:00'),('Plumbus Channel','Plumbus Master Class','S01E02','2024-10-13 22:00:00'),('Blips and Chitz','Roy: A Life Well Lived','S01E01','2024-10-12 21:00:00'),('Blips and Chitz','Roy: A Life Well Lived','S01E02','2024-10-13 21:00:00');
/*!40000 ALTER TABLE `kozvetites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musor`
--

DROP TABLE IF EXISTS `musor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musor` (
  `musor_cim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `ismerteto` text COLLATE utf8mb3_hungarian_ci,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`musor_cim`,`epizod`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musor`
--

LOCK TABLES `musor` WRITE;
/*!40000 ALTER TABLE `musor` DISABLE KEYS */;
INSERT INTO `musor` VALUES ('Alien Invasion Tomato Monster Mexican Armada Brothers','Két testvér... űrlények ellen','S01E05'),('Ants in my Eyes Johnson Electronics','Elektronikai termékek bemutatója egy különleges házigazdával','S01E02'),('Baby Legs','Egy rendőr kalandjai, akinek bébi lábai vannak','S01E05'),('Ball Fondlers','Az első epizódban a fondozók bemutatkoznak, és egy különleges küldetést vállalnak.','S01E01'),('Ball Fondlers','A fondozók egy veszélyes ellenséggel találkoznak, akinek titkai vannak.','S01E02'),('Ball Fondlers','A fondozók egy új csapattagot szereznek, aki váratlan fordulatot hoz.','S01E03'),('Ballfondlers: The Animated Series','A népszerű film rajzfilmváltozata','S01E10'),('Cog Talk','Beszélgetős műsor híres fogaskerekekkel','S01E07'),('Extreme Gear Makeover','Rozsdás fogaskerekek felújítása','S01E09'),('Extreme Plumbus Sports','Extrém sportok Plumbusszal','S01E04'),('Eyeholes','Egy veszélyes reggeli gabona reklámja','S01E06'),('Flarga Blarga Blarg','Érthetetlen, de lebilincselő idegenek szereplésével','S01E05'),('Flooby Noob World Championship','Galaktikus Flooby Noob bajnokság közvetítése','2024-11-01'),('Flooby Noob World Championship','Galaktikus Flooby Noob bajnokság közvetítése','S01E02'),('Funny Songs','Robot énekesek vicces dalai','S01E09'),('Gazorpazorp Evening News','A legfontosabb hírek a Gazorpazorpról és azon túl','2024-10-12'),('Gazorpazorp Evening News','A legfontosabb hírek a Gazorpazorpról és azon túl','2024-10-13'),('Gazorpazorp Master Chef','Főzőverseny Gazorpazorpian ételekkel','S01E06'),('Gazorpazorpfield','Egy lusta, lasagne-kedvelő Gazorpazorpian kalandjai','S01E02'),('Gear Olympics','A fogaskerék-játékok legnagyobb versenye','2024-11-21'),('Gear or No Gear','Izgalmas kvízműsor fogaskerekekről','S01E04'),('Gear Poetry Slam','Költészeti est fogaskerekekről','S01E05'),('Gear Talk with Rick','Rick bemutatja a fogaskerekek alapvető működési elvét.','S01E01'),('Gear Talk with Rick','Rick elmagyarázza a fogaskerekek történelmi fejlődését.','S01E02'),('Gear Talk with Rick','Rick megvitatja, hogyan használjuk a fogaskerekeket a mindennapokban.','S01E03'),('Gear Wars: The Documentary','A nagy fogaskerékháborúk története','S01E03'),('Gearheads Unite','Fogaskerék-rajongók találkozója','S01E02'),('Gears of Our Lives','Szappanopera fogaskerekekről','S01E08'),('Glip Glops Got Talent','Tehetségkutató műsor Glip Glopoknak','S01E06'),('Glorzo\'s Got Game','Videojáték bemutató Glorzókkal','S01E10'),('Hamster in Butt World','Egy világ, ahol mindenki fenekében hörcsög él','S01E07'),('How Did I Get Here?','Emberek random helyeken találják magukat','S01E08'),('How They Do It: Plumbus','Részletesen bemutatjuk a Plumbus alapanyagait.','S01E01'),('How They Do It: Plumbus','Megmutatjuk, hogyan szerelik össze a Plumbust.','S01E02'),('How They Do It: Plumbus','Végső simítások: hogyan használjuk a Plumbust otthon.','S01E03'),('Interdimensional Mind Benders','Agytorna különböző dimenziókból','S01E08'),('Intergalactic News','Friss hírek a galaxis minden szegletéből','2024-10-12'),('Intergalactic News','Friss hírek a galaxis minden szegletéből','2024-10-13'),('Intergalactic Pinball Masters','A legjobb flipperjátékosok versengése','S01E09'),('Intergalactic Sports Show','Közvetítések és elemzések a galaktikus sportvilágból','2024-10-12'),('Jan Quadrant Vincent 16','Akciódús sci-fi Jan Michael Vincent főszereplésével','S01E04'),('Keeping Up with the Plumbuses','Reality show egy Plumbus család életéről','S01E10'),('Lil Bits','Apró ételek reklámja apró szájú embereknek','S01E04'),('Mechanical Daily News','Hírek és érdekességek a fogaskerekek világából','2024-10-12'),('Mechanical Daily News','Hírek és érdekességek a fogaskerekek világából','2024-10-13'),('Numbericon','Matematikai játékshow','S01E07'),('Octopus Man','Egy ember, aki félig polip, harcol a bűn ellen','S01E08'),('Pimp My Plumbus','Plumbusok extrém tuningolása','S01E07'),('Plumbus After Dark','Felnőtt tartalom Plumbusokkal','S01E05'),('Plumbus Cooking Show','Főzőműsor, ahol minden ételt Plumbusszal készítenek','S01E03'),('Plumbus Cribs','Luxusotthonok, ahol minden Plumbusból készült','S01E08'),('Plumbus Extreme Makeover','Extrém Plumbus átalakítások','S01E02'),('Plumbus Hoarders','Plumbus-gyűjtők extrém esetei','S01E06'),('Plumbus Master Class','Alapvető Plumbus-kezelési tippek kezdőknek.','S01E01'),('Plumbus Master Class','Haladó technikák a Plumbus hatékonyabb használatához.','S01E02'),('Plumbus Master Class','Profi tanácsok a Plumbus mestereitől.','S01E03'),('Plumbus World Report','Globális hírek Plumbus perspektívából','2024-10-12'),('Plumbus World Report','Globális hírek Plumbus perspektívából','2024-10-13'),('Plumbusball Tournament','Plumbusball torna a legjobb csapatokkal','2024-12-12'),('Real Fake Doors','Egy izgalmas műsor valódi hamis ajtókról','S01E03'),('Reverse Giraffe: The Series','Egy fordított zsiráf kalandjai','S01E07'),('Roy: A Life Well Lived','Roy gyerekként felfedezi a világot, és először megy iskolába.','S01E01'),('Roy: A Life Well Lived','Roy tinédzserként nehéz döntések elé kerül az életben.','S01E02'),('Roy: A Life Well Lived','Roy felnőtté válik, családot alapít és karrierjét építi.','S01E03'),('Slippery Stair Adventures','Kalandok egy csúszós lépcsővel','S01E03'),('Snuffles: A Dog\'s Tale','Egy kutya felemelkedése és bukása','S01E10'),('Spaceball Finals','Az univerzum legnagyobb Spaceball döntője','2024-11-07'),('Sprocket Science','Tudományos műsor lánckerekekről','S01E06'),('Sprocket to Me','Romantikus vígjátéksorozat fogaskerekekről','S01E10'),('Strawberry Smiggles','Egy gyilkos reggeli gabona reklámja','S01E03'),('teszt',NULL,'1'),('The Real Plumbuses of the Citadel','Reality show a Citadella Plumbusairól','S01E09'),('Turbulent Juice Gaming Hour','Játékóra a népszerű Turbulent Juice-szal','S01E04'),('Two Brothers in a Van','Két testvér... és akkor jön egy meteor','S01E09'),('Universal Headlines','Naponta friss hírek az univerzumból','2024-10-12'),('Universal Headlines','Naponta friss hírek az univerzumból','2024-10-13');
/*!40000 ALTER TABLE `musor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `musor_szereploi`
--

DROP TABLE IF EXISTS `musor_szereploi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `musor_szereploi` (
  `szereplo_id` int NOT NULL,
  `musor_cim` varchar(255) COLLATE utf8mb3_hungarian_ci NOT NULL,
  `epizod` varchar(50) COLLATE utf8mb3_hungarian_ci NOT NULL,
  PRIMARY KEY (`szereplo_id`,`musor_cim`,`epizod`),
  KEY `musor_szereploi_ibfk_1` (`musor_cim`,`epizod`),
  CONSTRAINT `musor_szereploi_ibfk_1` FOREIGN KEY (`musor_cim`, `epizod`) REFERENCES `musor` (`musor_cim`, `epizod`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `musor_szereploi_ibfk_2` FOREIGN KEY (`szereplo_id`) REFERENCES `szereplo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `musor_szereploi`
--

LOCK TABLES `musor_szereploi` WRITE;
/*!40000 ALTER TABLE `musor_szereploi` DISABLE KEYS */;
INSERT INTO `musor_szereploi` VALUES (1,'Alien Invasion Tomato Monster Mexican Armada Brothers','S01E05'),(1,'Ants in my Eyes Johnson Electronics','S01E02'),(3,'Baby Legs','S01E05'),(1,'Ball Fondlers','S01E01'),(2,'Ball Fondlers','S01E01'),(3,'Ball Fondlers','S01E01'),(4,'Ball Fondlers','S01E01'),(1,'Eyeholes','S01E06'),(17,'Gear Talk with Rick','S01E01'),(19,'Gear Talk with Rick','S01E01'),(24,'Gear Talk with Rick','S01E01'),(4,'Gear Talk with Rick','S01E02'),(19,'Gear Talk with Rick','S01E02'),(24,'Gear Talk with Rick','S01E02'),(17,'Gear Talk with Rick','S01E03'),(24,'Gear Talk with Rick','S01E03'),(1,'Hamster in Butt World','S01E07'),(2,'Hamster in Butt World','S01E07'),(3,'Hamster in Butt World','S01E07'),(4,'Hamster in Butt World','S01E07'),(5,'Hamster in Butt World','S01E07'),(6,'Hamster in Butt World','S01E07'),(7,'Hamster in Butt World','S01E07'),(8,'Hamster in Butt World','S01E07'),(9,'Hamster in Butt World','S01E07'),(10,'Hamster in Butt World','S01E07'),(11,'Hamster in Butt World','S01E07'),(3,'How Did I Get Here?','S01E08'),(21,'How They Do It: Plumbus','S01E01'),(18,'Interdimensional Mind Benders','S01E08'),(19,'Interdimensional Mind Benders','S01E08'),(24,'Interdimensional Mind Benders','S01E08'),(5,'Jan Quadrant Vincent 16','S01E04'),(18,'Numbericon','S01E07'),(20,'Numbericon','S01E07'),(22,'Numbericon','S01E07'),(24,'Numbericon','S01E07'),(2,'Two Brothers in a Van','S01E09');
/*!40000 ALTER TABLE `musor_szereploi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `szereplo`
--

DROP TABLE IF EXISTS `szereplo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `szereplo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `szereplo_nev` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `szul_datum` date DEFAULT NULL,
  `nemzetiseg` varchar(50) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  `foglalkozas` varchar(100) COLLATE utf8mb3_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `szereplo`
--

LOCK TABLES `szereplo` WRITE;
/*!40000 ALTER TABLE `szereplo` DISABLE KEYS */;
INSERT INTO `szereplo` VALUES (1,'Ants in my Eyes Johnson','2024-11-20','Földönkívüli','TV személyiség'),(2,'Two Brothers','1985-08-22','Földi','Akcióhősök'),(3,'Stealy','1995-03-10','Földönkívüli','Tolvaj'),(4,'Mr. Poopybutthole','1980-12-01','Földönkívüli','Tanár'),(5,'Krombopulos Michael','1970-07-30','Gromflomit','Bérgyilkos'),(6,'Strong Arm Jones','1975-04-10','Földi','Zsoldos'),(7,'Blaster Bob','1980-09-20','Földönkívüli','Robbanószer szakértő'),(8,'Laser Larry','1982-06-15','Földi','Taktikai szakértő'),(9,'Sneaky Sam','1978-11-02','Földönkívüli','Árnyék katona'),(10,'Roy','1965-03-25','Földi','Átlagember'),(11,'Helen','1968-02-18','Földi','Feleség'),(12,'Roy Jr.','1990-12-12','Földi','Diák'),(13,'Old Man Roy','1920-05-01','Földi','Nyugdíjas'),(14,'Plumbus Expert Zog','1970-08-14','Plumbuszországi','Plumbus szakértő'),(15,'Technician Glorf','1980-11-22','Földönkívüli','Gyártási technikus'),(16,'Instructor Beep','1995-02-10','Gazorpian','Műszaki oktató'),(17,'Gearhead Greg','1985-07-15','Földönkívüli','Mechanikai mérnök'),(18,'Rusty Wrench','1978-09-10','Földi','Fogaskerék szakértő'),(19,'Torque Tina','1990-11-25','Gearian','Mechanikai technikus'),(20,'Professor Plumb','1962-05-30','Földönkívüli','Plumbus mester'),(21,'Master Krilb','1975-01-22','Plumbuszországi','Plumbus használati oktató'),(22,'Dr. Plumbuska','1988-03-12','Gazorpian','Plumbus doktor'),(24,'Rick Sanchez','1960-01-20','Földi','Őrült tudós'),(27,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `szereplo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-15 23:43:38
