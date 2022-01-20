<?php
require_once ('inc/bases.php');

include_once ('inc/header.php');

?>

    <!--Hero banner-->
    <section id="hero-banner">
        <div id="box-hero">
            <h2>données réseau</h2>
            <p>Visualisez vos données réseau</p>
            <p id="btn-login">Accéder à mon espace</p>
        </div>
    </section>

    <section id="functionality">
        <div>
            <h2>Fonctionnalités</h2>
            <ul id="list-func">
                <li><i class="fas fa-database"></i><p>Accès aux données du réseau et données graphiques sur vos trames</p></li>
                <li><i class="fas fa-server"></i><p>Protection et anticipation des attaques</p></li>
                <li><i class="fas fa-chart-pie"></i><p>Analyse de vos trames réseau et synthèse des données réseau</p></li>
                <li><i class="fas fa-search"></i><p>Recherche rapide et intuitive</p></li>
            </ul>
        </div>
        <div>
            <img src="assets/img/pc.png" alt="ordinateur avec vue sur le dashboard">
        </div>
    </section>

    <section id="analyse">
        <div>
            <h2>Analyse des paquets</h2>
            <ul id="list-func">
                <li><i class="fas fa-table-tennis"></i><p>Récupération des données des pings</p></li>
                <li><i class="fas fa-compress-arrows-alt"></i><p>Simulation du trajet parcouru par les paquets</p></li>
                <li><i class="fas fa-chart-area"></i><p>Représentation graphique par protocole</p></li>
                <li><i class="fas fa-file"></i><p>Synthèse complète des données classées par protocole</p></li>
            </ul>
        </div>
        <div>
            <img src="assets/img/orga.svg" alt="ordinateur avec vue sur le dashboard">
        </div>
    </section>



<?php
include('inc/footer.php');