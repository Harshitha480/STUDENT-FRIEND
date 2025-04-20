<?php
session_start();
require 'db.php';
header('Content-Type: application/json');

$user_id = $_SESSION['user']['id'] ?? null;
$feedback = trim($_POST['feedback'] ?? '');

if (!$feedback) {
    echo json_encode(['message' => 'Feedback cannot be empty']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO feedback (user_id, feedback_text) VALUES (?, ?)");
    $stmt->execute([$user_id, $feedback]);
    echo json_encode(['message' => 'Thank you for your feedback!']);
} catch (Exception $e) {
    echo json_encode(['message' => 'Error saving feedback']);
}
?>
