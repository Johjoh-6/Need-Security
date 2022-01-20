<?php
require_once ('../../inc/bases.php');
$tableV = cleanXss($_GET['table']);
$columnV = cleanXss($_GET['column']);
if(empty($tableV) && empty($columnV)){
    exit;
} else {
    if (mb_strlen($tableV) == 0 || mb_strlen($columnV) == 0) {
        exit;
    } else {
        function getDbByColumn($table, $column)
        {
            global $pdo;
            $sql = "SELECT $column FROM  $table";
            $query = $pdo->prepare($sql);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_COLUMN);
        }
        $db = getDbByColumn($tableV, $columnV);
        $count = array_count_values($db);
        $json = json_encode($count, JSON_PRETTY_PRINT);
        die($json);
    }
}