<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kingdom Hearts</title>
    <link rel="stylesheet" type="text/css" href="estilos/header_footer.css">
    <link rel="stylesheet" type="text/css" href="estilos/style.css">
    <script src="JS/login.js"></script>
</head>
<body>
    <header>
        <div class="encabezado">
            <div id="espacioLogo">
                <a href="index.php"><img src="imagenes/logo.png" alt="Logo" id="logo"></a>
            </div>
            
            <div id="menu">
                <a href="index.php">Home</a>
                <a href="juegos.php">Juegos</a>
                <a href="mundos.php">Mundos</a>
                <a href="llaves.php">Llaves</a>
                <a href="jefes.php">Jefes</a>
                <a href="sugerencias.php">Sugerencias</a>
            </div>
            <div id="login">
                <?php if (isset($_SESSION["usuario"])): ?>
                    <p>Hola, <strong><?php echo htmlspecialchars($_SESSION["usuario"]); ?></strong></p>
                    <form action="logout.php" method="post">
                        <button type="submit">Cerrar sesión</button>
                    </form>
                <?php else: ?>
                    <form action="login.php" method="post">
                        <div class="inputs">
                            <label for="usuario">Usuario:</label>
                            <input type="text" name="usuario" id="usuario" placeholder="Usuario" required>
                            <label for="contrasena">Contrase&ntilde;a:</label>
                            <input type="password" name="contrasena" id="contrasena" placeholder="Contrase&ntilde;a" required>
                        </div>
                        <div class="buttons">
                            <button type="submit">Iniciar sesi&oacute;n</button>
                            <a href="registro.php"><button type="button">Registrarse</button></a>
                        </div>
                    </form>
                <?php endif; ?>
            </div>
        </div>
    </header>

    <main>
        <div id="navegacion">

            <div id="buscador">
                <input type="text" name="buscar" id="buscar" placeholder="Buscar">
                <button id="buscar">Buscar</button>
                <hr>
            </div>
            
            <div id="listas">
                <ul>
                    <li class="lista1"><h3>Juegos</h3>
                        <ul>
                            <li class="lista2"><a href="kh.php">KH BbS</a></li>
                            <li class="lista2"><a href="kh.php">KH 1</a></li>
                            <li class="lista2"><a href="kh.php">KH CoM</a></li>
                            <li class="lista2"><a href="kh.php">KH 2</a></li>
                            <li class="lista2"><a href="kh.php">KH DdD</a></li>
                            <li class="lista2"><a href="kh.php">KH 3</a></li>
                            <li class="lista2"><a href="kh.php">KH 4</a>
                                <ul type="square">
                                    <li class="lista2"><a href="kh.php">Informaci&oacute;n</a></li>
                                    <li class="lista2"><a href="kh.php">Teaser</a></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="lista1" ><h3>Mundos</h3>
                        <ul>
                            <li class="lista2"><a href="kh.php">Destiny Islands</a></li>
                        </ul>
                    </li>
                    <li class="lista1"><h3>Llaves</h3>
                        <ul>
                            <li class="lista2"><a href="kh.php">Recuerdo lejanos</a></li>
                        </ul>
                    </li>
                    <li class="lista1"><h3>Jefes</a></h3>
                        <ul>
                            <li class="lista2"><a href="kh.php">Vanitas</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

        </div>

        <div id="contenido">
            <h2>Home</h2>

            <div id="izquierdo">
                <p>Mucho texto</p>
            </div>

            <div id="derecho">
                <p>Mucha imagen</p>
            </div>

        </div>

    </main>
    <footer>
        <div id="redes">
            <h3>Redes sociales...</h3>
            <a href="https://www.facebook.com/"><img src="imagenes/logof.png" alt="Facebook"></a>
            <a href="https://www.instagram.com/"><img src="imagenes/logoi.png" alt="Instagram"></a>
            <a href="https://www.twitter.com/"><img src="imagenes/logox.png" alt="Twitter"></a>
        </div>
    </footer>
</body>
</html>