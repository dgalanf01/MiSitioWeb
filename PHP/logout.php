<?php
session_start();
session_destroy();
echo "LOGOUT_OK"; // Respuesta para JS
exit;
