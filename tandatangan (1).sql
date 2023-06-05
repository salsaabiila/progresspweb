-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 05 Jun 2023 pada 08.11
-- Versi server: 10.4.25-MariaDB
-- Versi PHP: 8.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tandatangan`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `documents`
--

CREATE TABLE `documents` (
  `id` varchar(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `filename` varchar(20) NOT NULL,
  `description` varchar(50) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `documents`
--

INSERT INTO `documents` (`id`, `name`, `filename`, `description`, `created_at`, `updated_at`) VALUES
('1', 'faa', 'Surat Izin Peminjama', 'Untuk keperluan rapat', '2023-04-10 13:19:11.000000', '2023-04-10 13:19:11.000000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `signature`
--

CREATE TABLE `signature` (
  `user_id` varchar(11) NOT NULL,
  `document_id` varchar(11) NOT NULL,
  `jabatan` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `signed_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `signature`
--

INSERT INTO `signature` (`user_id`, `document_id`, `jabatan`, `status`, `signed_at`, `created_at`, `updated_at`) VALUES
('1', '1', 'Mahasiswa', 'Selesai', '2023-04-10 13:20:20.000000', '2023-04-10 13:20:20.000000', '2023-04-10 13:20:20.000000');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` varchar(11) NOT NULL,
  `username` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(10) NOT NULL,
  `active` int(2) NOT NULL,
  `sign_img` varchar(20) NOT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `active`, `sign_img`, `created_at`, `updated_at`) VALUES
('', '', '', '', 0, 'image-1685942506446-', '2023-06-05 05:21:46.451198', '2023-06-05 05:21:46.451198'),
('1', 'faaa', 'faa@gmail.com', '123', 1, 'bla.png', '2023-04-10 13:15:39.000000', '2023-04-10 13:15:39.000000'),
('2', 'salsa', 'salsa@gmail.com', 'abc', 1, 'bla.png', '2023-05-27 14:38:57.000000', '2023-05-27 14:38:57.000000'),
('4', 'scara', 'scara6@gmail.com', '$2b$10$a3N', 1, '', '2023-05-28 12:22:03.509391', '0000-00-00 00:00:00.000000'),
('5', 'lixie', 'lixie@gmail.com', '$2b$10$TrI', 1, '', '2023-05-28 12:59:33.381010', '2023-05-28 12:59:33.381010'),
('6', 'tipaa', 'tipaa@gmail.com', '1234', 1, '', '2023-05-28 15:11:52.700775', '2023-05-28 15:11:52.700775'),
('7', 'pat', 'pat@gmail.com', '$2b$10$rvr', 1, '', '2023-06-05 05:03:40.693336', '0000-00-00 00:00:00.000000'),
('8', 'pina', 'pina@gmail.com', '$2b$10$KRp', 1, '', '2023-06-05 05:17:51.956250', '0000-00-00 00:00:00.000000');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `signature`
--
ALTER TABLE `signature`
  ADD PRIMARY KEY (`user_id`,`document_id`),
  ADD KEY `document_id` (`document_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `signature`
--
ALTER TABLE `signature`
  ADD CONSTRAINT `signature_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `signature_ibfk_2` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
