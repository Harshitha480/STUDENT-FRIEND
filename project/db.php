<?php
$host = 'localhost';
$port = '3307';
$db   = 'studentfriend';
$user = 'root';     // Change if you have a different username
$pass = '';         // Add your DB password if any

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
