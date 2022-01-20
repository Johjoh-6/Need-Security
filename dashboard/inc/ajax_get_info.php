<?php
require_once ('../../inc/bases.php');
$table = cleanXss($_GET['table']);
if(empty($table)){
    exit;
} else {
    if (mb_strlen($table) == 0) {
        exit;
    } else {
            global $pdo;
            $sql = "SELECT * FROM  $table";
            $query = $pdo->prepare($sql);
            $query->execute();
            $db = $query->fetchAll();

        $json = json_encode($db, JSON_PRETTY_PRINT);
        die($json);
    }
}