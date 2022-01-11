<footer class="footer">
    <div class="footer-top">
    <div class="contact">
        <a href="tel:<?=  $PHONE; ?>"><i class="fas fa-phone-square"></i>  <?=  $PHONE; ?></a>
        <a href="mailto:<?=  $MAIL; ?>"><i class="fas fa-envelope"></i>  <?=  $MAIL; ?></a>
        <a href="<?= $ADRESSMAP; ?>"><i class="fas fa-map-marked"></i>  <?=  $ADRESS; ?></a>
    </div>
    <div class="social-red">
        <a href="<?= $FACEBOOK;?>"><i class="fab fa-facebook-square"></i></a>
        <a href="<?= $LINKEDIN;?>"><i class="fab fa-linkedin"></i></a>
        <a href="<?= $TWITTER;?>"><i class="fab fa-twitter-square"></i></a>
    </div>
    </div>
    <div class="footer-bot">
        <p class="copyright">Need Security©2022</p>
        <p><a href="#">Mentions légal</a></p>
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
<script type="module" src="./assets/js/main_back.js"></script>
</body>
</html>