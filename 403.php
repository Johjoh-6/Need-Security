<?php
require_once ('inc/bases.php');
killSession();
include_once ('inc/header.php');
?>
    <section class="redirect">
        <div class="redirect-error">
        <p class="redirect-error_title">403</p>
        <p class="redirect-error_subtitle">Access denied</p>
        </div>
        <p class="return-homepage">
            <a href="index.php">Retour a l'accueil</a>
        </p>
    </section>
<?php
include('inc/footer.php');