<footer class="footer">
    <div class="footer-top">
    <div class="contact">
        <a target="_blank" href="tel:<?=  $PHONE; ?>"><i class="fas fa-phone-square"></i>  <?=  $PHONE; ?></a>
        <a target="_blank" href="mailto:<?=  $MAIL; ?>"><i class="fas fa-envelope"></i>  <?=  $MAIL; ?></a>
        <a target="_blank" href="<?= $ADRESSMAP; ?>"><i class="fas fa-map-marked"></i>  <?=  $ADRESS; ?></a>
    </div>
    <div class="social-red">
        <a target="_blank" href="<?= $FACEBOOK;?>"><i class="fab fa-facebook-square"></i></a>
        <a target="_blank" href="<?= $LINKEDIN;?>"><i class="fab fa-linkedin"></i></a>
        <a target="_blank" href="<?= $TWITTER;?>"><i class="fab fa-twitter-square"></i></a>
    </div>
    </div>
    <div class="footer-bot">
        <p class="copyright">Need Security©2022</p>

        <p><a href="../mentionslegales.php">Mentions légales</a></p>

        <p><a href="#">Conditions d'utilisation</a></p>
    </div>
</footer>
<div id="modal-logout" class="modal">
    <div class="modal-content" >
        <p id="text-logout">Voulez-vous vous déconnecter ?</p>
        <a id="y" href="logout.php">Oui</a>
        <p id="n">Non</p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
<script src="../assets/js/main_js_commun.js"></script>
<script src="./assets/js/reload-bd.js"></script>
<script src="./assets/js/main_back.js"></script>
<script src="./assets/js/graph.js"></script>
</body>
</html>