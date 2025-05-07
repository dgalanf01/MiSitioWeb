<?php
include("conexion.php"); // Asegúrate de tener la conexión a la base de datos

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = trim($_POST["nombre"] ?? '');
    $password = trim($_POST["password"] ?? '');
    $correo = trim($_POST["correo"] ?? '');

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($password) || empty($correo)) {
        echo "Por favor, completa todos los campos.";
        exit;
    }

    // Verificar si el nombre de usuario ya existe
    $query = "SELECT * FROM usuarios WHERE nombre = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nombre); // Vincula el parámetro de búsqueda al nombre
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "El nombre de usuario ya existe.";
    } else {
        // Hashear la contraseña antes de guardarla
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Insertar el nuevo usuario en la base de datos con rol 'user' por defecto
        $query = "INSERT INTO usuarios (nombre, password, correo, rol) VALUES (?, ?, ?, 'user')";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("sss", $nombre, $hashed_password, $correo);
        $stmt->execute();

        echo "Usuario registrado exitosamente.";
    }
} else {
    echo "Método no permitido.";
}
?>
