<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = trim(strip_tags($_GET['protocolName']));
if(mb_strlen($protocol_name) == 0){
    exit;
}

$chemins = [];
$cpt = 0;
if($protocol_name == 'ICMP'){

    $sql = "SELECT id,identification,protocol_type,ip_from,ip_dest FROM trames WHERE protocol_name = :protocol_name ORDER BY frame_date";
    $query = $pdo->prepare($sql);
    $query->bindValue('protocol_name', $protocol_name, PDO::PARAM_STR);
    $query->execute();
    $protocol_data = $query->fetchAll();

    $is_aller = true;

    foreach($protocol_data as $data){
        if($is_aller){
            $ip_aller = hexadecimalCipher($data['ip_from']);
            $ip_retour = hexadecimalCipher($data['ip_dest']);
            $id_aller = $data['identification'];
        }
        else{
            $status = '';
            if($id_aller !== $data['identification']){
                $status = '0x0' . $data['protocol_type'];
            }
            $chemins[$cpt][] = [
                'id' => $data['id'],
                'identification' => $data['identification'],
                'ip_from' => $ip_aller,
                'ip_dest' => $ip_retour,
                'statut' => $status
            ];
        }
        $is_aller = !$is_aller;
    }
}
else{

    $sql = "SELECT id,identification,protocol_type,ip_from,ip_dest FROM trames WHERE protocol_name = :protocol_name GROUP BY identification ORDER BY frame_date";
    $query = $pdo->prepare($sql);
    $query->bindValue('protocol_name', $protocol_name, PDO::PARAM_STR);
    $query->execute();
    $protocol_data = $query->fetchAll();

    foreach($protocol_data as $data){
        $sql = "SELECT id,flags_code,ip_from,ip_dest FROM trames WHERE identification = :id_trame ORDER BY frame_date";
        $query = $pdo->prepare($sql);
        $query->bindValue('id_trame', $data['identification'], PDO::PARAM_STR);
        $query->execute();
        $flags_codes = $query->fetchAll();

        $last_identifiant = '';
        for ($i = 0; $i < $query->rowCount(); $i++){
            if($last_identifiant === '' || $last_identifiant !== $data['identification']){
                if($query->rowCount() == 2){
                    $chemins[$cpt][] = [
                        'id' => $flags_codes[$i]['id'],
                        'identification' => $data['identification'],
                        'flags_code_aller' => $flags_codes[$i]['flags_code'],
                        'flags_code_retour' => $flags_codes[$i+1]['flags_code'],
                        'ip_from' => hexadecimalCipher($flags_codes[$i]['ip_from']),
                        'ip_dest' => hexadecimalCipher($flags_codes[$i]['ip_dest']),
                        'statut' => 'retour-valide',
                        'trajet' => 'aller-retour'
                    ];
                }
                else{
                    $chemins[$cpt][] = [
                        'id' => $flags_codes[$i]['id'],
                        'identification' => $data['identification'],
                        'flags_code_aller' => $flags_codes[$i]['flags_code'],
                        'ip_from' => hexadecimalCipher($flags_codes[$i]['ip_from']),
                        'ip_dest' => hexadecimalCipher($flags_codes[$i]['ip_dest']),
                        'statut' => 'retour-error',
                        'trajet' => 'aller-retour'
                    ];
                }
                $last_identifiant = $data['identification'];
            }
        }
        $cpt++;
    }
}

$json = json_encode($chemins, JSON_PRETTY_PRINT);
die($json);