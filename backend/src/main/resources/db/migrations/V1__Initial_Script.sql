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
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `category_title` ENUM('BILLING', 'DEFAULT', 'FEATURE', 'TECHNICAL') NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`chat` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NULL DEFAULT NULL,
  `receiver` VARCHAR(255) NULL DEFAULT NULL,
  `sender` VARCHAR(255) NULL DEFAULT NULL,
  `timestamp` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
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
-- Table `alayde`.`priority`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`priority` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `priority_title` ENUM('DEFAULT', 'HIGH', 'LOW', 'MEDIUM') NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `role_title` ENUM('CLIENT', 'DEVELOPER', 'MANAGER') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`status` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `status_title` ENUM('DOING', 'DONE', 'TO_DO') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
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
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_ob8kqyqqgmefl0aco34akdtpe` (`email` ASC) VISIBLE,
  INDEX `FKn82ha3ccdebhokx3a8fgdqeyy` (`role_id` ASC) VISIBLE,
  CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy`
    FOREIGN KEY (`role_id`)
    REFERENCES `alayde`.`role` (`id`))
ENGINE = InnoDB
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
  `category_id` BIGINT NULL DEFAULT NULL,
  `priority_id` BIGINT NULL DEFAULT NULL,
  `status_id` BIGINT NULL DEFAULT NULL,
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
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`ticket_have_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`ticket_have_users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `ticket_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKg928j3l9199p0wkfiy871k5ih` (`ticket_id` ASC) VISIBLE,
  INDEX `FKlgthyufe1sy660e4aqkalpunl` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKg928j3l9199p0wkfiy871k5ih`
    FOREIGN KEY (`ticket_id`)
    REFERENCES `alayde`.`ticket` (`id`),
  CONSTRAINT `FKlgthyufe1sy660e4aqkalpunl`
    FOREIGN KEY (`user_id`)
    REFERENCES `alayde`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `alayde`.`user_address`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `alayde`.`user_address` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `address_id` BIGINT NULL DEFAULT NULL,
  `user_id` BIGINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKdaaxogn1ss81gkcsdn05wi6jp` (`address_id` ASC) VISIBLE,
  INDEX `FKk2ox3w9jm7yd6v1m5f68xibry` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKdaaxogn1ss81gkcsdn05wi6jp`
    FOREIGN KEY (`address_id`)
    REFERENCES `alayde`.`address` (`id`),
  CONSTRAINT `FKk2ox3w9jm7yd6v1m5f68xibry`
    FOREIGN KEY (`user_id`)
    REFERENCES `alayde`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
