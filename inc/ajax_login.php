<?php

require_once ('bases.php');

if(empty($_GET['email'])){
    echo 'Veuillez renseigner une adresse mail';
    exit;
}
if(empty($_GET['password'])){
    echo 'Veuillez renseigner un mot de passe';
    exit;
}
if(empty($_GET['rememberMe'])){
    $rememberMe = false;
}
else{
    $rememberMe = boolval($_GET['rememberMe']);
}
if(empty($_GET['connectionType'])){
    $connectionType = 'normal';
}
else{
    $connectionType = cleanXss($_GET['connectionType']);
}

$email = cleanXss($_GET['email']);
$password = cleanXss($_GET['password']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) < 3 || mb_strlen($email) > 128) {
    echo 'Adresse mail invalide';
    exit;
}
if (mb_strlen($email) < 3 || mb_strlen($email) > 128) {
    echo 'Votre adresse mail doit être comprise entre 3 et 128 caractères';
    exit;
}

if(mb_strlen($password) < 3 || mb_strlen($password) > 32){
    echo 'Votre mot de passe doit être compris entre 3 et 32 caractères';
    exit;
}

$sql = "SELECT * FROM users WHERE email = :email";
$query = $pdo->prepare($sql);
$query->bindValue(':email',$email,PDO::PARAM_STR);
$query->execute();
$user = $query->fetch();

if(!empty($user) && mb_strlen($user['password']) > 0){
    if ($connectionType === 'cookie' || password_verify($password, $user['password'])) {

        /** Création du cookie pour: Se souvenir de moi */
        if($rememberMe) {
            setcookie ('member_email',$user['email'],time() + (60*60*24*7)); // valide 7 jours
        } else {
            if (isset($_COOKIE['member_email'])) {
                setcookie('member_email', '');
            }
        }

        $_SESSION['user'] = array(
            'id'     => $user['id'],
            'nom' => $user['nom'],
            'prenom' => $user['prenom'],
            'email'  => $user['email'],
            'created_at'   => $user['created_at'],
            'ip'     => $_SERVER['REMOTE_ADDR']
        );

        echo 'ok';
        exit;
    } else {
        echo 'Mot de passe invalide';
        exit;
    }
}
else{
    echo 'Aucun compte trouvé avec cette adresse mail';
    exit;
}