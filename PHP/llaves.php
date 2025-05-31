<?php
header('Content-Type: application/json');

// $conexion = new mysqli("sql106.infinityfree.com","if0_39016294","MaGoDeOz24","if0_39016294_tfg");
$conexion = new mysqli("localhost","root","","tfg");

if ($conexion->connect_error) {
    http_response_code(500); // Código HTTP 500
    echo json_encode(["error" => "Error de conexión: " . $conexion->connect_error]);
    exit;
}

$conexion->set_charset("utf8");

$sql = "
SELECT 
    armas.id AS arma_id,
    armas.nombre AS arma_nombre,
    armas.imagen AS arma_imagen,
    juegos.nombre AS juego_nombre,
    mundos.nombre AS mundo_nombre,
    jma.fuerza,
    jma.magia,
    jma.obtencion
FROM 
    juegos_mundos_armas jma
JOIN armas ON jma.arma_id = armas.id
JOIN juegos ON jma.juego_id = juegos.id
JOIN mundos ON jma.mundo_id = mundos.id
ORDER BY juegos.nombre, mundos.nombre, armas.nombre
";

$resultado = $conexion->query($sql);

if (!$resultado) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta: " . $conexion->error]);
    $conexion->close();
    exit;
}

$datos = [];
while ($fila = $resultado->fetch_assoc()) {
    $datos[] = $fila;
}

echo json_encode($datos);
$conexion->close();
?>