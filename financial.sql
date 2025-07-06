-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: finance_planning
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `plan`
--

DROP TABLE IF EXISTS `plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `current_age` int NOT NULL,
  `retirement_age` int NOT NULL,
  `wist_to_live_till` int NOT NULL,
  `current_savings` decimal(15,2) NOT NULL,
  `inflation_rate` decimal(5,2) NOT NULL,
  `capital_gains_tax_rate` decimal(5,2) NOT NULL,
  `income_tax_rate` decimal(5,2) NOT NULL,
  `salary` decimal(15,2) NOT NULL,
  `bonus` decimal(15,2) NOT NULL,
  `investment_income` decimal(15,2) NOT NULL,
  `rental_income` decimal(15,2) NOT NULL,
  `other_income` decimal(15,2) NOT NULL,
  `housing_cost` decimal(15,2) NOT NULL,
  `transportation_cost` decimal(15,2) NOT NULL,
  `food_cost` decimal(15,2) NOT NULL,
  `utilities_cost` decimal(15,2) NOT NULL,
  `insurance_cost` decimal(15,2) NOT NULL,
  `entertainment_cost` decimal(15,2) NOT NULL,
  `healthcare_cost` decimal(15,2) NOT NULL,
  `debt_payments` decimal(15,2) NOT NULL,
  `vpf_epf_ppf_amount` decimal(15,2) NOT NULL,
  `vpf_epf_ppf_irr` decimal(5,2) NOT NULL,
  `recurring_deposit_amount` decimal(15,2) NOT NULL,
  `recurring_deposit_irr` decimal(5,2) NOT NULL,
  `government_bills_amount` decimal(15,2) NOT NULL,
  `government_bills_irr` decimal(5,2) NOT NULL,
  `gold_amount` decimal(15,2) NOT NULL,
  `gold_irr` decimal(5,2) NOT NULL,
  `corporate_bonds_amount` decimal(15,2) NOT NULL,
  `corporate_bonds_irr` decimal(5,2) NOT NULL,
  `largecap_mutual_fund_amount` decimal(15,2) NOT NULL,
  `largecap_mutual_fund_irr` decimal(5,2) NOT NULL,
  `direct_stocks_amount` decimal(15,2) NOT NULL,
  `direct_stocks_irr` decimal(5,2) NOT NULL,
  `smallcap_mutual_fund_amount` decimal(15,2) NOT NULL,
  `smallcap_mutual_fund_irr` decimal(5,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `plan_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan`
--

LOCK TABLES `plan` WRITE;
/*!40000 ALTER TABLE `plan` DISABLE KEYS */;
INSERT INTO `plan` VALUES (2,1,24,60,100,50000.00,7.00,20.00,10.00,40000.00,1000.00,500.00,10.00,0.00,6000.00,111.00,111.00,11.00,11.00,11.00,1.00,1.00,500.00,7.00,500.00,7.00,500.00,7.00,500.00,7.00,500.00,7.00,2000.00,12.00,1000.00,10.00,2000.00,16.00,'2025-07-06 19:27:55','2025-07-06 19:37:18'),(3,3,30,65,85,0.00,6.00,20.00,30.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7.00,0.00,7.00,0.00,7.00,0.00,7.00,20.00,7.00,0.00,12.00,220.00,10.00,10.00,18.00,'2025-07-06 21:28:54','2025-07-06 21:28:54'),(4,5,123,65,85,0.00,6.00,20.00,30.00,123123.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7.00,0.00,7.00,0.00,7.00,0.00,7.00,20.00,7.00,0.00,12.00,220.00,10.00,10.00,18.00,'2025-07-06 21:29:31','2025-07-06 21:29:36'),(5,6,12323,65,85,0.00,6.00,20.00,30.00,123123.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,7.00,0.00,7.00,0.00,7.00,0.00,7.00,20.00,7.00,0.00,12.00,220.00,10.00,10.00,18.00,'2025-07-06 21:31:25','2025-07-06 21:31:37');
/*!40000 ALTER TABLE `plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `email_id` varchar(100) NOT NULL,
  `type` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'naman','admin','2025-07-06 19:27:38','2025-07-06 21:11:35','naman@example.com',1),(2,'admin','admin','2025-07-06 19:27:38','2025-07-06 20:49:27','admin@example.com',2),(3,'bob','admin','2025-07-06 19:42:18','2025-07-06 21:28:47','bob@example.com',1),(4,'naman1','$2a$10$SbC2aQany3gzlJq08fUgUefg608r3s5IBAj1Tvm87TmNl9a60nb1y','2025-07-06 19:57:41','2025-07-06 19:57:41','naman1@example.com',1),(5,'naman2','$2a$10$wceRAFBx5vUIHzzn/bBUFu3kB.Ptff8r4leWsOmhbuvR4UgCB2A1W','2025-07-06 21:29:23','2025-07-06 21:30:20','naman2@example.com',1),(6,'namamn','$2a$10$fueyl2rMCDrpBNittcJD7.XWRqhcjozf0joekwfKeLUoWD1RAxg3i','2025-07-06 21:31:03','2025-07-06 21:31:45','naman3@example.com',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-07  3:05:32
