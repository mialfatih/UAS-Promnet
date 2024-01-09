-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 09, 2024 at 02:54 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_2205330_fatih_uas`
--

-- --------------------------------------------------------

--
-- Table structure for table `pasien_puskesmas_fatih`
--

CREATE TABLE `pasien_puskesmas_fatih` (
  `id` int(11) NOT NULL,
  `nama` varchar(20) NOT NULL,
  `usia` int(11) NOT NULL,
  `jenis_kelamin` enum('L','P') DEFAULT NULL,
  `alamat` varchar(25) NOT NULL,
  `deskripsi` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pasien_puskesmas_fatih`
--

INSERT INTO `pasien_puskesmas_fatih` (`id`, `nama`, `usia`, `jenis_kelamin`, `alamat`, `deskripsi`) VALUES
(3, 'Putri a', 17, 'P', 'Gegerkalong', 'saya mengalami sakit kepala sejak hujan hujanan ke'),
(4, 'Bayu', 17, 'L', 'Gegerwarga', 'saya mengalami sakit hati sejak makan gorengan kem'),
(5, 'Bunga', 21, 'P', 'Ranca Buaya', 'saya mengalami sakit mata sejak nonton tv seharian'),
(7, 'salma', 6, 'P', 'PekanBaru', 'Pusing kepala'),
(8, 'Muhammad Izzuddin Al', 5, 'P', 'gegerkalong', 'saya mengalami sakit kaki sejak tersandung batu ke'),
(9, 'gafiy', 18, 'P', 'adawd', 'Pusing kepala'),
(26, 'Sahrul', 8, 'P', 'gerelog', 'Pusing nadan'),
(27, 'Muhammad Izzuddin Al', 4, 'L', 'adawd', 'sakit kulit'),
(45, 'Farrel', 17, 'L', 'Cimahi', 'Tulang Kering'),
(46, 'Naufal', 20, 'L', 'Cilimus', 'Sakit mata');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pasien_puskesmas_fatih`
--
ALTER TABLE `pasien_puskesmas_fatih`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pasien_puskesmas_fatih`
--
ALTER TABLE `pasien_puskesmas_fatih`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
