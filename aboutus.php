<?php
require_once ('inc/bases.php');
killSession();
include_once ('inc/header.php');
?>
    <section id="abouts-us">
        <div>
            <h2>À propos de nous...</h2>
            <p><?= $NOM_SITE_COLORED; ?> est un projet concernant une plateforme d'analyse de trame qui permet d'éviter les attaques DDoS. Créée en janvier 2022 par l'équipe de <?= $NOM_SITE_COLORED; ?>, elle est composée d'une équipe de 4 personnes :</p>
            <ul>
                <li>- Léonard JOUEN (Administrateur système & réseau)</li>
                <li>- Johann SIX (Analyste réseau)</li>
                <li>- Romain LALLEMENT (Ingénieur réseau)</li>
                <li>- Anthony CHEVALIER (Ingénieur réseau)</li>
            </ul>

            <h2><?= $NOM_SITE_COLORED;?>, spécialisé dans l'analyse de trames</h2>

            <p><?= $NOM_SITE_COLORED; ?> a pour objectif d'analyser les trames réseaux comme :</p>
            <ul>
                <li>- les trames TCP : Transmission Control Protocol </li>
                <li>- les trames UDP : User Datagram Protocol</li>
                <li>- les trames ICMP : Internet Control Message Protocol </li>
                <li>- les trames TLS : Transport Layer Security</li>
            </ul>
        </div>
    </section>
<?php
include('inc/footer.php');
