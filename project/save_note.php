<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

// ✅ Check correct session format
if (!isset($_SESSION['user']['id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user']['id'];
$title = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';
$category = $_POST['category'] ?? '';

if (!$title || !$content || !$category) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO notes (user_id, title, content, category) VALUES (?, ?, ?, ?)");
    $stmt->execute([$user_id, $title, $content, $category]);
    echo json_encode(['status' => 'success', 'message' => 'Note saved']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
?>
