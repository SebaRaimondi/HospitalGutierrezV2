<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require_once 'Connection.php';          // Database controller
require_once 'controller/Twig.php';     // TwigController

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$app = new \Slim\App(["settings" => $config]);
$app->get('/turnos/{fecha}', function ($request, $response, $args) {
    require_once 'controller/Turnos.php';

    $fecha = $request->getAttribute('fecha');
    $controller = TurnosController::getInstance();

    return $response->write($controller->getTurnos($fecha));
});
$app->post('/turnos/{dni}/fecha/{fecha}/hora/{hora}', function ($request, $response, $args) {
    require_once 'controller/Turnos.php';

    $dni = $request->getAttribute('dni');
    $fecha = $request->getAttribute('fecha');
    $hora = $request->getAttribute('hora');

    $controller = TurnosController::getInstance();

    return $response->write($controller->newTurno($dni, $fecha, $hora));
});
$app->run();
