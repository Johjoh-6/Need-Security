<?php
require_once ('../../inc/bases.php');

$sql = "SELECT frame_date FROM trames ORDER BY frame_date DESC";
$query = $pdo->prepare($sql);
$query->execute();
$days = $query->fetchAll();

$dateInfo = [];
$dateInfo[0] = [];
foreach ($days as $day){

    if(count($dateInfo[0]) >= 7){
        break;
    }

    $fullDate = dateToRead($day['frame_date']);
    $onlyDay = explode(" ", $fullDate)[0];
    if(!in_array($onlyDay, $dateInfo[0])){
        $dateInfo[0][] = $onlyDay;

        $sql = "SELECT protocol_name, frame_date FROM trames";
        $query = $pdo->prepare($sql);
        $query->execute();
        $protocoles = $query->fetchAll();
        foreach($protocoles as $protocole){
            $fullDate = dateToRead($protocole['frame_date']);
            $onlyDay_prot = explode(" ", $fullDate)[0];
            if($onlyDay === $onlyDay_prot){
                if(empty($dateInfo[$onlyDay][$protocole['protocol_name']])){
                    $dateInfo[$onlyDay][$protocole['protocol_name']] = 0;
                }
                $dateInfo[$onlyDay][$protocole['protocol_name']] ++;
            }
        }
    }
}

$dateInfo[0] = array_reverse($dateInfo[0]);

$json = json_encode($dateInfo, JSON_PRETTY_PRINT);
die($json);