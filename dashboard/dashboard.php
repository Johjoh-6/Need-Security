<?php
require_once ('../inc/bases.php');

if(!isLoggedIn()){
    header('Location: ../');
    exit;
}

include_once ('inc/header_back.php');

?>
    <div id="container">
        <section id="simulation">
            <div class="back-box">
                <div class="data-box clickable">
                    <h3 class="data-box_name">ICMP</h3>
                </div>
                <div class="data-box clickable">
                    <h3 class="data-box_name">UDP</h3>
                </div>
                <div class="data-box clickable">
                    <h3 class="data-box_name">TCP</h3>
                </div><div class="data-box clickable">
                    <h3 class="data-box_name">TLSv1.2</h3>
                </div>
            </div>

            <div class="back-box">
                <div class="way-list">
                    <h2>Protocole ICMP</h2>
                    <div  data-trameid="111" class="way-box">
                        <h4 class="way-title">Paquet <span class="bold-id">0xa443</span></h4>

                        <div class="way">

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-from">172.217.19.227</p>
                            </div>

                            <div class="transit-box">
<!--                                Add class keyframe -->
                                <i  class="fas fa-network-wired data-transit with-return good" ></i>
                                <span class="way-code way-code-1">0x00</span>
                                <i class="fas fa-long-arrow-alt-right way-paquet "></i>

                                <i class="fas fa-long-arrow-alt-left way-paquet "></i>
                                <span class="way-code way-code-2">0x00</span>
                            </div>

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-dest">192.168.1.74</p>
                            </div>

                        </div>
                </div>
                    <div id="bad" data-trameid="112" class="way-box">
                        <h4 class="way-title">Paquet <span class="bold-id">0xa444</span></h4>

                        <div class="way">

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-from">172.217.19.227</p>
                            </div>

                            <div class="transit-box">
                                <!--                                Add class keyframe -->
                                <i data-trajet="aller-retour" class="fas fa-network-wired data-transit with-return bad" ></i>
                                <span class="way-code way-code-1">0x00</span>
                                <i class="fas fa-long-arrow-alt-right way-paquet "></i>

                                <i class="fas fa-long-arrow-alt-left way-paquet "></i>
                                <span class="way-code way-code-2">0x00</span>
                            </div>

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-dest">192.168.1.74</p>
                            </div>

                        </div>
                    </div>
<!--for other than ICMP-->
                    <div  data-trameid="112" class="way-box">
                        <h4 class="way-title">Paquet <span class="bold-id">0xa444</span></h4>

                        <div class="way">

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-from">172.217.19.227</p>
                            </div>

                            <div class="transit-box">
                                <!--                                Add class keyframe -->
                                <i data-trajet="aller-retour" class="fas fa-network-wired data-transit one-way good" ></i>
                                <span class="way-code way-code-1">0x00</span>
                                <i class="fas fa-long-arrow-alt-right way-paquet "></i>

                            </div>

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-dest">192.168.1.74</p>
                            </div>

                        </div>
                    </div>

                    <div  data-trameid="112" class="way-box">
                        <h4 class="way-title">Paquet <span class="bold-id">0xa444</span></h4>

                        <div class="way">

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-from">172.217.19.227</p>
                            </div>

                            <div class="transit-box">
                                <!--                                Add class keyframe -->
                                <i data-trajet="aller-retour" class="fas fa-network-wired data-transit one-way bad" ></i>
                                <span class="way-code way-code-1">0x00</span>
                                <i class="fas fa-long-arrow-alt-right way-paquet "></i>

                            </div>

                            <div class="way-from">
                                <i class="fas fa-laptop-code way-paquet"></i>
                                <p class="way-ip way-ip-dest">192.168.1.74</p>
                            </div>

                        </div>
                    </div>

                </div>
        </section>
    </div>
    </main>
<?php
include('inc/footer_back.php');