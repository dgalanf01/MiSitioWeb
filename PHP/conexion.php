<?php
$host = "localhost";
$user = "root";
$pass = ""; // o tu contraseña de MySQL
$db = "tfg";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$conn->set_charset("utf8");
?>
