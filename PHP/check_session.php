<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['usuario'])) {
    $respuesta = ['logado' => true, 'usuario' => $_SESSION['usuario']];
    
    // El rol del usuario almacenado en la sesión
    if (isset($_SESSION['rol'])) {
        $respuesta['rol'] = $_SESSION['rol'];
    } else {
        $respuesta['rol'] = 'user'; // Valor predeterminado si no hay rol en sesión
    }

    echo json_encode($respuesta);
} else {
    // No hay sesión iniciada, usuario es "guest"
    echo json_encode(['logado' => false, 'rol' => 'guest']);
}
?>
