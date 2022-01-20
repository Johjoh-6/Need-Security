<?php
require_once ('../../inc/bases.php');

if(!isLoggedIn()){
    die();
}

function addItemInArrayIfNotExist($ar, $item, $search){
    if(count($ar) >= 30 || $item === $search){
        return $ar;
    }
    if(!in_array($item, $ar)){
        $ar[] = $item;
    }
    return $ar;
}

function cumulateDataIn($ar, $trame, $prefixe, $ignoreColonneAr, $search){

    foreach ($trame as $key => $value){
        if($key !== 'id' && !in_array($key, $ignoreColonneAr)){
            if(!check_contains($prefixe, $value)){
                $ar = addItemInArrayIfNotExist($ar, $prefixe . ' ' . $value, $search);
            }
        }
    }
    return $ar;
}

function getCorrespondanceIn($trame, $search){
    if(check_contains($trame['frame_date'], $search)){
        return 'frame_date';
    }
    elseif(check_contains(strtolower($trame['identification']), $search)){
        return 'identification';
    }
    elseif(check_contains(strtolower($trame['protocol_name']), $search)){
        return 'protocol_name';
    }
    elseif(check_contains(strtolower($trame['ip_from']), $search)){
        return 'ip_from';
    }
    elseif(check_contains(strtolower($trame['ip_dest']), $search)){
        return 'ip_dest';
    }
    return ">not-found<";
}

if(empty($_GET['search'])){
    $search = '';
}
else{
    $search = strtolower(cleanXss($_GET['search']));
    if(mb_strlen($search) > 0){
        $_SESSION['search'] = $search;
    }
}

if (check_contains($search, " ")) {
    $search_keys = explode(" ", $search);
}
else{
    $search_keys = [];
    $search_keys[] = $search;
}

$sql = "SELECT id,frame_date,identification,ip_from,ip_dest,protocol_name FROM trames";
$query = $pdo->prepare($sql);
$query->execute();
$trames = $query->fetchAll();

// NOUVELLE VERSION
$tabAutoComplete = [];
$ignoreFields = [];

for($i = 0; $i < count($trames); $i++) {
    $trames[$i]['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trames[$i]['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trames[$i]['frame_date'] = explode(" ", dateToRead($trames[$i]['frame_date']))[0];
    $valide = true;

    $prefix = '';
    $needIgnore = [];
    for($k = 0;$k < count($search_keys); $k++){
        if(mb_strlen($search_keys[$k]) > 0) {
            $corresp = getCorrespondanceIn($trames[$i], $search_keys[$k]);
            if ($corresp === '>not-found<') {
                $valide = false;
                break;
            } else {
                if (mb_strlen($prefix) > 0) {
                    $prefix .= ' ';
                }
                $prefix .= $trames[$i][$corresp];
                $needIgnore[] = $corresp;
            }
        }
    }

    if($valide){
        $tabAutoComplete = addItemInArrayIfNotExist($tabAutoComplete, $prefix, $search);
        if(count($needIgnore) > 0){
            foreach ($needIgnore as $ni){
                $ignoreFields = addItemInArrayIfNotExist($ignoreFields, $ni, $search);
            }
        }
    }
    else{
        $trames[$i]['id'] = -1;
    }
}

// Générer l'autocomplétion via prefix + les données des tramesFound
// Repartir du tableau $tramesFound["autocompletion"] (préfixes) pour générer le reste des propositions

if(count($trames) > 0){
    $prefixes = $tabAutoComplete;
    foreach ($prefixes as $prefixe){
        foreach ($trames as $trame){
            if($trame['id'] !== -1){
                $tabAutoComplete = cumulateDataIn($tabAutoComplete, $trame, $prefixe, $ignoreFields, $search);
            }
        }
    }
}

$paginatorRebuild = [];
$trames[] = $paginatorRebuild;
$trames[] = $tabAutoComplete;
if(!empty($_SESSION['search'])){
    $trames[] = $_SESSION['search'];
}
else{
    $trames[] = '';
}
showJson($trames);