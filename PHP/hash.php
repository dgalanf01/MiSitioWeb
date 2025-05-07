<?php
$contraseña = "4567"; // La contraseña en texto plano que quieres cifrar

// Cifra la contraseña
$contraseñaCifrada = password_hash($contraseña, PASSWORD_BCRYPT);

// Muestra el hash generado
echo $contraseñaCifrada;
?>