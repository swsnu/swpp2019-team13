-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: club4u
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add category',7,'add_category'),(26,'Can change category',7,'change_category'),(27,'Can delete category',7,'delete_category'),(28,'Can view category',7,'view_category'),(29,'Can add club',8,'add_club'),(30,'Can change club',8,'change_club'),(31,'Can delete club',8,'delete_club'),(32,'Can view club',8,'view_club'),(33,'Can add department',9,'add_department'),(34,'Can change department',9,'change_department'),(35,'Can delete department',9,'delete_department'),(36,'Can view department',9,'view_department'),(37,'Can add major',10,'add_major'),(38,'Can change major',10,'change_major'),(39,'Can delete major',10,'delete_major'),(40,'Can view major',10,'view_major'),(41,'Can add user profile',11,'add_userprofile'),(42,'Can change user profile',11,'change_userprofile'),(43,'Can delete user profile',11,'delete_userprofile'),(44,'Can view user profile',11,'view_userprofile'),(45,'Can add somoim',12,'add_somoim'),(46,'Can change somoim',12,'change_somoim'),(47,'Can delete somoim',12,'delete_somoim'),(48,'Can view somoim',12,'view_somoim'),(49,'Can add tag',13,'add_tag'),(50,'Can change tag',13,'change_tag'),(51,'Can delete tag',13,'delete_tag'),(52,'Can view tag',13,'view_tag'),(53,'Can add user like somoim',14,'add_userlikesomoim'),(54,'Can change user like somoim',14,'change_userlikesomoim'),(55,'Can delete user like somoim',14,'delete_userlikesomoim'),(56,'Can view user like somoim',14,'view_userlikesomoim'),(57,'Can add user like club',15,'add_userlikeclub'),(58,'Can change user like club',15,'change_userlikeclub'),(59,'Can delete user like club',15,'delete_userlikeclub'),(60,'Can view user like club',15,'view_userlikeclub'),(61,'Can add user join somoim',16,'add_userjoinsomoim'),(62,'Can change user join somoim',16,'change_userjoinsomoim'),(63,'Can delete user join somoim',16,'delete_userjoinsomoim'),(64,'Can view user join somoim',16,'view_userjoinsomoim'),(65,'Can add user apply club',17,'add_userapplyclub'),(66,'Can change user apply club',17,'change_userapplyclub'),(67,'Can delete user apply club',17,'delete_userapplyclub'),(68,'Can view user apply club',17,'view_userapplyclub'),(69,'Can add pre club',18,'add_preclub'),(70,'Can change pre club',18,'change_preclub'),(71,'Can delete pre club',18,'delete_preclub'),(72,'Can view pre club',18,'view_preclub');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_category`
--

DROP TABLE IF EXISTS `club4u_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_category`
--

LOCK TABLES `club4u_category` WRITE;
/*!40000 ALTER TABLE `club4u_category` DISABLE KEYS */;
INSERT INTO `club4u_category` VALUES (1,'학술매체'),(2,'취미교양'),(3,'연행예술'),(4,'인권봉사'),(5,'무예운동'),(6,'종교'),(7,'운동부');
/*!40000 ALTER TABLE `club4u_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_club`
--

DROP TABLE IF EXISTS `club4u_club`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_club` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `summary` longtext COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `poster_img` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `likes` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_club_category_id_0ffaa8f3_fk_club4u_category_id` (`category_id`),
  CONSTRAINT `club4u_club_category_id_0ffaa8f3_fk_club4u_category_id` FOREIGN KEY (`category_id`) REFERENCES `club4u_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_club`
--

LOCK TABLES `club4u_club` WRITE;
/*!40000 ALTER TABLE `club4u_club` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_club` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_department`
--

DROP TABLE IF EXISTS `club4u_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_department`
--

LOCK TABLES `club4u_department` WRITE;
/*!40000 ALTER TABLE `club4u_department` DISABLE KEYS */;
INSERT INTO `club4u_department` VALUES (1,'공과대학'),(2,'인문대학'),(3,'자연과학대학'),(4,'사회과학대학'),(5,'경영대학'),(6,'농업생명과학대학'),(7,'사범대학'),(8,'생활과학대학'),(9,'의과대학'),(10,'수의과대학'),(11,'약학대학'),(12,'간호대학'),(13,'음학대학'),(14,'미술대학'),(15,'자유전공학부');
/*!40000 ALTER TABLE `club4u_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_major`
--

DROP TABLE IF EXISTS `club4u_major`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_major` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_id` int(11) DEFAULT NULL,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_major_dept_id_0df9231c_fk_club4u_department_id` (`dept_id`),
  CONSTRAINT `club4u_major_dept_id_0df9231c_fk_club4u_department_id` FOREIGN KEY (`dept_id`) REFERENCES `club4u_department` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_major`
--

LOCK TABLES `club4u_major` WRITE;
/*!40000 ALTER TABLE `club4u_major` DISABLE KEYS */;
INSERT INTO `club4u_major` VALUES (1,1,'건설환경공학부'),(2,1,'기계항공공학부'),(3,1,'재료공학부'),(4,1,'전기정보공학부'),(5,1,'컴퓨터공학부'),(6,1,'화학생물공학부'),(7,1,'건축학과(건축학,건축공학)'),(8,1,'산업공학과'),(9,1,'에너지자원공학과'),(10,1,'원자핵공학과'),(11,1,'조선해양공학과'),(12,2,'국어국문학과'),(13,2,'중어국문학과'),(14,2,'영어영문학과'),(27,3,'수리과학부'),(28,3,'통계학과'),(29,3,'물리천문학부(물리학전공)'),(37,4,'정치외교학부'),(38,4,'경제학부'),(39,4,'사회학과'),(47,5,'경영학과'),(48,6,'농경제사회학부'),(49,6,'식물생산과학부'),(50,6,'산림과학부'),(55,7,'교육학과'),(56,7,'국어교육과'),(57,7,'영어교육과'),(70,8,'소비자아동학부'),(71,8,'식품영양학과'),(72,8,'의류학과'),(73,9,'의예과'),(74,9,'의학과'),(75,10,'수의예과'),(76,10,'수의학과'),(77,11,'약학과'),(78,11,'제약학과'),(79,12,'간호학과'),(80,13,'성악과'),(81,13,'작곡과'),(82,13,'기악과'),(83,13,'국악과'),(84,14,'디자인학부'),(85,14,'동양화과'),(86,14,'서양화과'),(87,14,'조소과'),(88,15,'자유전공학부');
/*!40000 ALTER TABLE `club4u_major` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_preclub`
--

DROP TABLE IF EXISTS `club4u_preclub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_preclub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `category_id` int(11) NOT NULL,
  `manager` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `auth_img` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_preclub_category_id_3df777ae_fk_club4u_category_id` (`category_id`),
  CONSTRAINT `club4u_preclub_category_id_3df777ae_fk_club4u_category_id` FOREIGN KEY (`category_id`) REFERENCES `club4u_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_preclub`
--

LOCK TABLES `club4u_preclub` WRITE;
/*!40000 ALTER TABLE `club4u_preclub` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_preclub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_somoim`
--

DROP TABLE IF EXISTS `club4u_somoim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_somoim` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `summary` longtext COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `goalJoiner` int(11) NOT NULL,
  `currentJoiner` int(11) NOT NULL,
  `likes` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_somoim_author_id_04f06f0a_fk_club4u_userprofile_id` (`author_id`),
  KEY `club4u_somoim_category_id_facb4730_fk_club4u_category_id` (`category_id`),
  CONSTRAINT `club4u_somoim_author_id_04f06f0a_fk_club4u_userprofile_id` FOREIGN KEY (`author_id`) REFERENCES `club4u_userprofile` (`id`),
  CONSTRAINT `club4u_somoim_category_id_facb4730_fk_club4u_category_id` FOREIGN KEY (`category_id`) REFERENCES `club4u_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_somoim`
--

LOCK TABLES `club4u_somoim` WRITE;
/*!40000 ALTER TABLE `club4u_somoim` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_somoim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_tag`
--

DROP TABLE IF EXISTS `club4u_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_tag`
--

LOCK TABLES `club4u_tag` WRITE;
/*!40000 ALTER TABLE `club4u_tag` DISABLE KEYS */;
INSERT INTO `club4u_tag` VALUES (1,'친목'),(2,'연애'),(3,'운동'),(4,'게임'),(5,'학술'),(6,'음악'),(7,'미술'),(8,'낫띵');
/*!40000 ALTER TABLE `club4u_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_userapplyclub`
--

DROP TABLE IF EXISTS `club4u_userapplyclub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_userapplyclub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_userapplyclub_club_id_b62f98a0_fk_club4u_club_id` (`club_id`),
  KEY `club4u_userapplyclub_user_id_c9636656_fk_club4u_userprofile_id` (`user_id`),
  CONSTRAINT `club4u_userapplyclub_club_id_b62f98a0_fk_club4u_club_id` FOREIGN KEY (`club_id`) REFERENCES `club4u_club` (`id`),
  CONSTRAINT `club4u_userapplyclub_user_id_c9636656_fk_club4u_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `club4u_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_userapplyclub`
--

LOCK TABLES `club4u_userapplyclub` WRITE;
/*!40000 ALTER TABLE `club4u_userapplyclub` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_userapplyclub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_userjoinsomoim`
--

DROP TABLE IF EXISTS `club4u_userjoinsomoim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_userjoinsomoim` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `somoim_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_userjoinsomoim_somoim_id_f7355614_fk_club4u_somoim_id` (`somoim_id`),
  KEY `club4u_userjoinsomoim_user_id_da1d1955_fk_club4u_userprofile_id` (`user_id`),
  CONSTRAINT `club4u_userjoinsomoim_somoim_id_f7355614_fk_club4u_somoim_id` FOREIGN KEY (`somoim_id`) REFERENCES `club4u_somoim` (`id`),
  CONSTRAINT `club4u_userjoinsomoim_user_id_da1d1955_fk_club4u_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `club4u_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_userjoinsomoim`
--

LOCK TABLES `club4u_userjoinsomoim` WRITE;
/*!40000 ALTER TABLE `club4u_userjoinsomoim` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_userjoinsomoim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_userlikeclub`
--

DROP TABLE IF EXISTS `club4u_userlikeclub`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_userlikeclub` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `club_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_userlikeclub_club_id_5ba91beb_fk_club4u_club_id` (`club_id`),
  KEY `club4u_userlikeclub_user_id_68b01096_fk_club4u_userprofile_id` (`user_id`),
  CONSTRAINT `club4u_userlikeclub_club_id_5ba91beb_fk_club4u_club_id` FOREIGN KEY (`club_id`) REFERENCES `club4u_club` (`id`),
  CONSTRAINT `club4u_userlikeclub_user_id_68b01096_fk_club4u_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `club4u_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_userlikeclub`
--

LOCK TABLES `club4u_userlikeclub` WRITE;
/*!40000 ALTER TABLE `club4u_userlikeclub` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_userlikeclub` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_userlikesomoim`
--

DROP TABLE IF EXISTS `club4u_userlikesomoim`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_userlikesomoim` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `somoim_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `club4u_userlikesomoim_somoim_id_b5f4d229_fk_club4u_somoim_id` (`somoim_id`),
  KEY `club4u_userlikesomoim_user_id_e388791b_fk_club4u_userprofile_id` (`user_id`),
  CONSTRAINT `club4u_userlikesomoim_somoim_id_b5f4d229_fk_club4u_somoim_id` FOREIGN KEY (`somoim_id`) REFERENCES `club4u_somoim` (`id`),
  CONSTRAINT `club4u_userlikesomoim_user_id_e388791b_fk_club4u_userprofile_id` FOREIGN KEY (`user_id`) REFERENCES `club4u_userprofile` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_userlikesomoim`
--

LOCK TABLES `club4u_userlikesomoim` WRITE;
/*!40000 ALTER TABLE `club4u_userlikesomoim` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_userlikesomoim` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `club4u_userprofile`
--

DROP TABLE IF EXISTS `club4u_userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `club4u_userprofile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `dept_id` int(11) DEFAULT NULL,
  `major_id` int(11) DEFAULT NULL,
  `grade` int(11) NOT NULL,
  `available_semester` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  KEY `club4u_userprofile_dept_id_e3ed4100_fk_club4u_department_id` (`dept_id`),
  KEY `club4u_userprofile_major_id_5400990a_fk_club4u_department_id` (`major_id`),
  CONSTRAINT `club4u_userprofile_dept_id_e3ed4100_fk_club4u_department_id` FOREIGN KEY (`dept_id`) REFERENCES `club4u_department` (`id`),
  CONSTRAINT `club4u_userprofile_major_id_5400990a_fk_club4u_department_id` FOREIGN KEY (`major_id`) REFERENCES `club4u_department` (`id`),
  CONSTRAINT `club4u_userprofile_user_id_9410101a_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `club4u_userprofile`
--

LOCK TABLES `club4u_userprofile` WRITE;
/*!40000 ALTER TABLE `club4u_userprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `club4u_userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(7,'club4u','category'),(8,'club4u','club'),(9,'club4u','department'),(10,'club4u','major'),(18,'club4u','preclub'),(12,'club4u','somoim'),(13,'club4u','tag'),(17,'club4u','userapplyclub'),(16,'club4u','userjoinsomoim'),(15,'club4u','userlikeclub'),(14,'club4u','userlikesomoim'),(11,'club4u','userprofile'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-10-31 15:50:02.695018'),(2,'auth','0001_initial','2019-10-31 15:50:02.864710'),(3,'admin','0001_initial','2019-10-31 15:50:03.217087'),(4,'admin','0002_logentry_remove_auto_add','2019-10-31 15:50:03.314931'),(5,'admin','0003_logentry_add_action_flag_choices','2019-10-31 15:50:03.335017'),(6,'contenttypes','0002_remove_content_type_name','2019-10-31 15:50:03.423963'),(7,'auth','0002_alter_permission_name_max_length','2019-10-31 15:50:03.470893'),(8,'auth','0003_alter_user_email_max_length','2019-10-31 15:50:03.528075'),(9,'auth','0004_alter_user_username_opts','2019-10-31 15:50:03.548355'),(10,'auth','0005_alter_user_last_login_null','2019-10-31 15:50:03.595989'),(11,'auth','0006_require_contenttypes_0002','2019-10-31 15:50:03.600849'),(12,'auth','0007_alter_validators_add_error_messages','2019-10-31 15:50:03.623474'),(13,'auth','0008_alter_user_username_max_length','2019-10-31 15:50:03.675533'),(14,'auth','0009_alter_user_last_name_max_length','2019-10-31 15:50:03.715526'),(15,'auth','0010_alter_group_name_max_length','2019-10-31 15:50:03.770932'),(16,'auth','0011_update_proxy_permissions','2019-10-31 15:50:03.792452'),(17,'club4u','0001_initial','2019-10-31 15:50:04.174291'),(18,'sessions','0001_initial','2019-10-31 15:50:04.785554');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-01  1:01:22
