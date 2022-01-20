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
if(empty($_GET['passwordConf'])){
    echo 'Veuillez confirmer votre mot de passe';
    exit;
}
if(empty($_GET['prenom'])){
    $prenom = '';
}
else{
    $prenom = cleanXss($_GET['prenom']);
}
if(empty($_GET['nom'])){
    $nom = '';
}
else{
    $nom = cleanXss($_GET['nom']);
}

$email = cleanXss($_GET['email']);
$password = cleanXss($_GET['password']);
$passwordConf = cleanXss($_GET['passwordConf']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) < 3 || mb_strlen($email) > 128) {
    echo 'Adresse mail invalide';
    exit;
}
if (mb_strlen($email) < 3 || mb_strlen($email) > 128) {
    echo 'Votre adresse mail doit être comprise entre 3 et 128 caractères';
    exit;
}

if($password !== $passwordConf){
    echo 'Les deux mots de passe doivent être identiques';
    exit;
}

if(mb_strlen($password) < 3 || mb_strlen($password) > 32){
    echo 'Votre mot de passe doit être compris entre 3 et 32 caractères';
    exit;
}

if(mb_strlen($prenom) > 64){
    echo 'Le prenom doit être compris entre 0 et 64 caractères';
    exit;
}

if(mb_strlen($nom) > 64){
    echo 'Le nom doit être compris entre 0 et 64 caractères';
    exit;
}

$sql = "SELECT count(id) FROM users WHERE email = :email";
$query = $pdo->prepare($sql);
$query->bindValue(':email',$email,PDO::PARAM_STR);
$query->execute();
if($query->fetchColumn() > 0){
    echo 'Un compte existe déjà avec cette adresse mail';
    exit;
}

$sql = "INSERT INTO users (nom,prenom,email,created_at,password) VALUES (:nom, :prenom, :email, NOW(), :password)";
$query = $pdo->prepare($sql);
$query->bindValue(':nom',$nom, PDO::PARAM_STR);
$query->bindValue(':prenom',$prenom,PDO::PARAM_STR);
$query->bindValue(':email',$email, PDO::PARAM_STR);
$query->bindValue(':password',password_hash($password, PASSWORD_DEFAULT),PDO::PARAM_STR);
$query->execute();


echo 'ok';
exit;