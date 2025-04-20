<?php
session_start();
require 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user'])) {
    echo json_encode(['success' => false, 'message' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user']['id'];
$search_term = $_POST['term'] ?? '';

if (empty($search_term)) {
    echo json_encode(['success' => false, 'message' => 'Empty search term']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO search_history (user_id, search_term) VALUES (?, ?)");
    $stmt->execute([$user_id, $search_term]);
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
?>
