<?php

require_once $_SERVER['DOCUMENT_ROOT'].'/model/User.php';
require_once $_SERVER['DOCUMENT_ROOT'].'/model/UserGuest.php';

class AppController {
    private static $instance;
    private static $user;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {

    }

    public function addUser() {

    }

    public static function getUser() {
        if (!isset(self::$user)) {
            if (!isset($_SESSION['loggedid'])) {
                require_once $_SERVER['DOCUMENT_ROOT'].'/model/UserGuest.php';
                self::$user = new Guest();
            }
            else {
                require_once $_SERVER['DOCUMENT_ROOT'].'/model/User.php';
                self::$user = User::id($_SESSION['loggedid']);
            }
        }

        return self::$user;
    }

    public function checkPermissions($permission) {
        return self::getUser()->checkPermissions($permission);
    }

    public static function updateLogged() {
        if (!isset($_SESSION['loggedid'])) {
            self::$user = new Guest();
        }
        else {
            self::$user = User::id($_SESSION['loggedid']);
        }
        return self::$user;
    }

    public static function isLogged() {
        return (self::getUser() instanceof User);
    }

    public static function isGuest() {
        return (self::getUser() instanceof Guest);
    }

    public static function allowed($permission){

        if (!self::getInstance()->checkPermissions($permission)) { /* si no tengo permisos ..*/
            $context = [];
            $path = '/not_allowed.html.twig';
            /* use el mismo diseño que para mantain*/
            $context['stylesheets'] = ['/public/css/config-mantenimiento.css'];
            $context['titulo'] = 'Acceso Denegado';
            TwigController::renderTwig($path, $context);
            die;
        }
        else {
            return true;
        }
    }

    public static function no_elements(){
        
        $context = [];
        $path = '/no_elements.html.twig';
        /* use el mismo diseño que para mantain*/
        $context['stylesheets'] = ['/public/css/config-mantenimiento.css'];
        $context['titulo'] = 'Sin resultados';
        
        TwigController::renderTwig($path, $context);
        die;
    }

    public static function req_fields(){
        
        $context = [];
        $path = '/req_fields.html.twig';
        /* use el mismo diseño que para mantain*/
        $context['stylesheets'] = ['/public/css/config-mantenimiento.css'];
        $context['titulo'] = 'Campos mal completados';
        
        TwigController::renderTwig($path, $context);
        die;
    }
}

