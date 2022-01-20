<?php
require_once ('../../inc/bases.php');

if(empty($_GET['trameid'])){
    die();
}

$trameid = intval($_GET['trameid']);
$sql = "SELECT * FROM trames WHERE id = :trame_id";
$query = $pdo->prepare($sql);
$query->bindValue(':trame_id', $trameid, PDO::PARAM_INT);
$query->execute();
if($query->rowCount() > 0){
    $trame = $query->fetch();

    $trame['frame_date'] = dateToRead($trame['frame_date']);
    $trame['ip_from'] = hexadecimalCipher($trame['ip_from']);
    $trame['ip_dest'] = hexadecimalCipher($trame['ip_dest']);

    $json = json_encode($trame, JSON_PRETTY_PRINT);
    die($json);
}
die();