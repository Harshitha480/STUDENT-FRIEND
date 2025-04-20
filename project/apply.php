<?php
session_start();
require 'db.php'; // your DB connection

if (!isset($_SESSION['user_id'])) {
    die("User not logged in.");
}

$user_id = $_SESSION['user_id'];
$internship_title = $_POST['internship_title'] ?? '';
$redirect_url = $_POST['redirect_url'] ?? 'studentfriend.html';

if ($internship_title) {
    $stmt = $conn->prepare("INSERT INTO applications (user_id, internship_title) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $internship_title);
    $stmt->execute();
    $stmt->close();
}

// Redirect to the external site
header("Location: " . $redirect_url);
exit;
?>
