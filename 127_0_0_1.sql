-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2025 at 07:26 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `final project`
--
CREATE DATABASE IF NOT EXISTS `final project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `final project`;

-- --------------------------------------------------------

--
-- Table structure for table `incident`
--

CREATE TABLE `incident` (
  `ID` int(11) NOT NULL,
  `Incident_Name` varchar(255) NOT NULL,
  `Incident_Date` datetime NOT NULL,
  `Description` text NOT NULL,
  `ID_Employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `incident`
--

INSERT INTO `incident` (`ID`, `Incident_Name`, `Incident_Date`, `Description`, `ID_Employee`) VALUES
(1, 'אירוע פריצת מחסום בשער ראשי', '2025-02-16 16:17:00', 'בשעה 16:17 ביום ראשון ה16.2 רכב הגיע לעמדת בידוק קידמית ונמצא ללא אישור כניסה לאחר שעמד 5 דקות במפרצון .ההמתנה החליט לפרוץ את המחסום ולהיכנס לקמפוס\r\nלאחר 10 דקות סייר רכוב וקבט מצאו אותו ליד מכלול והוציאו אותו מהקפוס ', 1),
(2, 'סירוב בידוק', '2025-02-05 05:43:00', 'בשעה 5:43 בתאריך ה5.2 הגיע רכב לעמדת הבידוק וסירב להיבדק בטענה שהוא מגיע לבריכה ובחיים לא בדקו אותו \r\nלאחר שהמאבטח הסביר שעל חובתו לבדוק כל אדם אשר מגיע לקמפוס הנהג של הרכב התעצבן ותחליט לצעוק וביקש לראות את אחראי המשמרת \r\nלאחר הגעת אחראי המשמרת הבן אדם המשיך לסרב להיבדק ופרסס ולא נכנס לקמפוס', 1),
(3, 'חפץ חשוד', '2025-02-17 19:00:00', 'בתאריך ה17.2 בשעה 19 מאבטח עלה לבדוק אוטובוס 19 אשר נכנס לקמפוס מצא במושב האחורי תיק מנופח ולאחר בדיקה עם הנוסעים המאבטח קבע שאין בעלים לתיק והכריז עליו חפץ חשוד ', 1),
(4, 'התעלפות בבניין אולמן ', '2025-01-23 17:29:00', 'בתאריך ה23.1 בשעה 17:29 מוקד הביטחון קיבל טלפון שסטודנטית התעלפה באצמע מבחן ,סייר רכוב ואחראי משמרת קפצו לאירוע ,לאחר הגעת אחראי משמרת לאירועהוחלט על הזמנת אמבולנס ,לאחר הגעת האמבולנס הוחלט על פינוי הסטודנטית', 1),
(5, 'גנבת אופניים', '2025-01-14 01:25:00', 'בתאריך ה14.1 בשעה 1:25 תועד אדם אשר מגיע למעונות מזרח ובוחן את עמדת האופניים אשר ממוקמת בכניסה של 458 בשעה 1:32 רואים אדם נוסף לבוש בכובע מגיע ופורץ את המנעולים של שלושה אופניים ולוקח את אחד מהם \r\nהמשטרה עודכנה ', 1);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID_Role` int(11) NOT NULL,
  `Role_Name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `Shift_ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Type_Of_Shift` enum('1','2','3') NOT NULL,
  `Number_Of_Employee` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `shift_details`
--

CREATE TABLE `shift_details` (
  `ID` int(11) NOT NULL,
  `Shift_ID` int(11) NOT NULL,
  `Type_Of_Role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('employee','manager') NOT NULL DEFAULT 'employee'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'kuku', '1234', 'employee');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `incident`
--
ALTER TABLE `incident`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ID_Employee` (`ID_Employee`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID_Role`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`Shift_ID`);

--
-- Indexes for table `shift_details`
--
ALTER TABLE `shift_details`
  ADD KEY `ID` (`ID`),
  ADD KEY `Shift_ID` (`Shift_ID`),
  ADD KEY `Type_Of_Role` (`Type_Of_Role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `incident`
--
ALTER TABLE `incident`
  ADD CONSTRAINT `incident_ibfk_1` FOREIGN KEY (`ID_Employee`) REFERENCES `users` (`id`);

--
-- Constraints for table `shift_details`
--
ALTER TABLE `shift_details`
  ADD CONSTRAINT `shift_details_ibfk_1` FOREIGN KEY (`Type_Of_Role`) REFERENCES `role` (`ID_Role`),
  ADD CONSTRAINT `shift_details_ibfk_2` FOREIGN KEY (`ID`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `shift_details_ibfk_3` FOREIGN KEY (`Shift_ID`) REFERENCES `shift` (`Shift_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
