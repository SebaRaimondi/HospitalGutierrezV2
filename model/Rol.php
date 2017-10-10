<?php
class Rol {
    public $id, $nombre, $permissions;

    public function __construct($id) {
        $this
            ->$id = $id
            ->$nombre = getNombre()
            ->$permissions = [];
        $this->buildPermissions();
    }

    public function buildNombre() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT nombre FROM rol WHERE id=?");
        $result = $query->execute(array($this->$id));

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            return $row['nombre'];
        }
        return false;
    }

    public function buildPermissions() {
        $connection = Connection::getInstance();
        
        $query = $connection->prepare("SELECT * FROM rol_tiene_permiso WHERE rol_id=?");
        $result = $query->execute(array($this->$id));

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $this->permissions[] = new Permisssion($row['permiso_id']);
            }
            return true;
        }
        return false;
   }
}
