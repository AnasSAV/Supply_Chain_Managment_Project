CREATE DATABASE  IF NOT EXISTS `supply_chain_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supply_chain_management`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: supply_chain_management
-- ------------------------------------------------------
-- Server version	8.0.39

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
  `admin_id` varchar(5) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contact_number` (`contact_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('A001','John Doe','john.doe@gmail.com','$2b$10$t8qR4/o04sKXbOj2yVZkLevN1St6CDaGVuYK2L9YfdO9gQzn121Ua','1234567890'),('A002','Jane Smith','jane.smith@gmail.com','$2b$10$16PBANFypOqpSnX/Ap.v2.mC1OwqFLngggm1GVz2TJMERA7DdRO8W','9876543210'),('A003','Shanthisa Sadaru','Shanthisa.Sadaru@gmail.com','$2b$10$ZJnFG6PknLtFFF8QXdTfGeNhaaPlAtNesyihm6siEIU3GZ90DKMhe','1237894560');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistant`
--

DROP TABLE IF EXISTS `assistant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistant` (
  `assistant_id` varchar(5) NOT NULL,
  `email` varchar(40) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `working_hours` time DEFAULT NULL,
  `branch_id` varchar(4) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`assistant_id`),
  UNIQUE KEY `email` (`email`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `assistant_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistant`
--

LOCK TABLES `assistant` WRITE;
/*!40000 ALTER TABLE `assistant` DISABLE KEYS */;
INSERT INTO `assistant` VALUES ('A001','assist1@scm.com','Assistant One','2234567890',20000,'50:00:00','B001','$2b$10$M9SDI3tEv7gMnXNqZxBXE.R5XHA8iBMsvT2QlZxnnk3wuAeF2nN2W'),('A002','assist2@scm.com','Assistant Two','2234567891',19000,'50:00:00','B001','$2b$10$4KZpl2BVKAaf4WfwAQTXTuwjP1iovy3VpizRk/LfXgt1DKaJN3TVO'),('A003','assist3@scm.com','Assistant Three','2234567892',18000,'50:00:00','B001','$2b$10$7fLCjQidiWroxalo/ZuaFeD1VKOjnY43eB5ehwQFWYzrqv1CjLUGe'),('A004','assist4@scm.com','Assistant Four','2234567893',17500,'50:00:00','B001','$2b$10$BWLHlGOJW/7C98QB.oM6Ju7NhBkleKb5eBzmT5MkQ09E1pqqRRI1y'),('A005','assist5@scm.com','Assistant Five','2234567894',21000,'55:00:00','B002','$2b$10$oLr6.Znti0..cPmiE2jLLeAyLmOzKfNpSznNLVyl.pC7xqcMBjL5a'),('A006','assist6@scm.com','Assistant Six','2234567895',20500,'55:00:00','B002','$2b$10$CMfVxOOzC6eNF5qjKCmOWeg/7hd9N2p1sNOb215vbPPBmiHp70N5O'),('A007','assist7@scm.com','Assistant Seven','2234567896',19500,'55:00:00','B002','$2b$10$4Esgb12UBn2JXOwuWLFSFeG21t1ucc/SQGOqVcbulI0/NUPeCkeIC'),('A008','assist8@scm.com','Assistant Eight','2234567897',18500,'55:00:00','B002','$2b$10$hdsmmzC6Ju.POnr6aLpHYOJQ9ApfWL4r7uG6uwo9rtTgJLpKI6.SS'),('A009','assist9@scm.com','Assistant Nine','2234567898',22000,'60:00:00','B003','$2b$10$rVJdbYghyNnhPLapgP0Zl.A4WYZun7X.LGgM94zu6i/2N87WrvVy2'),('A010','assist10@scm.com','Assistant Ten','2234567899',21500,'60:00:00','B003','$2b$10$eCA/V6o2pKJMYJ.Hzn.xwu8wD9NiEr3xefWizJxtJcGSQN52lPHJS'),('A011','assist11@scm.com','Assistant Eleven','2234567800',20000,'60:00:00','B003','$2b$10$zQrsavsNwWJeu4xkOaeZye47ILMeaop.DNWuuHT8ZTWdc8FPp.0.K'),('A012','assist12@scm.com','Assistant Twelve','2234567801',19500,'60:00:00','B003','$2b$10$ouY8COCm6/uQkEnBXBs5C./sHbRJNUMXOTRO8aMYwwsdwULUAzXEi'),('A013','assist13@scm.com','Assistant Thirteen','2234567802',22500,'60:00:00','B004','$2b$10$eGjDQ6b8e11sTv3ZSQiqDuNHy43yl5P73ddJwVTEfto87Vo.lZUP.'),('A014','assist14@scm.com','Assistant Fourteen','2234567803',22000,'60:00:00','B004','$2b$10$.SpuipUVQZXCOPuL0s2LrOkIysLMkqCblfvEZEAoXKdYU6ZF/Twbu'),('A015','assist15@scm.com','Assistant Fifteen','2234567804',21000,'60:00:00','B004','$2b$10$K2n7tuMjvE0914iHAsYgu.N7/CMNOm2Jgf09c8gsUd7Sv5FSoyfoG'),('A016','assist16@scm.com','Assistant Sixteen','2234567805',20500,'60:00:00','B004','$2b$10$Jrybz1/6tcxa8Hp6GUf95uQVB6FQX3hbHVWjFukEOd/noW6aiSmZO');
/*!40000 ALTER TABLE `assistant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `assistant_details`
--

DROP TABLE IF EXISTS `assistant_details`;
/*!50001 DROP VIEW IF EXISTS `assistant_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `assistant_details` AS SELECT 
 1 AS `assistant_id`,
 1 AS `email`,
 1 AS `name`,
 1 AS `contact_number`,
 1 AS `branch_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` varchar(6) NOT NULL,
  `branch_name` varchar(15) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  `address` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES ('B001','Colombo','123456789','123 Main Street, Colombo'),('B002','Galle','987654321','456 Sea Road, Galle'),('B003','Jaffna','8998999728','98 Ponnambalam Road, Jafna'),('B004','Hambanthota','3333444566','867 Outer Circular Road, Hambanthota');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(60) DEFAULT NULL,
  `email` varchar(40) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  `delivery_address` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`),
  UNIQUE KEY `contact_number` (`contact_number`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'$2b$10$UlKt6zE3EF0oFEofY0GtHO2exET4y7Wko/7u0vVZBFzn9GtxjBfNy','cust1@example.com','Customer One','1234567890','No.1, Lake Road, Kandy'),(2,'$2b$10$ShGS2jvyzhBElyDJseBsLuMC7ipc7flIQPbCkTXVDOcVVorHcazFe','cust2@example.com','Customer Two','1987654321','No.2, Hill Street, Colombo'),(3,'$2b$10$KRuDqhlITMwgzF0cX3oDU.SQmus.LeY4wNpcf/ZZCMcM9WINxFr92','cust3@example.com','Customer Three','2123456789','No.3, Ocean Drive, Galle'),(4,'$2b$10$04PZjKhFGhHHkybWpaMtSu1jkAugRHIWMT0qvaFZdheyzRQd8IEwC','cust4@example.com','Customer Four','2233445566','No.4, Park Avenue, Jaffna'),(5,'$2b$10$cUYZhz/WOVUasxSH5tOzr.E/tYERrIqvvwbLfJlclVrVRwmJ8ro2a','cust5@example.com','Customer Five','2345678901','No.5, Central Road, Galle'),(6,'$2b$10$3KWTDuc0o4MORCUfjzrPzeuJ.DkbnozXqmexvb6KmX0zhln2L1QpG','cust6@example.com','Customer Six','2456789012','No.6, Temple Street, Hambanthota'),(7,'$2b$10$H3z5SEhMKRkHPJC9JhLNZOmxQ/ImlSkwxg32ml/nmdtwxTA5UNPeO','cust7@example.com','Customer Seven','2567890123','No.7, Flower Lane, Hambanthota'),(8,'$2b$10$wqbTIFfh0zn77RzOG.Qb/.h2pIP24ENtTM3651K6DdvRMRWfqoibu','cust8@example.com','Customer Eight','2678901234','No.8, Garden Road, Colombo'),(9,'$2b$10$/RFnejm7yRA3FFnW5c1v1ufYGjjfhGEYyEz6E0KqM/do9r9VYMAGS','cust9@example.com','Customer Nine','2789012345','No.9, Hilltop, Kandy'),(10,'$2b$10$/IqlHrHNpAC/KEpJzPQ5FOU9oty8uRXUHIWoOiloE78QAIULfrJAa','cust10@example.com','Customer Ten','2890123456','No.10, Riverside, Jaffna'),(11,'$2b$10$k.bfdALalG3g77AbBk6cl.IEh7Smer9Skf3nJjxR0Vy7wIZmEZscO','cust11@example.com','Customer Eleven','2901234567','No.11, Beachside, Galle'),(12,'$2b$10$J7ipVFNI/T69BjiP9T07O.ZTAvp7a.SNoKshkYTonZOX4IQN/7JzC','cust12@example.com','Customer Twelve','3012345678','No.12, Mountain Street, Colombo'),(13,'$2b$10$m3uYG4wdJjB2wiIVWQx08ObulM9Rcef./.IfLxdBF.4fRZs8XZxHW','cust13@example.com','Customer Thirte','3123456789','No.13, Lakeview, Kandy'),(14,'$2b$10$S9F5ETDnVU91aB5Ln9DISePQZeWgf52mpnyvC.X3G/QFNT2V3C/Aq','cust14@example.com','Customer Fourte','3234567890','No.14, Forest Road, Hambanthota'),(15,'$2b$10$K7gv3HCpnRDuGbKQ6Bc7WuH291sSGIiIKKHVsJ2DvQd4EJCZ4A72O','cust15@example.com','Customer Fiftee','3345678901','No.15, Sunshine Avenue, Jaffna'),(16,'$2b$10$mpOcAopD6iEALvOlWZJ7Se3K.HG6y61UXWJg3NRJvdVk8/gl5VU0q','cust16@example.com','Customer Sixtee','3456789012','No.16, Skyline Drive, Colombo'),(17,'$2b$10$l/GUxC2R3f9ao6..LOziUetTW8UUIpOlWqNaBMREdArSKCO6vloX6','cust17@example.com','Customer Sevent','3567890123','No.17, Seaview Street, Galle'),(18,'$2b$10$LKXaEKGKLV1KPzZ.z/1HRe1t61ylpQBg8m2/YT9uHOrfdVT4wC7G.','cust18@example.com','Customer Eighte','3678901234','No.18, Sunset Lane, Hambanthota'),(19,'$2b$10$PuGFzzerDgl8JNTzBRt2r.ZBkZJ44AYWdU/oMilsqgY8cjD8p5FcK','cust19@example.com','Customer Ninete','3789012345','No.19, Ocean Boulevard, Jaffna'),(20,'$2b$10$MilxJTtx5y469AcrL2XIne2w400TiaEY0/a6gEw7oHRKyVUGRWRwS','cust20@example.com','Customer Twenty','3890123456','No.20, Star Road, Kandy'),(22,'$2b$10$lS5QnUhyuU//BGcK/T1oKOEEXadymG6qPsEb3eiknXmHhN.kqAFbO','customer@example.com','Customer Name','077970090','123 Main St');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `customer_details`
--

DROP TABLE IF EXISTS `customer_details`;
/*!50001 DROP VIEW IF EXISTS `customer_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `customer_details` AS SELECT 
 1 AS `customer_id`,
 1 AS `email`,
 1 AS `name`,
 1 AS `contact_number`,
 1 AS `delivery_address`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `delivery`
--

DROP TABLE IF EXISTS `delivery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `delivery` (
  `delivery_id` int NOT NULL AUTO_INCREMENT,
  `route_id` varchar(10) NOT NULL,
  `date` date DEFAULT NULL,
  `state` int DEFAULT NULL,
  `truck_trip_id` int NOT NULL,
  `customer_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`delivery_id`),
  KEY `route_id` (`route_id`),
  KEY `truck_trip_id` (`truck_trip_id`),
  KEY `customer_id` (`customer_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `delivery_ibfk_1` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `delivery_ibfk_2` FOREIGN KEY (`truck_trip_id`) REFERENCES `truck_trip` (`truck_trip_id`),
  CONSTRAINT `delivery_ibfk_3` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `delivery_ibfk_4` FOREIGN KEY (`order_id`) REFERENCES `order_product` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery`
--

LOCK TABLES `delivery` WRITE;
/*!40000 ALTER TABLE `delivery` DISABLE KEYS */;
INSERT INTO `delivery` VALUES (1,'R002','2024-10-25',0,1,2,2),(2,'R003','2024-10-25',0,4,3,3);
/*!40000 ALTER TABLE `delivery` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `driver` (
  `driver_id` varchar(5) NOT NULL,
  `email` varchar(40) NOT NULL,
  `name` varchar(25) DEFAULT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  `salary` int DEFAULT NULL,
  `weekly_hours` time DEFAULT NULL,
  `branch_id` varchar(4) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`driver_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `contact_number` (`contact_number`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `driver_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `driver`
--

LOCK TABLES `driver` WRITE;
/*!40000 ALTER TABLE `driver` DISABLE KEYS */;
INSERT INTO `driver` VALUES ('D001','driver1@scm.com','Driver One','1234567890',25000,'40:00:00','B001','$2b$10$T9eFho1MD.PeuxmKX6PvTuTkrOKeHSGuYTck75MM/kdeXXbWwlKiW'),('D002','driver2@scm.com','Driver Two','1234567891',24000,'40:00:00','B001','$2b$10$UiuBQrx.M9/ntA9HtmgpW.t.uhw9bb2Bn8nkVLKIWOgjHw4fL67ry'),('D003','driver3@scm.com','Driver Three','1234567892',23000,'40:00:00','B001','$2b$10$2MCQCfXw37qxxoUSdjVPzeTXgU7BmImWo4xq5wJ3Ca63DOvwqAXmC'),('D004','driver4@scm.com','Driver Four','1234567893',22000,'40:00:00','B001','$2b$10$E1BNFo7jeuKtpRdJ2G0UF.yGhdp6I1.Btm6JKPsZAvN2ctkjRGrja'),('D005','driver5@scm.com','Driver Five','1234567894',26000,'40:00:00','B002','$2b$10$Bj5qPc8bHzKqxJnUXVpcoOWcu.4xuu0aysQayI1qQ4nbfc.IvGzFa'),('D006','driver6@scm.com','Driver Six','1234567895',25500,'40:00:00','B002','$2b$10$ToWmKyl6mGjNRcqE4rc.0.KpS9m7AW44td49g2acE6sm/mU9QPd12'),('D007','driver7@scm.com','Driver Seven','1234567896',24500,'40:00:00','B002','$2b$10$u.D5gDJB0QZWocOjSLgoZ.tJOBiDyZkuaMghmrSs86rLIWZRbCLoG'),('D008','driver8@scm.com','Driver Eight','1234567897',25000,'40:00:00','B002','$2b$10$Bu6tphAwEwY0JkUz63W3.enZ280uzMVUDF0q0EP7oEWQOhgvcOp0q'),('D009','driver9@scm.com','Driver Nine','1234567898',26500,'40:00:00','B003','$2b$10$kXBiwviWc/6h9xnQgB72DuAVvxDItx87vQ0Hcvaq9Y1aq5FDLMfs2'),('D010','driver10@scm.com','Driver Ten','1234567899',27500,'40:00:00','B003','$2b$10$OUqR8bi4AY1shapbxyyKiOP0Q9uD5Ccwxc4cjkuSFp2Up6h.T3i9q'),('D011','driver11@scm.com','Driver Eleven','1234567800',28500,'40:00:00','B003','$2b$10$rm/UTGB336qIv21w8Ct7TekdHCfDEWHXR5cSkSYgYEMPwbajHlS7e'),('D012','driver12@scm.com','Driver Twelve','1234567801',29500,'40:00:00','B003','$2b$10$7CfcWgptOf5nFKHkPXqJf.0V9jlsSu8HulqHJM4hCgdKd85ihBjEq'),('D013','driver13@scm.com','Driver Thirteen','1234567802',26000,'40:00:00','B004','$2b$10$G0x6G6DPlYG0BjU7Zdt8QezRxUzIcMozlq8LMo6Aw2IFzrSPOKNAu'),('D014','driver14@scm.com','Driver Fourteen','1234567803',27000,'40:00:00','B004','$2b$10$S0lunoiQ3MUbY34PP9nnOu2G0xztlUAkmVZxV.XMA4VzQ2bpq.OaC'),('D015','driver15@scm.com','Driver Fifteen','1234567804',28000,'40:00:00','B004','$2b$10$Xr1echoi/SxGcArrDDsXt.3O7oWVVMsgvVTjBf6eSJPnqJOEQ6P16'),('D016','driver16@scm.com','Driver Sixteen','1234567805',29000,'40:00:00','B004','$2b$10$TWXgCIvxvDteXLk5y9P7NulF8kE25HspQDlmZwFO6Mikfwv/.xcoC'),('D017','driver17@scm.com','Driver Seventeen','1234567806',30000,'40:00:00','B004','$2b$10$sJPO15i3aDM78VFwmRB/1eMHxgpCvUkclyZpu2/gPQJMPd/jgOMgi'),('D018','driver18@scm.com','Driver Eighteen','1234567807',31000,'40:00:00','B004','$2b$10$KxsESDB7kLW.cFAVzWHhL.h7v0hNCt1G7AL6W5WXqDSjJeYhopGZm'),('D019','driver19@scm.com','Aaqil','0778889999',30000,'40:00:00','B001','$2b$10$PpDMcUFRp4mY3k0.suisU.kSPtPSRSzYG9/YQpvMRm0nDed5HVttK');
/*!40000 ALTER TABLE `driver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `driver_details`
--

DROP TABLE IF EXISTS `driver_details`;
/*!50001 DROP VIEW IF EXISTS `driver_details`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `driver_details` AS SELECT 
 1 AS `driver_id`,
 1 AS `email`,
 1 AS `name`,
 1 AS `contact_number`,
 1 AS `branch_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `manager`
--

DROP TABLE IF EXISTS `manager`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manager` (
  `manager_id` varchar(6) NOT NULL,
  `name` varchar(15) NOT NULL,
  `email` varchar(40) NOT NULL,
  `contact_number` varchar(10) DEFAULT NULL,
  `password` varchar(60) NOT NULL,
  `branch_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`manager_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password` (`password`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `manager_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manager`
--

LOCK TABLES `manager` WRITE;
/*!40000 ALTER TABLE `manager` DISABLE KEYS */;
INSERT INTO `manager` VALUES ('M001','Alice Brown','alice.brown@example.com','1122334455','$2b$10$8gbNnAmSz.GqRY2JJ3fVTeHdB.CDog67tlOq3AJl3PhJ9A8uldNHy','B001'),('M002','Bob Carter','bob.carter@example.com','5566778899','$2b$10$1uJQOMddGWHhKSzm0EReS.361Ut73gu6ywBuwruTRRrh4oYopffNG','B002'),('M003','Alex Hales','alex.hales@example.com','7788995566','$2b$10$lc7AAS0fODOi8WpCK8Kbo.z6ElhpFH4FfrMT47WP6EZ.HHB9DTM9C','B003'),('M004','Perry White','perry.white@example.com','2225553232','$2b$10$CvomthF0IO8wCXKE63uIs.INTPGEnVYQ6FgIdO9UmeaYgJgXDcAaa','B004');
/*!40000 ALTER TABLE `manager` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `state` int DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `total_capacity` int DEFAULT NULL,
  `delivery_type` varchar(15) DEFAULT NULL,
  `customer_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `route_id` varchar(10) DEFAULT NULL,
  `time` time DEFAULT NULL,
  `branch_id` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_id` (`customer_id`),
  KEY `product_id` (`product_id`),
  KEY `route_id` (`route_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  CONSTRAINT `order_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `order_product_ibfk_3` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`),
  CONSTRAINT `order_product_ibfk_4` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (1,5,'2024-09-18',2,500,100,'Standard',1,1,'R001','10:30:00','B001'),(2,3,'2024-09-19',3,600,90,'Express',2,2,'R002','11:45:00','B002'),(3,8,'2024-09-20',3,1200,80,'Standard',3,3,'R003','09:15:00','B003'),(4,10,'2024-09-21',2,2000,150,'Express',4,4,'R004','14:00:00','B004'),(5,6,'2024-09-22',2,900,75,'Standard',5,5,'R001','08:45:00','B001'),(6,4,'2024-09-23',1,1200,60,'Express',6,6,'R002','13:00:00','B002'),(7,7,'2024-09-24',1,2100,95,'Standard',7,7,'R003','07:30:00','B003'),(8,9,'2024-09-25',0,2700,130,'Express',8,8,'R004','15:15:00','B004'),(9,2,'2024-09-26',1,400,40,'Standard',9,9,'R001','10:00:00','B001'),(10,12,'2024-09-27',1,3600,180,'Express',10,10,'R002','16:00:00','B002'),(11,15,'2024-09-28',1,7500,375,'Standard',11,11,'R003','18:30:00','B003'),(12,20,'2024-09-29',0,11000,450,'Express',12,12,'R004','19:00:00','B004'),(13,18,'2024-09-30',1,9000,420,'Standard',13,13,'R001','11:00:00','B001'),(14,14,'2024-10-01',1,14000,300,'Express',14,14,'R002','13:00:00','B002'),(15,9,'2024-10-02',1,6300,270,'Standard',15,15,'R003','15:00:00','B003'),(16,11,'2024-10-03',0,7700,330,'Express',16,2,'R004','16:30:00','B004'),(17,13,'2024-10-04',1,6500,290,'Standard',17,3,'R001','10:00:00','B001'),(18,5,'2024-10-05',1,3500,175,'Express',18,4,'R002','12:30:00','B002'),(19,16,'2024-10-06',1,12800,410,'Standard',19,5,'R003','08:45:00','B003'),(20,19,'2024-10-07',0,15500,500,'Express',20,6,'R004','17:30:00','B004'),(21,10,'2024-10-08',1,7000,340,'Standard',1,7,'R001','09:15:00','B001'),(22,22,'2024-10-09',0,15400,510,'Express',2,8,'R002','16:45:00','B002'),(23,25,'2024-10-10',1,18500,600,'Standard',3,9,'R003','18:00:00','B003'),(24,30,'2024-10-11',0,22500,750,'Express',4,10,'R004','07:30:00','B004'),(25,35,'2024-10-12',1,24500,820,'Standard',5,11,'R001','19:00:00','B001'),(26,28,'2024-10-13',0,19600,580,'Express',6,12,'R002','11:45:00','B002'),(27,32,'2024-10-14',1,24800,790,'Standard',7,13,'R003','10:15:00','B003'),(28,24,'2024-10-15',0,14400,700,'Express',8,14,'R004','14:00:00','B004'),(29,21,'2024-10-16',1,10900,540,'Standard',9,15,'R001','08:00:00','B001'),(30,10,'2024-10-16',0,1000,200,'Standard',22,1,'R001','22:36:37','B001');
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_train`
--

DROP TABLE IF EXISTS `order_train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_train` (
  `order_train_id` int NOT NULL AUTO_INCREMENT,
  `train_trip_id` int NOT NULL,
  `order_id` int NOT NULL,
  PRIMARY KEY (`order_train_id`),
  KEY `train_trip_id` (`train_trip_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_train_ibfk_1` FOREIGN KEY (`train_trip_id`) REFERENCES `train_trip` (`train_trip_id`),
  CONSTRAINT `order_train_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `order_product` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_train`
--

LOCK TABLES `order_train` WRITE;
/*!40000 ALTER TABLE `order_train` DISABLE KEYS */;
INSERT INTO `order_train` VALUES (6,2,3),(7,2,4),(8,6,6),(9,6,10),(10,5,14),(11,5,18);
/*!40000 ALTER TABLE `order_train` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(30) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Product 1',100,50,20,'Electronic item, 2-year warranty'),(2,'Product 2',200,30,15,'Home appliance, 1-year warranty'),(3,'Product 3',150,25,10,'Fashion accessory, premium quality'),(4,'Product 4',250,40,25,'Sports equipment, suitable for all ages'),(5,'Product 5',300,20,30,'Furniture, compact and durable'),(6,'Product 6',350,35,35,'Kitchenware, stainless steel'),(7,'Product 7',400,45,40,'Health and beauty product, organic'),(8,'Product 8',450,15,50,'Automotive accessory, universal fit'),(9,'Product 9',500,10,45,'Computer accessory, high performance'),(10,'Product 10',600,12,55,'Office supply, multipurpose use'),(11,'Product 11',700,25,60,'Household cleaning product, eco-friendly'),(12,'Product 12',800,18,65,'Outdoor gear, waterproof'),(13,'Product 13',900,30,70,'Camping equipment, lightweight'),(14,'Product 14',1000,40,75,'Gardening tool set, ergonomic design'),(15,'Product 15',1100,22,80,'Smart home device, voice-activated');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `route` (
  `route_id` varchar(10) NOT NULL,
  `route_name` varchar(50) DEFAULT NULL,
  `max_time` time DEFAULT NULL,
  `branch_id` varchar(5) NOT NULL,
  PRIMARY KEY (`route_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `route_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES ('R001','Colombo Route 1','02:00:00','B001'),('R002','Colombo Route 2','03:00:00','B001'),('R003','Colombo Route 3','01:30:00','B001'),('R004','Colombo Route 4','02:30:00','B001'),('R005','Galle Route 1','02:15:00','B002'),('R006','Galle Route 2','03:00:00','B002'),('R007','Galle Route 3','02:45:00','B002'),('R008','Galle Route 4','01:45:00','B002'),('R009','Jaffna Route 1','04:30:00','B003'),('R010','Jaffna Route 2','05:00:00','B003'),('R011','Jaffna Route 3','04:15:00','B003'),('R012','Jaffna Route 4','03:30:00','B003'),('R013','Hambanthota Route 1','03:30:00','B004'),('R014','Hambanthota Route 2','04:00:00','B004'),('R015','Hambanthota Route 3','04:30:00','B004'),('R016','Hambanthota Route 4','05:00:00','B004');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train`
--

DROP TABLE IF EXISTS `train`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train` (
  `train_id` varchar(5) NOT NULL,
  `start` time DEFAULT NULL,
  `end` time DEFAULT NULL,
  `capacity` int DEFAULT NULL,
  `end_station` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`train_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train`
--

LOCK TABLES `train` WRITE;
/*!40000 ALTER TABLE `train` DISABLE KEYS */;
INSERT INTO `train` VALUES ('T001','06:00:00','10:00:00',500,'Galle'),('T002','12:00:00','16:00:00',400,'Galle'),('T003','05:00:00','11:00:00',300,'Hambanthota'),('T004','13:00:00','19:00:00',350,'Jaffna'),('T005','07:00:00','13:00:00',450,'Colombo'),('T006','14:00:00','20:00:00',550,'Colombo');
/*!40000 ALTER TABLE `train` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `train_trip`
--

DROP TABLE IF EXISTS `train_trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `train_trip` (
  `train_trip_id` int NOT NULL AUTO_INCREMENT,
  `train_id` varchar(5) NOT NULL,
  `date` date DEFAULT NULL,
  `branch_id` varchar(6) NOT NULL,
  `cur_capacity` int DEFAULT NULL,
  PRIMARY KEY (`train_trip_id`),
  KEY `train_id` (`train_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `train_trip_ibfk_1` FOREIGN KEY (`train_id`) REFERENCES `train` (`train_id`),
  CONSTRAINT `train_trip_ibfk_2` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `train_trip`
--

LOCK TABLES `train_trip` WRITE;
/*!40000 ALTER TABLE `train_trip` DISABLE KEYS */;
INSERT INTO `train_trip` VALUES (2,'T001','2024-10-23','B002',270),(3,'T003','2024-11-05','B004',300),(4,'T003','2024-11-05','B004',300),(5,'T001','2024-10-24','B002',25),(6,'T002','2024-11-06','B002',160),(7,'T002','2024-10-24','B002',400),(8,'T001','2024-11-01','B002',500),(9,'T001','2024-10-25','B002',500),(10,'T001','2024-10-25','B002',500),(11,'T003','2024-11-05','B004',300),(12,'T002','2024-12-25','B002',400),(13,'T001','2024-11-05','B002',500),(14,'T001','2024-12-13','B002',500),(15,'T006','2024-10-31','B001',550),(16,'T005','2024-11-01','B001',450);
/*!40000 ALTER TABLE `train_trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck`
--

DROP TABLE IF EXISTS `truck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck` (
  `truck_id` varchar(5) NOT NULL,
  `capacity` int DEFAULT NULL,
  `branch_id` varchar(5) NOT NULL,
  PRIMARY KEY (`truck_id`),
  KEY `branch_id` (`branch_id`),
  CONSTRAINT `truck_ibfk_1` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck`
--

LOCK TABLES `truck` WRITE;
/*!40000 ALTER TABLE `truck` DISABLE KEYS */;
INSERT INTO `truck` VALUES ('TR001',100,'B001'),('TR002',120,'B001'),('TR003',150,'B001'),('TR004',130,'B001'),('TR005',110,'B002'),('TR006',140,'B002'),('TR007',130,'B002'),('TR008',160,'B002'),('TR009',150,'B003'),('TR010',140,'B003'),('TR011',160,'B003'),('TR012',170,'B004'),('TR013',150,'B004'),('TR014',180,'B004');
/*!40000 ALTER TABLE `truck` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `truck_trip`
--

DROP TABLE IF EXISTS `truck_trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `truck_trip` (
  `truck_trip_id` int NOT NULL AUTO_INCREMENT,
  `cur_capacity` int DEFAULT NULL,
  `truck_id` varchar(5) NOT NULL,
  `driver_id` varchar(5) NOT NULL,
  `assistant_id` varchar(5) NOT NULL,
  `route_id` varchar(10) NOT NULL,
  `date` date DEFAULT NULL,
  `state` int DEFAULT NULL,
  PRIMARY KEY (`truck_trip_id`),
  KEY `truck_id` (`truck_id`),
  KEY `driver_id` (`driver_id`),
  KEY `assistant_id` (`assistant_id`),
  KEY `route_id` (`route_id`),
  CONSTRAINT `truck_trip_ibfk_1` FOREIGN KEY (`truck_id`) REFERENCES `truck` (`truck_id`),
  CONSTRAINT `truck_trip_ibfk_2` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`),
  CONSTRAINT `truck_trip_ibfk_3` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`),
  CONSTRAINT `truck_trip_ibfk_4` FOREIGN KEY (`route_id`) REFERENCES `route` (`route_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `truck_trip`
--

LOCK TABLES `truck_trip` WRITE;
/*!40000 ALTER TABLE `truck_trip` DISABLE KEYS */;
INSERT INTO `truck_trip` VALUES (1,10,'TR001','D001','A001','R002','2024-10-25',0),(4,20,'TR001','D001','A001','R002','2024-10-25',0);
/*!40000 ALTER TABLE `truck_trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_hours_assistant`
--

DROP TABLE IF EXISTS `working_hours_assistant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_hours_assistant` (
  `working_assistant_id` int NOT NULL AUTO_INCREMENT,
  `worked_hours` time DEFAULT NULL,
  `assistant_id` varchar(5) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`working_assistant_id`),
  KEY `assistant_id` (`assistant_id`),
  CONSTRAINT `working_hours_assistant_ibfk_1` FOREIGN KEY (`assistant_id`) REFERENCES `assistant` (`assistant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_hours_assistant`
--

LOCK TABLES `working_hours_assistant` WRITE;
/*!40000 ALTER TABLE `working_hours_assistant` DISABLE KEYS */;
/*!40000 ALTER TABLE `working_hours_assistant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `working_hours_drivers`
--

DROP TABLE IF EXISTS `working_hours_drivers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `working_hours_drivers` (
  `working_driver_id` int NOT NULL AUTO_INCREMENT,
  `worked_hours` time DEFAULT NULL,
  `driver_id` varchar(5) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  PRIMARY KEY (`working_driver_id`),
  KEY `driver_id` (`driver_id`),
  CONSTRAINT `working_hours_drivers_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`driver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `working_hours_drivers`
--

LOCK TABLES `working_hours_drivers` WRITE;
/*!40000 ALTER TABLE `working_hours_drivers` DISABLE KEYS */;
/*!40000 ALTER TABLE `working_hours_drivers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'supply_chain_management'
--

--
-- Dumping routines for database 'supply_chain_management'
--
/*!50003 DROP PROCEDURE IF EXISTS `add_order_product` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_order_product`(
    IN p_quantity INT,
    IN p_total_price INT,
    IN p_total_capacity INT,
    IN p_delivery_type VARCHAR(10),
    IN p_customer_id VARCHAR(5),
    IN p_product_id VARCHAR(8),
    IN p_route_id VARCHAR(10),
    IN p_branch_id VARCHAR(6)
)
BEGIN
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        
        ROLLBACK;
        
        
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Failed to add order product due to an SQL exception.';
    END;

    
    START TRANSACTION;

    
    INSERT INTO Order_product (quantity, date, time, state, total_price, total_capacity, delivery_type, customer_id, product_id, route_id, branch_id)
    VALUES (p_quantity, CURRENT_DATE, CURRENT_TIME, 0, p_total_price, p_total_capacity, p_delivery_type, p_customer_id, p_product_id, p_route_id, p_branch_id);

    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Add_Order_To_Train_If_Capacity` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_Order_To_Train_If_Capacity`(
    IN p_order_id INT,
    IN p_train_trip_id INT
)
BEGIN
    DECLARE v_order_capacity INT;
    DECLARE v_train_capacity INT;

    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;

    
    START TRANSACTION;

 
    SELECT total_capacity INTO v_order_capacity
    FROM Order_Product
    WHERE order_id = p_order_id;


    SELECT cur_capacity INTO v_train_capacity
    FROM Train_Trip
    WHERE train_trip_id = p_train_trip_id;


    IF v_train_capacity >= v_order_capacity THEN
        
        UPDATE Order_Product
        SET state = 1
        WHERE order_id = p_order_id;

      
        INSERT INTO Order_Train (train_trip_id, order_id)
        VALUES (p_train_trip_id, p_order_id);


        UPDATE Train_Trip
        SET cur_capacity = cur_capacity - v_order_capacity
        WHERE train_trip_id = p_train_trip_id;
    ELSE

        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Train capacity is insufficient for this order.';
    END IF;


    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Add_Truck_Trip` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Add_Truck_Trip`(
    IN p_truck_id VARCHAR(5),
    IN p_assistant_id VARCHAR(5),
    IN p_driver_id VARCHAR(5),
    IN p_route_id VARCHAR(10)
)
BEGIN
    DECLARE v_capacity INT;


    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred while adding truck trip';
    END;


    START TRANSACTION;


    SELECT capacity INTO v_capacity
    FROM Truck
    WHERE truck_id = p_truck_id;


    INSERT INTO Truck_Trip (truck_id, assistant_id, driver_id, route_id, date, state, cur_capacity)
    VALUES (p_truck_id, p_assistant_id, p_driver_id, p_route_id, NOW(), 0, v_capacity);


    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Assistant_Order_Details_By_Truck_Trip` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Assistant_Order_Details_By_Truck_Trip`(
    IN p_assistant_id VARCHAR(5)
)
BEGIN
    DECLARE v_route_id VARCHAR(10);


    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;


    START TRANSACTION;


    SELECT route_id
    INTO v_route_id
    FROM Truck_Trip
    WHERE assistant_id = p_assistant_id
    AND state = 0
    ORDER BY date DESC
    LIMIT 1;


    SELECT op.order_id, op.date, op.total_price, op.time, op.delivery_type, op.customer_id, op.product_id
    FROM Order_Product op
    WHERE op.route_id = v_route_id
    AND op.state = 3;


    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Available_Assistants` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Available_Assistants`()
BEGIN
    -- Select assistants who are not assigned to ongoing truck trips, have no future trips, and have worked less than 60 hours this week
    SELECT a.assistant_id, a.assistant_name, SUM(wh.worked_hours) AS total_hours
    FROM Assistant a
    LEFT JOIN Working_Hours_Assistant wh ON a.assistant_id = wh.assistant_id
    LEFT JOIN Truck_Trip tt ON a.assistant_id = tt.assistant_id
    WHERE a.assistant_id NOT IN (
        -- Exclude assistants with ongoing trips (state = 0)
        SELECT tt.assistant_id
        FROM Truck_Trip tt
        WHERE tt.state = 0
    )
    AND a.assistant_id NOT IN (
        -- Exclude assistants who completed two consecutive trips
        SELECT tt1.assistant_id
        FROM Truck_Trip tt1
        JOIN Truck_Trip tt2 ON tt1.assistant_id = tt2.assistant_id
        WHERE tt1.state = 1 AND tt2.state = 1  -- Both trips are completed
        AND tt1.date = (
            SELECT MAX(t1.date)
            FROM Truck_Trip t1
            WHERE t1.assistant_id = tt1.assistant_id AND t1.state = 1
        )
        AND tt2.date = (
            SELECT MAX(t2.date)
            FROM Truck_Trip t2
            WHERE t2.assistant_id = tt2.assistant_id AND t2.state = 1 AND t2.date < tt1.date
        )
    )
    AND NOT EXISTS (
        -- Exclude assistants who have future trips assigned after their last completed trip
        SELECT 1
        FROM Truck_Trip tt2
        WHERE tt2.assistant_id = a.assistant_id
        AND tt2.date > (
            -- Find the date of the last completed trip (state = 1)
            SELECT MAX(tt1.date)
            FROM Truck_Trip tt1
            WHERE tt1.assistant_id = a.assistant_id AND tt1.state = 1
        )
    )
    AND WEEK(wh.date) = WEEK(CURDATE())  -- Filter for the current week
    GROUP BY a.assistant_id, a.assistant_name
    HAVING total_hours < 60  -- Ensure assistants have worked less than 60 hours this week
    ORDER BY total_hours ASC;  -- Prioritize assistants with the fewest hours worked
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Available_Trucks_By_Branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Available_Trucks_By_Branch`(
    IN p_branch_id VARCHAR(6)
)
BEGIN
    -- Select trucks available by branch that are not on ongoing trips
    SELECT t.truck_id
    FROM Truck t
    WHERE t.branch_id = p_branch_id
    AND t.truck_id NOT IN (
        SELECT tt.truck_id
        FROM Truck_Trip tt
        WHERE tt.state = 0
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_customers_state_0` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_customers_state_0`(IN p_branch_id VARCHAR(6))
BEGIN
    SELECT *
    FROM Order_Product
    WHERE state = 0 AND branch_id = p_branch_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Lowest_Worked_Assistants_By_Route` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Lowest_Worked_Assistants_By_Route`(
    IN p_branch_id VARCHAR(6),
    IN p_route_id VARCHAR(10)
)
BEGIN
    DECLARE v_max_time_seconds INT;
    DECLARE v_last_id INT;
    DECLARE v_second_last_id INT;


    SELECT TIME_TO_SEC(max_time) INTO v_max_time_seconds
    FROM Route
    WHERE route_id = p_route_id;


    SELECT working_assistant_id INTO v_last_id
    FROM Working_Hours_Assistant
    ORDER BY date DESC, time DESC
    LIMIT 1;


    SELECT working_assistant_id INTO v_second_last_id
    FROM Working_Hours_Assistant
    WHERE working_assistant_id < v_last_id
    ORDER BY date DESC, time DESC
    LIMIT 1;


    SELECT 
        a.assistant_id, 
        a.name, 
        IFNULL(SUM(TIME_TO_SEC(wh.worked_hours)) / 3600, 0) AS total_hours_in_hours
    FROM Assistant a
    LEFT JOIN Working_Hours_Assistant wh ON a.assistant_id = wh.assistant_id
    WHERE a.branch_id = p_branch_id  
    AND (wh.date IS NULL OR WEEK(wh.date) = WEEK(CURDATE()))  
    AND a.assistant_id NOT IN (

        SELECT tt.assistant_id 
        FROM Truck_Trip tt 
        WHERE tt.state = 0
    )
    AND a.assistant_id NOT IN (

        SELECT wh2.assistant_id
        FROM Working_Hours_Assistant wh2
        WHERE wh2.working_assistant_id IN (v_last_id, v_second_last_id)
    )
    GROUP BY a.assistant_id, a.name
    HAVING total_hours_in_hours + (v_max_time_seconds / 3600) < 60  
    ORDER BY total_hours_in_hours ASC;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Lowest_Worked_Drivers_By_Route` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Lowest_Worked_Drivers_By_Route`(
    IN p_branch_id VARCHAR(6),
    IN p_route_id VARCHAR(10)
)
BEGIN
    DECLARE v_max_time_seconds INT;


    SELECT TIME_TO_SEC(max_time) INTO v_max_time_seconds
    FROM Route
    WHERE route_id = p_route_id;


    SELECT d.driver_id, d.name, SEC_TO_TIME(IFNULL(SUM(TIME_TO_SEC(wh.worked_hours)), 0)) AS total_hours
    FROM Driver d
    LEFT JOIN Working_Hours_Drivers wh ON d.driver_id = wh.driver_id
    WHERE d.branch_id = p_branch_id  
    AND (wh.date IS NULL OR WEEK(wh.date) = WEEK(CURDATE()))  
    AND d.driver_id NOT IN (

        SELECT tt.driver_id 
        FROM Truck_Trip tt 
        WHERE tt.state = 0
    )
    AND d.driver_id NOT IN (

        SELECT wh2.driver_id 
        FROM Working_Hours_Drivers wh2
        WHERE wh2.working_driver_id = (
            SELECT MAX(wh3.working_driver_id)
            FROM Working_Hours_Drivers wh3
        )
    )
    GROUP BY d.driver_id, d.name
    HAVING TIME_TO_SEC(total_hours) + v_max_time_seconds < 144000  
    ORDER BY total_hours ASC;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_orders_customer` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_orders_customer`(IN p_id VARCHAR(5))
BEGIN
    SELECT order_id, quantity, date, state, total_price, time, delivery_type, product_id
    FROM order_product
    WHERE customer_id = p_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Order_Details_By_Route_And_State2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Order_Details_By_Route_And_State2`(
    IN p_route_id VARCHAR(10)
)
BEGIN

    SELECT order_id, quantity, date, total_price, total_capacity, time, delivery_type, customer_id, product_id, branch_id
    FROM Order_Product
    WHERE route_id = p_route_id
    AND state = 2;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Routes_Not_In_Truck_Trip_Today_By_Branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Routes_Not_In_Truck_Trip_Today_By_Branch`(
    IN p_branch_id VARCHAR(6)
)
BEGIN

    SELECT r.route_name
    FROM Route r
    WHERE r.route_id NOT IN (
        SELECT tt.route_id
        FROM Truck_Trip tt
        WHERE DATE(tt.date) = CURDATE()
    )
    AND r.branch_id = p_branch_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Trains_Not_In_Trip_By_Date` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Trains_Not_In_Trip_By_Date`(
    IN p_date DATE
)
BEGIN
    SELECT train_id, end AS end_station, capacity
    FROM Train
    WHERE train_id NOT IN (
        SELECT train_id 
        FROM Train_Trip
        WHERE DATE(date) = p_date
    );
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Train_Trips_By_Date_And_Branch` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Train_Trips_By_Date_And_Branch`(
    IN p_date DATE,
    IN p_branch_id VARCHAR(6)
)
BEGIN

    SELECT train_trip_id, train_id, date, branch_id, cur_capacity
    FROM train_trip
    WHERE DATE(date) = p_date
    AND branch_id = p_branch_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Get_Truck_Trips_By_Branch_not_complete` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Truck_Trips_By_Branch_not_complete`(
    IN p_branch_id VARCHAR(6)
)
BEGIN

    SELECT truck_trip_id, truck_id, driver_id, assistant_id, route_id, cur_capacity, date
    FROM Truck_Trip
    WHERE state = 0
    AND branch_id = p_branch_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Delivery` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Delivery`(
    IN p_truck_trip_id INT,
    IN p_order_id INT
)
BEGIN
    DECLARE v_total_capacity INT;
    DECLARE v_customer_id INT;
    DECLARE v_route_id VARCHAR(10);
    DECLARE v_cur_capacity INT;


    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;


    START TRANSACTION;


    SELECT total_capacity, customer_id, route_id
    INTO v_total_capacity, v_customer_id, v_route_id
    FROM Order_Product
    WHERE order_id = p_order_id;


    SELECT cur_capacity
    INTO v_cur_capacity
    FROM Truck_Trip
    WHERE truck_trip_id = p_truck_trip_id;


    IF v_cur_capacity >= v_total_capacity THEN

        UPDATE Truck_Trip
        SET cur_capacity = cur_capacity - v_total_capacity
        WHERE truck_trip_id = p_truck_trip_id;


        INSERT INTO Delivery (truck_trip_id, customer_id, order_id, route_id, state, date)
        VALUES (p_truck_trip_id, v_customer_id, p_order_id, v_route_id, 0, CURDATE());


        UPDATE Order_Product
        SET state = 3
        WHERE order_id = p_order_id AND state = 2;


        COMMIT;
    ELSE

        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error: Truck capacity is insufficient for the order.';
    END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Train_Trip_By_Train` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Train_Trip_By_Train`(
    IN p_train_id VARCHAR(5),
    IN p_date DATE
)
BEGIN
    DECLARE v_branch_id VARCHAR(6);
    DECLARE v_capacity INT;
    DECLARE v_end_station VARCHAR(20);


    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;


    START TRANSACTION;


    SELECT b.branch_id, t.capacity, t.end_station
    INTO v_branch_id, v_capacity, v_end_station
    FROM train t
    JOIN branch b ON b.branch_name = t.end_station
    WHERE t.train_id = p_train_id;


    INSERT INTO train_Trip (train_id, date, branch_id, cur_capacity)
    VALUES (p_train_id, p_date, v_branch_id, v_capacity);


    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `search_order` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `search_order`(IN p_order_id INT)
BEGIN
    SELECT order_id, date, state, total_price, delivery_type
    FROM Order_Product
    WHERE order_id = p_order_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Update_Order3_4_And_Delivery_Status0_1_Delivered` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Order3_4_And_Delivery_Status0_1_Delivered`(
    IN p_order_id INT
)
BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;


    START TRANSACTION;


    UPDATE Order_Product
    SET state = 4
    WHERE order_id = p_order_id
    AND state = 3;


    UPDATE Delivery
    SET state = 1
    WHERE order_id = p_order_id
    AND state = 0;


    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Update_Order3_5_And_Delivery_Status0_2_Returned` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Order3_5_And_Delivery_Status0_2_Returned`(
    IN p_order_id INT
)
BEGIN

    -- Exit handler to catch SQL exceptions and roll back the transaction
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;

    -- Begin transaction
    START TRANSACTION;

    -- Update Order_Product where state is 3 to 5
    UPDATE Order_Product
    SET state = 5
    WHERE order_id = p_order_id
    AND state = 3;

    -- Update Delivery where state is 0 to 2
    UPDATE Delivery
    SET state = 2
    WHERE order_id = p_order_id
    AND state = 0;

    -- Commit the transaction if all updates succeed
    COMMIT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_order_state_0_to_1_and_insert_order_train` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_order_state_0_to_1_and_insert_order_train`(
    IN p_order_id VARCHAR(7),
    IN p_new_state INT,
    IN p_train_trip_id varchar(5)
)
BEGIN
   
    DECLARE exit handler for sqlexception
    BEGIN
        
        ROLLBACK;
        
        
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Transaction failed due to an SQL exception';
    END;

    START TRANSACTION;

   
    UPDATE Order_product
    SET state = p_new_state
    WHERE order_id = p_order_id;

 
    IF p_new_state = 1 THEN
        INSERT INTO Order_Train ( train_trip_id, order_id)
        VALUES ( p_train_trip_id, p_order_id);
    END IF;

    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Update_Order_State_To_2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Update_Order_State_To_2`(
    IN p_order_id INT -- Changed from VARCHAR(7) to INT
)
BEGIN

    UPDATE Order_Product
    SET state = 2
    WHERE order_id = p_order_id
    AND state = 1;


    IF ROW_COUNT() = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Error: No order found with the given order_id or state is not 1';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `assistant_details`
--

/*!50001 DROP VIEW IF EXISTS `assistant_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `assistant_details` AS select `assistant`.`assistant_id` AS `assistant_id`,`assistant`.`email` AS `email`,`assistant`.`name` AS `name`,`assistant`.`contact_number` AS `contact_number`,`assistant`.`branch_id` AS `branch_id` from `assistant` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `customer_details`
--

/*!50001 DROP VIEW IF EXISTS `customer_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `customer_details` AS select `customer`.`customer_id` AS `customer_id`,`customer`.`email` AS `email`,`customer`.`name` AS `name`,`customer`.`contact_number` AS `contact_number`,`customer`.`delivery_address` AS `delivery_address` from `customer` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `driver_details`
--

/*!50001 DROP VIEW IF EXISTS `driver_details`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `driver_details` AS select `driver`.`driver_id` AS `driver_id`,`driver`.`email` AS `email`,`driver`.`name` AS `name`,`driver`.`contact_number` AS `contact_number`,`driver`.`branch_id` AS `branch_id` from `driver` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-27 13:58:30
