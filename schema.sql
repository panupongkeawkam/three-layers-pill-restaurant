SET
  FOREIGN_KEY_CHECKS = 0;

DROP SCHEMA IF EXISTS `dbsc`;

CREATE SCHEMA `dbsc`;

USE `dbsc`;

DROP TABLE IF EXISTS `account`;

CREATE TABLE `account` (
  `account_id` INT(10) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `employee_id` INT(10) NOT NULL,
  PRIMARY KEY (`account_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) AUTO_INCREMENT = 11;

INSERT INTO
  `account`
VALUES
  (
    1,
    'Somsri_Roksuay',
    'Somsri5134',
    2
  ),
  (2, 'Somsak_Nokaew', 'Somsak2321', 1),
  (3, 'Udom_Omdu', 'Udom8755', 5),
  (4, 'Somkuan_Narok', 'Narok3476', 3),
  (5, 'Champi_Champa', 'Champi7112', 8),
  (6, 'Mana_Mena', 'Mana6279', 7),
  (
    7,
    'Somrak_Nakmuay',
    'Somrak0383',
    9
  ),
  (8, 'Deejai_Jaidee', 'Deejai2111', 4),
  (9, 'Kiti_Mesa', 'Kiti3073', 10),
  (10, 'Vichai_Madee', 'Vichai5678', 6);

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `customer_id` int(10) NOT NULL AUTO_INCREMENT,
  `type` enum('member', 'normal') NOT NULL,
  PRIMARY KEY (`customer_id`)
) AUTO_INCREMENT = 16;

INSERT INTO
  `customer`
VALUES
  (1, 'normal'),
  (2, 'member'),
  (3, 'member'),
  (4, 'normal'),
  (5, 'member'),
  (6, 'member'),
  (7, 'member'),
  (8, 'normal'),
  (9, 'normal'),
  (10, 'member'),
  (11, 'member'),
  (12, 'member'),
  (13, 'normal'),
  (14, 'member'),
  (15, 'member');

DROP TABLE IF EXISTS `customer_member`;

CREATE TABLE `customer_member` (
  `phone_number` VARCHAR(11) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fname` VARCHAR(255) NOT NULL,
  `lname` VARCHAR(255) NOT NULL,
  `card_id` CHAR(13) NOT NULL UNIQUE,
  `customer_id` INT(10) NOT NULL,
  PRIMARY KEY (`customer_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`)
);

INSERT INTO
  `customer_member`
VALUES
  (
    '0612212258',
    'Muu2258',
    'Sukorn',
    'Muu',
    '3657268616073',
    2
  ),
  (
    '0816522855',
    'Saard2855',
    'Kasem',
    'Saard',
    '7610032757460',
    3
  ),
  (
    '0913375233',
    'Saelee5233',
    'Lim',
    'Saelee',
    '7223551350120',
    5
  ),
  (
    '0882366678',
    'Charuek6678',
    'Sira',
    'Charuek',
    '8847283354865',
    6
  ),
  (
    '0918823656',
    'Pradoy3656',
    'Pradist',
    'Pradoy',
    '3851088723044',
    7
  ),
  (
    '0812359878',
    'Namthip9878',
    'Uthai',
    'Namthip',
    '5546030744107',
    10
  ),
  (
    '0836955169',
    'Worapon5169',
    'Worapon',
    'Kondee',
    '3534727388766',
    11
  ),
  (
    '0923687911',
    'Chaya7911',
    'Chaya',
    'Chayen',
    '3813453761046',
    12
  ),
  (
    '0998546123',
    'Sompong6123',
    'Sompong',
    'Sukson',
    '3736037871343',
    14
  ),
  (
    '0654879229',
    'Suvit9229',
    'Suvit',
    'Kitdee',
    '3857201672620',
    15
  );

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `employee_id` int(10) NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `address` varchar(255),
  `phone` varchar(11),
  `salary` float(8, 2),
  `role` enum(
    'chef',
    'waitress',
    'cleaner',
    'service_staff'
  ) NOT NULL,
  PRIMARY KEY (`employee_id`)
) AUTO_INCREMENT = 11;

INSERT INTO
  `employee`
VALUES
  (
    1,
    'Somsak',
    'Nokaew',
    '900/30 Bangkok',
    '0909012321',
    6000.00,
    'chef'
  ),
  (
    2,
    'Somsri',
    'Roksuay',
    '255/40 Sakon',
    '0252345134',
    12000.00,
    'waitress'
  ),
  (
    3,
    'Somkuan',
    'Narok',
    '42/20 Samut Prakan',
    '0235323476',
    4000.00,
    'service_staff'
  ),
  (
    4,
    'Deejai',
    'Jaidee',
    '123/30 Bangkok',
    '0822212111',
    6000.00,
    'chef'
  ),
  (
    5,
    'Udom',
    'Omdu',
    '388/12 Chiang Mai',
    '0681188755',
    4000.00,
    'service_staff'
  ),
  (
    6,
    'Vichai',
    'Medee',
    '99/99 Kamphaeng Phet',
    '0812345678',
    6000.00,
    'chef'
  ),
  (
    7,
    'Mana',
    'Mena',
    '22/55 Chiang Rai',
    '0624436279',
    12000.00,
    'waitress'
  ),
  (
    8,
    'Champi',
    'Champa',
    '45/70 Tak',
    '0815777112',
    8000.00,
    'cleaner'
  ),
  (
    9,
    'Somrak',
    'Nakmuay',
    '655/53 Nakhon Sawan',
    '0619870383',
    8000.00,
    'cleaner'
  ),
  (
    10,
    'Kiti',
    'Mesa',
    '76/90 Nan',
    '0826563073',
    4000.00,
    'waitress'
  );

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `menu_id` INT(10) NOT NULL AUTO_INCREMENT,
  `menu_name` VARCHAR(255),
  `menu_price` FLOAT(8, 2),
  `member_price` FLOAT(8, 2),
  `menu_status` ENUM('ready', 'not_ready'),
  `employee_id` INT(10) NOT NULL,
  PRIMARY KEY (`menu_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) AUTO_INCREMENT = 11;

INSERT INTO
  `menu`
VALUES
  (
    1,
    'Fried rice',
    100.00,
    80.00,
    'ready',
    5
  ),
  (
    2,
    'Sour prawn soup',
    150.00,
    140.00,
    'ready',
    5
  ),
  (
    3,
    'Fried chicken',
    80.00,
    65.00,
    'ready',
    5
  ),
  (
    4,
    'Charcoal-boiled pork neck',
    90.00,
    75.00,
    'ready',
    5
  ),
  (
    5,
    'Casseroled prawns/shrimps with glass noodles',
    120.00,
    100.00,
    'ready',
    5
  ),
  (
    6,
    'Fried fish toppted with chilli sauce',
    130.00,
    120.00,
    'ready',
    5
  ),
  (
    7,
    'Chicken Green Curry',
    100.00,
    90.00,
    'ready',
    5
  ),
  (
    8,
    'Orange juice',
    30.00,
    20.00,
    'ready',
    5
  ),
  (
    9,
    'Iced tea',
    25.00,
    20.00,
    'ready',
    5
  ),
  (10, 'Cola', 25.00, 20.00, 'ready', 5),
  (11, 'Banana', 7.00, 7.00, 'not_ready', 5);

DROP TABLE IF EXISTS `order`;

CREATE TABLE `order` (
  `order_id` INT(10) AUTO_INCREMENT,
  `total_price` FLOAT(8, 2),
  `quantity_item` INT(10),
  `status` ENUM('created', 'pending', 'served', 'completed'),
  `check_in` DATETIME,
  `check_out` DATETIME,
  `customer_id` INT(10) NOT NULL,
  `employee_id` INT(10) NOT NULL,
  `table_id` INT(10) NOT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  FOREIGN KEY (`table_id`) REFERENCES `table` (`table_id`)
) AUTO_INCREMENT = 11;

INSERT INTO
  `order`
VALUES
  (
    1,
    250.00,
    2,
    'completed',
    '2022-01-01 12:00:00',
    '2022-01-01 14:00:00',
    1,
    3,
    4
  ),
  (
    2,
    400.00,
    5,
    'completed',
    '2022-01-01 14:00:00',
    '2022-01-01 15:30:00',
    1,
    3,
    8
  ),
  (
    3,
    60.00,
    3,
    'completed',
    '2022-02-11 16:00:00',
    '2022-02-11 17:00:00',
    5,
    3,
    1
  ),
  (
    4,
    210.00,
    5,
    'completed',
    '2022-03-12 13:00:00',
    '2022-03-12 15:00:00',
    2,
    3,
    8
  ),
  (
    5,
    210.00,
    3,
    'completed',
    '2022-03-13 12:00:00',
    '2022-03-13 13:00:00',
    1,
    3,
    2
  ),
  (
    6,
    1500.00,
    13,
    'completed',
    '2022-03-14 09:00:00',
    '2022-03-14 11:10:00',
    6,
    3,
    5
  ),
  (
    7,
    370.00,
    3,
    'created',
    '2022-03-14 13:00:00',
    NULL,
    2,
    3,
    2
  ),
  (
    8,
    460.00,
    4,
    'served',
    '2022-03-14 15:00:00',
    NULL,
    3,
    3,
    13
  ),
  (
    9,
    120.00,
    3,
    'created',
    '2022-03-14 12:45:00',
    NULL,
    4,
    3,
    10
  ),
  (
    10,
    170.00,
    4,
    'pending',
    '2022-03-14 15:00:00',
    NULL,
    6,
    3,
    8
  );

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `item_no` int(10) NOT NULL AUTO_INCREMENT,
  `total_price` float(8, 2),
  `amount` int(10),
  `price` float(8, 2),
  `order_id` int(10) NOT NULL,
  `menu_id` int(10) NOT NULL,
  PRIMARY KEY (`item_no`, `order_id`),
  FOREIGN KEY (`menu_id`) REFERENCES `menu` (`menu_id`)
) AUTO_INCREMENT = 23;

INSERT INTO
  `order_item`
VALUES
  (1, 100.00, 1, 100.00, 1, 1),
  (2, 150.00, 1, 150.00, 1, 2),
  (3, 160.00, 2, 80.00, 2, 3),
  (4, 240.00, 3, 80.00, 2, 1),
  (5, 40.00, 2, 20.00, 3, 10),
  (6, 20.00, 1, 20.00, 3, 9),
  (7, 60.00, 3, 20.00, 4, 8),
  (8, 150.00, 2, 75.00, 4, 4),
  (9, 180.00, 2, 90.00, 5, 3),
  (10, 30.00, 1, 30.00, 5, 8),
  (11, 100.00, 1, 100.00, 6, 5),
  (12, 240.00, 2, 120.00, 6, 6),
  (13, 40.00, 2, 20.00, 6, 10),
  (14, 1120.00, 8, 140, 6, 2),
  (15, 90.00, 1, 90.00, 7, 7),
  (16, 280.00, 2, 140.00, 7, 2),
  (17, 200.00, 2, 100.00, 8, 1),
  (18, 260.00, 2, 130.00, 8, 6),
  (19, 40.00, 2, 20.00, 9, 10),
  (20, 80.00, 1, 80.00, 9, 1),
  (21, 80.00, 1, 80.00, 10, 3),
  (22, 90.00, 3, 30.00, 10, 8);

DROP TABLE IF EXISTS `receipt`;

CREATE TABLE `receipt` (
  `receipt_id` INT(10) NOT NULL AUTO_INCREMENT,
  `total_price` FLOAT(8, 2),
  `date_create` DATETIME,
  `receipt_no` CHAR(10) UNIQUE,
  `order_id` INT(10) NOT NULL,
  PRIMARY KEY (`receipt_id`),
  FOREIGN KEY (`order_id`) REFERENCES `order` (`order_id`)
) AUTO_INCREMENT = 11;

INSERT INTO
  `receipt`
VALUES
  (
    1,
    250.00,
    '2022-01-01 14:00:00',
    '6451845751',
    1
  ),
  (
    2,
    400.00,
    '2022-01-01 15:30:00',
    '2254815495',
    2
  ),
  (
    3,
    60.00,
    '2022-02-11 17:00:00',
    '5481544754',
    3
  ),
  (
    4,
    210.00,
    '2022-03-12 15:00:00',
    '2154875465',
    4
  ),
  (
    5,
    210.00,
    '2022-03-13 13:00:00',
    '5481546754',
    5
  ),
  (
    6,
    1500.00,
    '2022-03-14 11:10:00',
    '4484154741',
    6
  );

DROP TABLE IF EXISTS `table`;

CREATE TABLE `table` (
  `table_id` int(10) AUTO_INCREMENT,
  `number_of_seat` int(10),
  `table_name` varchar(255),
  `status` enum('ready', 'not_ready') NOT NULL,
  PRIMARY KEY (`table_id`)
) AUTO_INCREMENT = 16;

INSERT INTO
  `table`
VALUES
  (1, 2, 'table1', 'ready'),
  (2, 4, 'table2', 'not_ready'),
  (3, 8, 'table3', 'ready'),
  (4, 2, 'table4', 'ready'),
  (5, 4, 'table5', 'ready'),
  (6, 8, 'table6', 'ready'),
  (7, 2, 'table7', 'ready'),
  (8, 4, 'table8', 'not_ready'),
  (9, 8, 'table9', 'ready'),
  (10, 2, 'table10', 'not_ready'),
  (11, 4, 'table11', 'ready'),
  (12, 8, 'table12', 'ready'),
  (13, 2, 'table13', 'not_ready'),
  (14, 4, 'table14', 'ready'),
  (15, 8, 'table15', 'ready');

SET
  FOREIGN_KEY_CHECKS = 1;