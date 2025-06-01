<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['usuario']) || $_SESSION['rol'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error' => 'No autorizado']);
    exit;
}

require 'conexion.php'; // archivo con conexión $conn

$sql = "
SELECT 
    s.id, u.nombre, s.contenido, s.fecha FROM sugerencias s JOIN usuarios u ON s.id_usuario = u.id ORDER BY s.fecha DESC";
$result = $conn->query($sql);

$sugerencias = [];
while ($row = $result->fetch_assoc()) {
    $sugerencias[] = $row;
}

echo json_encode($sugerencias);
?>
