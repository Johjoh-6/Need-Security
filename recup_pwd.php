<?php
require_once ('inc/bases.php');

if (isLoggedIn()){
    header('Location: ./dashboard');
    die();
}

$error = [];
$succes = false;
$token = $_GET['token'];
$email = $_GET['email'];


if (!empty($token) && !empty($email)) {
    $sql = "SELECT count(id) FROM users WHERE email = :email AND token = :token";
    $query = $pdo->prepare($sql);
    $query->bindValue(':email', $email, PDO::PARAM_STR);
    $query->bindValue(':token', $token, PDO::PARAM_STR);
    $query->execute();
    if ($query->rowCount() > 0) {

        if (!empty($_POST['submitted'])) {
            //For users
            //XSS
            $password = cleanXss($_POST['pwd']);
            $password_confirm = cleanXss($_POST['pwd_confirmed']);

            $error = samePassword($error,$password, $password_confirm, 'pwd_confirmed');
            // Error
            $error = emailValidation($error, $email, 'email');
            $error = validInput($error, $password, 'pwd_confirmed', 3, 255);
            $error = validInput($error, $password_confirm, 'pwd_confirmed', 3, 255);

            /*If not error*/
            if (count($error) == 0) {
                $password_verify = password_hash($password_confirm , PASSWORD_DEFAULT);
                $sql = "UPDATE users 
                SET password = :password,token= '', modified_at = NOW() 
                WHERE email = :email";

                // Prepare la request
                $query = $pdo->prepare($sql);
                // Injection SQL
                $query->bindValue(':email', $email, PDO::PARAM_STR);
                $query->bindValue(':password', $password_verify, PDO::PARAM_STR);

                //executer la query
                $query->execute();
                $succes = true;
            }

        }
    }
} else {
    header('Location: index.php');
    die();
}

include_once ('inc/header.php');

?>
<section id="lost-token">
        <?php if ($succes) { ?>
            <div class="msg">
                <p>Mot de passe modifié</p>
                <p><a href="index.php">Retour à l'accueil</a></p>
            </div>
        <?php } else { ?>
            <form action="" method="post" class="wrapform" novalidate>
                <label for="pwd">Saisissez votre nouveau mot de passe :</label>
                <input type="password" name="pwd" id="pwd" placeholder="">
                <label for="pwd_confirmed">Saisissez à nouveau votre mot de passe :</label>
                <input type="password" name="pwd_confirmed" id="pwd_confirmed" placeholder="">
                <span class="error"><?= returnError($error, 'pwd_confirmed'); ?></span>
                <input type="submit" class="submit" name="submitted" value="Valider">
            </form>
        <?php } ?>
</section>

<?php
include('inc/footer.php');
