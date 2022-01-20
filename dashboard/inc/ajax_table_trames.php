<?php
require_once ('../../inc/bases.php');

$page = 1;
$nbRow = 10;
$protocol_name = '';

if(!empty($_GET['page'])){
    $page = intval($_GET['page']);
}

if(!empty($_GET['nbRows'])){
    $nbRow = intval($_GET['nbRows']);
}

if(!empty($_GET['protocolName'])){
    $protocol_name = cleanXss($_GET['protocolName']);
}

$trames = db_get_trames(['id', 'frame_date', 'identification', 'protocol_name', 'ip_from', 'ip_dest'], $page, $nbRow, $protocol_name);

$cptTrame = 0;
foreach($trames as $trame){
    foreach ($trame as $key => $trameData)
    {
        if($key == 'frame_date') {
            $trames[$cptTrame][$key] = dateToRead($trameData);
        }
        elseif($key == 'ip_from' || $key == 'ip_dest'){
            $trames[$cptTrame][$key] = hexadecimalCipher($trameData);
        }
    }
    $cptTrame++;
}

$count = 0;
if(mb_strlen($protocol_name) > 0){
    $sql = "SELECT count(id) FROM trames WHERE protocol_name = :protocol_name";
    $query = $pdo->prepare($sql);
    $query->bindValue(':protocol_name', $protocol_name, PDO::PARAM_STR);
    $query->execute();
    $count = $query->fetchColumn();
}
else{
    $sql = "SELECT count(id) FROM trames";
    $query = $pdo->prepare($sql);
    $query->execute();
    $count = $query->fetchColumn();
}
if($count <= $nbRow){
    $pages = 1;
}
else{
    $pages = ceil($count / $nbRow);
}

$paginatorRebuild = [];

if($pages > 1){
    if($pages <= 10) {
        for ($i = 1; $i <= $pages; $i++) {
            if ($page == $i) {
                $paginatorRebuild[] = [$i, 'selected'];
            } else {
                $paginatorRebuild[] = [$i, 'unselected'];
            }
        }
    }
    else{
        for ($i = 1; $i <= $pages; $i++) {
            if($i <= 3 || $i >= $pages - 1 || ($i >= $page - 2 && $i <= $page + 2)){
                if ($page == $i) {
                    $paginatorRebuild[] = [$i, 'selected'];
                } else {
                    $paginatorRebuild[] = [$i, 'unselected'];
                }
            }
        }
    }
}

$trames[] = $paginatorRebuild;

showJson($trames);