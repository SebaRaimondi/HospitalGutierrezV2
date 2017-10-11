<?php
require_once './model/User.php';

class UsersController {
    private static $instance;
    
    public static function getInstance() {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct() {

    }
    
    public function index(){
        if (!AppController::getInstance()->checkPermissions('usuario_index')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        $args = [];

        if (isset($_GET['active'])) {
            $args['active'] = $_GET['active'];
        }

        if (isset($_GET['search']) && $_GET['search'] != "") {
            $args['search'] = $_GET['search'];
        }

        if ($users = User::all($args)) {
            require_once 'view/users/header.html';
            require_once 'view/navbar.php';
            require_once 'view/users/index.php';
            require_once 'view/footer.html';
            require_once 'view/users/javascripts.php';
            die;
        }
        else {
            echo "Error";
            die;
        }
    }

    public function togglestate() {
        if (!AppController::getInstance()->checkPermissions('usuario_update')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        User::id($_GET['id'])->togglestate();
        $this->index();
    }

    public function newUser() {
        if (!AppController::getInstance()->checkPermissions('usuario_new')) {
            echo 'No tiene permiso para acceder a la funcionalidad seleccionada.';
            die;
        }

        $email = $_POST['email'];
        $username = $_POST['user'];
        $password = $_POST['pass'];
        if ($_POST['active']) {
            $activo = 1;
        }
        else {
            $activo = 0;
        }
        $first_name = $_POST['first_name'];
        $last_name = $_POST['last_name'];

        User::newUser($email, $username, $password, $activo, $first_name, $last_name);
        $this->index();
    }

    public function deleteUser() {
        $id = $_GET['id'];

        User::deleteUser($id);
        $this->index();
    }
}