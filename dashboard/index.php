<?php
require ('../inc/bases.php');
include('inc/header_back.php');

?>
<div id="container">
    <section id="dashboard-main">
        <div class="wrap">

            <div class="dashboard-items">
                <div class="dashboard-items-line">
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 1</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 2</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 3</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 4</span><p>8</p></div>
                </div>
                <div class="dashboard-items-line">
                    <div class="dashboard-item"><h2>Trames</h2>
                        <div id="chart-1-div">
                            <canvas id="chart-1"></canvas>
                        </div>
                    </div>
                    <div class="dashboard-item"><h2>Autre</h2>
                        <div>
                            <canvas id="chart-2"></canvas>
                        </div>
                    </div>
                </div>
                <div class="dashboard-items-line">
                    <div class="dashboard-item"><h2>Autre</h2></div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php
include('inc/footer_back.php');