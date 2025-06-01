<?php
include 'conexion.php';
session_start();

if (!isset($_SESSION['id'])) {
    echo "Debes iniciar sesión para enviar sugerencias.";
    exit;
}

$id_usuario = $_SESSION['id'];

// Verificamos que lleguen los datos por POST
if (isset($_POST['juego']) && isset($_POST['sugerencias'])) {
    $juego = $_POST['juego'];
    $sugerencia = $_POST['sugerencias'];

    // Preparamos la consulta con sentencias preparadas
    $stmt = $conn->prepare("INSERT INTO sugerencias (id_usuario, juego, contenido) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $id_usuario, $juego, $sugerencia);

    if ($stmt->execute()) {
        // Redirigimos al formulario con mensaje de éxito
        header("Location: ../sugerencias.html?mensaje=exito");
        exit();
    } else {
        echo "Error al guardar la sugerencia: " . $stmt->error;
    }

    $stmt->close();
} else {
    echo "Faltan datos necesarios para procesar la sugerencia.";
}

$conn->close();
?>
