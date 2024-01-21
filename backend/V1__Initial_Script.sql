-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema alayde
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema alayde
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `alayde` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `alayde` ;

-- -----------------------------------------------------
-- Table `alayde`.`address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`address` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `city` VARCHAR(255) NOT NULL,
  `country` VARCHAR(255) NOT NULL,
  `latitude` DOUBLE NULL DEFAULT NULL,
  `longitude` DOUBLE NULL DEFAULT NULL,
  `postcode` VARCHAR(255) NOT NULL,
  `street_l1` VARCHAR(255) NOT NULL,
  `street_l2` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 51
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `category_title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `role_title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ikpaq20ybdpnppqng5bbn188m` (`role_title` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `firstname` VARCHAR(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NULL DEFAULT NULL,
  `address_id` BIGINT NULL DEFAULT NULL,
  `media_id` BIGINT NULL DEFAULT NULL,
  `role_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC) VISIBLE,
  UNIQUE INDEX `UK_si1iro9oa394kabk5aob8puem` (`media_id` ASC) VISIBLE,
  INDEX `FKddefmvbrws3hvl5t0hnnsv8ox` (`address_id` ASC) VISIBLE,
  INDEX `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FKckl2664alrm10nvld2d1ewa05`
    FOREIGN KEY (`media_id`)
    REFERENCES `alayde`.`media` (`id`),
  CONSTRAINT `FKddefmvbrws3hvl5t0hnnsv8ox`
    FOREIGN KEY (`address_id`)
    REFERENCES `alayde`.`address` (`id`),
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy`
    FOREIGN KEY (`role_id`)
    REFERENCES `alayde`.`role` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 54
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`media`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`media` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `base64content` VARCHAR(255) NULL DEFAULT NULL,
  `content_type` VARCHAR(255) NULL DEFAULT NULL,
  `data` LONGBLOB NULL DEFAULT NULL,
  `file_name` VARCHAR(255) NULL DEFAULT NULL,
  `url` VARCHAR(255) NULL DEFAULT NULL,
  `chat_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKpenbfvs2scby0lgdjaxhvchwo` (`chat_id` ASC) VISIBLE,
  INDEX `FK64mp2rjcwcgqpnu3weakxvwq0` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FK64mp2rjcwcgqpnu3weakxvwq0`
    FOREIGN KEY (`user_id`)
    REFERENCES `alayde`.`user` (`id`),
  CONSTRAINT `FKpenbfvs2scby0lgdjaxhvchwo`
    FOREIGN KEY (`chat_id`)
    REFERENCES `alayde`.`chat` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`priority`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`priority` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `priority_title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`status` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `status_title` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`ticket` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `archive_date` DATETIME(6) NULL DEFAULT NULL,
  `creation_date` DATETIME(6) NULL DEFAULT NULL,
  `description` VARCHAR(5000) NOT NULL,
  `ticket_title` VARCHAR(255) NOT NULL,
  `update_date` DATETIME(6) NULL DEFAULT NULL,
  `author_id` BIGINT NULL DEFAULT NULL,
  `category_id` BIGINT NOT NULL,
  `priority_id` BIGINT NOT NULL,
  `status_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKcyppkplfbc92v0xoju6j4bqxq` (`author_id` ASC) VISIBLE,
  INDEX `FK3g2gmlm6p2o4hc5oggcvq51x3` (`category_id` ASC) VISIBLE,
  INDEX `FK67q89ifbffc2rds9hvk9sywpw` (`priority_id` ASC) VISIBLE,
  INDEX `FK7h1wcba93khggbl1ahgwjlssu` (`status_id` ASC) VISIBLE,
  CONSTRAINT `FK3g2gmlm6p2o4hc5oggcvq51x3`
    FOREIGN KEY (`category_id`)
    REFERENCES `alayde`.`category` (`id`),
  CONSTRAINT `FK67q89ifbffc2rds9hvk9sywpw`
    FOREIGN KEY (`priority_id`)
    REFERENCES `alayde`.`priority` (`id`),
  CONSTRAINT `FK7h1wcba93khggbl1ahgwjlssu`
    FOREIGN KEY (`status_id`)
    REFERENCES `alayde`.`status` (`id`),
  CONSTRAINT `FKcyppkplfbc92v0xoju6j4bqxq`
    FOREIGN KEY (`author_id`)
    REFERENCES `alayde`.`user` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`chat` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(5000) NULL DEFAULT NULL,
  `sent_date` DATETIME(6) NULL DEFAULT NULL,
  `author_id` BIGINT NOT NULL,
  `media_id` BIGINT NULL DEFAULT NULL,
  `ticket_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKpi6wbwfasijlfbc64tk0sa4t9` (`author_id` ASC) VISIBLE,
  INDEX `FK87vukkk3wov21n90og92bdq52` (`media_id` ASC) VISIBLE,
  INDEX `FKbddfi5rin7my8lvtki9igfaq4` (`ticket_id` ASC) VISIBLE,
  CONSTRAINT `FK87vukkk3wov21n90og92bdq52`
    FOREIGN KEY (`media_id`)
    REFERENCES `alayde`.`media` (`id`),
  CONSTRAINT `FKbddfi5rin7my8lvtki9igfaq4`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `alayde`.`ticket` (`id`),
  CONSTRAINT `FKpi6wbwfasijlfbc64tk0sa4t9`
    FOREIGN KEY (`author_id`)
    REFERENCES `alayde`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`flyway_schema_history`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`flyway_schema_history` (
  `installed_rank` INT NOT NULL,
  `version` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(200) NOT NULL,
  `type` VARCHAR(20) NOT NULL,
  `script` VARCHAR(1000) NOT NULL,
  `checksum` INT NULL DEFAULT NULL,
  `installed_by` VARCHAR(100) NOT NULL,
  `installed_on` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `execution_time` INT NOT NULL,
  `success` TINYINT(1) NOT NULL,
  PRIMARY KEY (`installed_rank`),
  INDEX `flyway_schema_history_s_idx` (`success` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`global_historical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`global_historical` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `action` VARCHAR(255) NULL DEFAULT NULL,
  `is_read` BIT(1) NOT NULL,
  `ticket_id` BIGINT NULL DEFAULT NULL,
  `ticket_title` VARCHAR(255) NULL DEFAULT NULL,
  `timestamp` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`ticket_developer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`ticket_developer` (
  `ticket_id` BIGINT NOT NULL,
  `developer_id` BIGINT NOT NULL,
  INDEX `FKhntq1a7u200rurkv9uqd8e92p` (`developer_id` ASC) VISIBLE,
  INDEX `FKpo3oefxb42tyr3hnaxvgha4it` (`ticket_id` ASC) VISIBLE,
  CONSTRAINT `FKhntq1a7u200rurkv9uqd8e92p`
    FOREIGN KEY (`developer_id`)
    REFERENCES `alayde`.`user` (`id`),
  CONSTRAINT `FKpo3oefxb42tyr3hnaxvgha4it`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `alayde`.`ticket` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`ticket_historical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`ticket_historical` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `action` VARCHAR(255) NULL DEFAULT NULL,
  `is_read` BIT(1) NOT NULL,
  `ticket_id` BIGINT NULL DEFAULT NULL,
  `ticket_title` VARCHAR(255) NULL DEFAULT NULL,
  `timestamp` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`user_historical`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`user_historical` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `action` VARCHAR(255) NULL DEFAULT NULL,
  `is_read` BIT(1) NOT NULL,
  `ticket_id` BIGINT NULL DEFAULT NULL,
  `ticket_title` VARCHAR(255) NULL DEFAULT NULL,
  `timestamp` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  `user_name` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 201
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
