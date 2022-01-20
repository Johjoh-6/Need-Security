<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = cleanXss($_GET['protocolName']);
if(mb_strlen($protocol_name) == 0){
    exit;
}

$sql = "SELECT identification,protocol_checksum_status,header_checksum,protocol_name FROM trames WHERE protocol_name = :protocol_name ORDER BY frame_date";
$query = $pdo->prepare($sql);
$query->bindValue(':protocol_name', $protocol_name, PDO::PARAM_STR);
$query->execute();
$protocol_data = $query->fetchAll();
$errors_data['paquets_count'] = $query->rowCount();
$errors_data['erreurs'] = [];
$errors_data['unverified'] = [];

$ignoreNextTrame = false;
foreach($protocol_data as $tmpData){

    if($ignoreNextTrame){
        $ignoreNextTrame = false;
        continue;
    }

    if($tmpData['header_checksum'] === 'unverified' || $tmpData['protocol_checksum_status'] === 'disabled'){
        $errors_data['unverified'][] = $tmpData['identification'];
    }
    else if($tmpData['protocol_name'] === "ICMP"){
        $sql = "SELECT count(id) FROM trames WHERE identification = :id_trame";
        $query = $pdo->prepare($sql);
        $query->bindValue(':id_trame', $tmpData['identification'], PDO::PARAM_STR);
        $query->execute();
        if($query->fetchColumn() == 1){
            $errors_data['erreurs'][] = $tmpData['identification'];
            $ignoreNextTrame = true;
        }
    }
}

$json = json_encode($errors_data, JSON_PRETTY_PRINT);
die($json);