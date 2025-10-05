/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80025 (8.0.25)
 Source Host           : localhost:3306
 Source Schema         : charityevents_db

 Target Server Type    : MySQL
 Target Server Version : 80025 (8.0.25)
 File Encoding         : 65001

 Date: 30/09/2025 22:40:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for categories
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of categories
-- ----------------------------
INSERT INTO `categories` VALUES (1, 'Running', 'Running charity events', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `categories` VALUES (2, 'Gala Dinner', 'Gala dinner charity events', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `categories` VALUES (3, 'Auction', 'Auction charity events', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `categories` VALUES (4, 'Concert', 'Concert charity events', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `categories` VALUES (5, 'Charity Sale', 'Charity sale events', '2025-09-30 02:23:10', '2025-09-30 02:23:10');

-- ----------------------------
-- Table structure for events
-- ----------------------------
DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `funding_goal` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `current_funding` decimal(10, 2) NOT NULL DEFAULT 0.00,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `categoryId` int NULL DEFAULT NULL,
  `organisationId` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `categoryId`(`categoryId` ASC) USING BTREE,
  INDEX `organisationId`(`organisationId` ASC) USING BTREE,
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `events_ibfk_2` FOREIGN KEY (`organisationId`) REFERENCES `organisations` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of events
-- ----------------------------
INSERT INTO `events` VALUES (1, '2025 Beijing Marathon', 'Marathon event to raise education funds for children in impoverished mountain areas', '2025-10-14 16:00:00', 'Beijing Olympic Park', 'https://oss.imoyt.top/img/202509301043185.png', 500000.00, 120000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 1, 3);
INSERT INTO `events` VALUES (2, 'Starlight Charity Gala', 'Annual celebrity charity fundraising dinner, all proceeds will be donated to children\'s hospitals', '2025-11-19 16:00:00', 'Shanghai Bund Wanda Hotel', 'https://oss.imoyt.top/img/202509301043185.png', 1000000.00, 350000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 2, 2);
INSERT INTO `events` VALUES (3, 'Art Charity Auction', 'Auction of works by renowned artists, proceeds used to support elderly welfare programs', '2025-09-04 16:00:00', 'Guangzhou Art Museum', 'https://oss.imoyt.top/img/202509301043185.png', 800000.00, 780000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 3, 1);
INSERT INTO `events` VALUES (4, 'Charity Concert', 'Famous musicians perform for charity to raise treatment funds for children with autism', '2025-12-09 16:00:00', 'Shenzhen Concert Hall', 'https://oss.imoyt.top/img/202509301044108.png', 600000.00, 150000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 4, 2);
INSERT INTO `events` VALUES (5, 'Winter Charity Sale', 'Sale of winter clothing and supplies to help homeless people through the cold winter', '2025-11-30 16:00:00', 'Chengdu City Center Square', 'https://oss.imoyt.top/img/202509301044108.png', 300000.00, 50000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 5, 1);
INSERT INTO `events` VALUES (6, 'Eco-Friendly Running Day', 'Environmental charity event combining running with garbage collection', '2025-11-04 16:00:00', 'Around West Lake, Hangzhou', 'https://oss.imoyt.top/img/202509301044108.png', 200000.00, 80000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 1, 3);
INSERT INTO `events` VALUES (7, 'Celebrity Chef Charity Dinner', 'Charity dinner prepared by renowned chefs, proceeds used for poverty alleviation projects', '2025-10-24 16:00:00', 'Jinling Hotel, Nanjing', 'https://oss.imoyt.top/img/202509301043185.png', 450000.00, 200000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 2, 3);
INSERT INTO `events` VALUES (8, 'Antique Treasures Auction', 'Auction of precious antiques and collectibles, proceeds used for cultural heritage protection', '2026-01-14 16:00:00', 'Xi\'an History Museum', 'https://oss.imoyt.top/img/202509301044108.png', 1200000.00, 300000.00, '2025-09-30 02:23:10', '2025-09-30 02:23:10', 3, 1);

-- ----------------------------
-- Table structure for organisations
-- ----------------------------
DROP TABLE IF EXISTS `organisations`;
CREATE TABLE `organisations`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL,
  `website` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `logo_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of organisations
-- ----------------------------
INSERT INTO `organisations` VALUES (1, 'Red Cross', 'International humanitarian organization', 'https://www.redcross.org.cn', 'https://oss.imoyt.top/img/202509301104208.png', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `organisations` VALUES (2, 'UNICEF', 'Dedicated to improving the lives of children worldwide', 'https://www.unicef.org', 'https://oss.imoyt.top/img/202509301105146.png', '2025-09-30 02:23:10', '2025-09-30 02:23:10');
INSERT INTO `organisations` VALUES (3, 'Hope Project', 'Helping children in impoverished areas receive education', 'https://www.hope-project.org', 'https://oss.imoyt.top/img/202509301106240.png', '2025-09-30 02:23:10', '2025-09-30 02:23:10');

SET FOREIGN_KEY_CHECKS = 1;
