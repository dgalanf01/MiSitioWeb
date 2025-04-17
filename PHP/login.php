<?php
// Iniciar sesión
session_start();

// Datos de ejemplo (normalmente vendrían de una base de datos)
$usuarios_validos = [
    "admin" => "1234",
    "usuario" => "clave123"
];

// Comprobar si los datos se han enviado por POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST["usuario"] ?? '');
    $contrasena = trim($_POST["contrasena"] ?? '');

    // Validar campos
    if (empty($usuario) || empty($contrasena)) {
        echo "Por favor, completa todos los campos.";
        exit;
    }

    // Verificar credenciales
    if (array_key_exists($usuario, $usuarios_validos) && $usuarios_validos[$usuario] === $contrasena) {
        $_SESSION["usuario"] = $usuario;
        echo "OK"; // Puedes usar esto para redirigir en JS
    } else {
        echo "Usuario o contraseña incorrectos.";
    }
} else {
    echo "Método no permitido.";
}
?>
