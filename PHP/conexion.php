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
// $host = "sql106.infinityfree.com";
// $user = "if0_39016294";
// $pass = "MaGoDeOz24"; // o tu contraseña de MySQL
// $db = "if0_39016294_tfg";

// $conn = new mysqli($host, $user, $pass, $db);
// if ($conn->connect_error) {
//     die("Conexión fallida: " . $conn->connect_error);
// }
?>
