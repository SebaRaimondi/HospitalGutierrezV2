<?php

ini_set('display_startup_errors', 1);
ini_set('display_errors', 1);
error_reporting(-1);
date_default_timezone_set('America/Argentina/Buenos_Aires');

session_start();

require_once 'Connection.php';          // Database controller
require_once 'vendor/autoload.php';     // Twig
require_once 'controller/App.php';      // AppController
require_once 'controller/Twig.php';     // TwigController
require_once 'controller/Config.php';   // ConfigController

function validateText($args)
{
    foreach ($args as $arg) {
        if (strlen($arg) < 4) {
            return false;
        }
    }
    return true;
}

if (isset($_GET['controller']) && isset($_GET['action'])) {
    $controller = ucwords(strtolower($_GET['controller']));
    $action     = strtolower($_GET['action']);
} else {
    $controller = 'Home';
    $action     = 'index';
}

if (ConfigController::mantenimiento() && !(ConfigController::permission($controller, $action))) {
    $controller = 'Config';
    $action     = 'index';
}

require_once "controller/$controller.php";
$controller = $controller . 'Controller';  // ucwords transforma primera letra en mayusc
$controller = $controller::getInstance();

call_user_func(array( $controller, $action ));
