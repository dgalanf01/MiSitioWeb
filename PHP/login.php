<?php
session_start();
include("conexion.php"); // Asegúrate de tener la conexión a la base de datos

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Tomamos el nombre y la contraseña del formulario
    $nombre = trim($_POST["usuario"] ?? '');
    $password = trim($_POST["contrasena"] ?? ''); // Asegúrate de usar el nombre correcto del campo

    // Validar que los campos no estén vacíos
    if (empty($nombre) || empty($password)) {
        echo json_encode(["status" => "error", "message" => "Por favor, completa todos los campos."]);
        exit;
    }

    // Preparar la consulta SQL para verificar el usuario por nombre
    $query = "SELECT * FROM usuarios WHERE nombre = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $nombre); // Vincula el parámetro de búsqueda al nombre
    $stmt->execute();
    $result = $stmt->get_result();

    // Si el usuario existe
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc(); // Obtener los datos del usuario
        
        // Verificar la contraseña usando password_verify
        if (password_verify($password, $user['password'])) {
            // Iniciar sesión si las credenciales son correctas
            $_SESSION["usuario"] = $user['nombre']; // Guardar el nombre del usuario en la sesión
            $_SESSION["id"] = $user['id'];  // Guardar el id del usuario en la sesión
            $_SESSION["rol"] = $user['rol'];  // Guardar el rol del usuario en la sesión (user por defecto)

            echo json_encode(["status" => "success", "message" => "OK"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Contraseña incorrecta."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Usuario no encontrado."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido."]);
}
?>
