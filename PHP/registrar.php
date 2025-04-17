<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST["usuario"]);
    $contrasena = trim($_POST["contrasena"]);

    if (empty($usuario) || empty($contrasena)) {
        echo "Por favor, completa todos los campos.";
        exit;
    }

    $archivo = "usuarios.txt";

    // Verificamos si el usuario ya existe
    if (file_exists($archivo)) {
        $lineas = file($archivo);
        foreach ($lineas as $linea) {
            list($usuarioGuardado, ) = explode(":", trim($linea));
            if ($usuario === $usuarioGuardado) {
                echo "El usuario ya existe.";
                exit;
            }
        }
    }

    // Guardamos el nuevo usuario en el archivo
    $nuevaLinea = $usuario . ":" . password_hash($contrasena, PASSWORD_DEFAULT) . PHP_EOL;
    file_put_contents($archivo, $nuevaLinea, FILE_APPEND);

    echo "OK";
}
?>
