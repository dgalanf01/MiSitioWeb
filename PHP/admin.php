<?php
session_start(); // Iniciar sesión

// Verificar si el usuario está logueado y tiene el rol "admin"
if (!isset($_SESSION["usuario"]) || $_SESSION["rol"] !== "admin") {
    // Si no está logueado o no tiene el rol "admin", redirigir al login
    header("Location: login.html");
    exit();
}

// Si está logueado y tiene el rol "admin", puede ver el contenido
echo "Bienvenido al panel de administración.";
?>
