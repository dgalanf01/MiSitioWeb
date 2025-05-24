<?php
include("conexion.php"); // Asegúrate de tener la conexión a la base de datos
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST["nuevoUsuario"] ?? '');
    $password = trim($_POST["nuevaContrasena"] ?? '');
    $correo = trim($_POST["email"] ?? '');

    if (empty($nombre) || empty($password) || empty($correo)) {
        echo json_encode(["status" => "error", "message" => "Por favor, completa todos los campos."]);
        exit;
    }

    $query = "SELECT * FROM usuarios WHERE nombre = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nombre);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(["status" => "error", "message" => "El nombre de usuario ya existe."]);
    } else {
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO usuarios (nombre, password, correo, rol) VALUES (?, ?, ?, 'user')";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $nombre, $hashed_password, $correo);
        $stmt->execute();

        echo json_encode(["status" => "success", "message" => "Usuario registrado exitosamente."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}

?>
