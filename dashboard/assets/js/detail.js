import {addChartData, removeChartData} from "./utils.js";
import {ajax_getTrames} from "./tableau.js";

const container = $('#container');
    function generate_trame_details(trame){
        container.empty();
        const dashboardMain = $('<section id="detail"></section>');

        // Ligne titre
        var item = $('<div class="back-box"></div>');
        const title = $('<div><h2>Trame <strong>'+trame.identification+'</strong> ('+trame.protocol_name+')</h2></div>');

        var backBoxContent = $('<div></div>');

        item.append(title);
        dashboardMain.append(item);

        // Ligne infos
        item = $('<div class="back-box"></div>');

        backBoxContent.append($('<h2>Informations globales</h2>'));
        item.append(backBoxContent);

        var trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><h4>Date</h4><p>'+trame.frame_date+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Version</h4><p>'+trame.version+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Header length</h4><p>'+trame.header_length+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Service</h4><p>'+trame.service+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Flags code</h4><p>'+trame.flags_code+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>TTL</h4><p>'+trame.ttl+'</p></div>'));

        backBoxContent.append(trame_data_item);
        dashboardMain.append(item);
        item = $('<div class="back-box"></div>');
        backBoxContent = $('<div></div>');
        backBoxContent.append($('<h2>Protocole</h2>'));

        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><h4>Protocol name</h4><p>'+trame.protocol_name+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Protocol checksum status</h4><p>'+trame.protocol_checksum_status+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Protocol port from</h4><p>'+trame.protocol_ports_from+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>Protocol port dest</h4><p>'+trame.protocol_ports_dest+'</p></div>'));

        backBoxContent.append(trame_data_item);
        item.append(backBoxContent);
        dashboardMain.append(item);
        item = $('<div class="back-box"></div>');
        backBoxContent = $('<div></div>');
        backBoxContent.append($('<h2>IP</h2>'));
        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><h4>Header checksum</h4><p>'+trame.header_checksum+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>IP from</h4><p>'+trame.ip_from+'</p></div>'));
        trame_data_item.append($('<div class="trame-info-data"><h4>IP dest</h4><p>'+trame.ip_dest+'</p></div>'));

        backBoxContent.append(trame_data_item);
        item.append(backBoxContent);

        dashboardMain.append(item);

        // Ligne graphes (errors)

        let data = {
            labels: [
                'Erreurs',
                'Valides'
            ],
            datasets: [{
                label: 'Trames ' + trame.protocol_name,
                data: [0,0],
                backgroundColor: [
                    'rgb(252,66,66)',
                    'rgb(65,220,82)'
                ],
                hoverOffset: 4
            }]
        };

        const item_graphes = $('<div class="back-box"></div>');
        dashboardMain.append(item_graphes);
        item = $('<div class="back-box_graph"></div>');
        item.append('<h2>Erreurs '+trame.protocol_name+'</h2>');
        item.append('<p class="error-trame-infos"><strong id="erreur-prct">0%</strong> d\'erreurs, <strong id="erreur-paquet-count">0/0</strong> trame(s)' +
            '<br /><strong id="unverified-prct">0%</strong> n\'ont pas pu être vérifiées</p>');
        const chartjs_canvas = $('<canvas id="graphe_errors"></canvas>');
        const chartjs_canvas_parent = $('<div class="back-box_graph__chatjs" id="graphe_errors_parent"></div>');
        chartjs_canvas_parent.append(chartjs_canvas);
        item.append(chartjs_canvas_parent);


        let config = {
            type: 'pie',
            data: data,
            options: {
                maintainAspectRatio: false,
            }
        };

        const chartjs_graphe_errors = new Chart(chartjs_canvas, config);
        chartjs_graphe_errors.resize(200,200);
        ajax_getProtocolData(chartjs_graphe_errors, trame.protocol_name);

        item_graphes.append(item);

        // Ligne autres trames
        const item_autres_trames = $('<div class="back-box"></div>');

        item = $('<div class="back-box_table"></div>');

        item.append('<h2>Trames en protocole '+trame.protocol_name+'</h2>');

        const tableSameProtocol = $('<div class="table" id="same-protocol">');
        item.append(tableSameProtocol);
        item_autres_trames.append(item);
        dashboardMain.append(item_autres_trames);
        ajax_getTrames(tableSameProtocol, 1, 10, trame.protocol_name);

        container.append(dashboardMain);
    }

    function ajax_getProtocolData(chartjs_graphe, protocol_name){
        showLoading('Récupération des informations du protocole '+protocol_name+'...');
        $.ajax({
            type: "GET",
            url: "inc/ajax_get_protocol_data.php",
            data: {protocolName: protocol_name},
            success: function(response){
                console.log(response);
                const protocol_data = JSON.parse(response);
                console.log(protocol_data);
                const nbErreurs = protocol_data.erreurs.length;
                const nbData = protocol_data.paquets_count;
                const nbUnverified = protocol_data.unverified.length;
                const prct = (nbErreurs / nbData) * 100;
                const prctUnverif = (nbUnverified / nbData) * 100;

                let data = {
                    labels: [
                        'Erreurs',
                        'Valides',
                        'Non vérifiés'
                    ],
                    datasets: [{
                        label: 'Trames ' + protocol_name,
                        data: [nbErreurs,(nbData - nbErreurs - nbUnverified), nbUnverified],
                        backgroundColor: [
                            'rgb(252,66,66)',
                            'rgb(65,220,82)',
                            'rgb(191,191,191)'
                        ],
                        hoverOffset: 4
                    }]
                };
                chartjs_graphe.config.data = data;
                chartjs_graphe.update();

                /*addChartData(chartjs_graphe, "Erreurs", {
                    backgroundColor: '#CFFF0A',
                    label: "Erreurs",
                    data: nbErreurs
                });
                addChartData(chartjs_graphe, "Non vérifiés", nbUnverified);
                addChartData(chartjs_graphe, "Valides", (nbData - nbErreurs - nbUnverified));*/
                $('#erreur-prct').text(prct + '%');
                $('#erreur-paquet-count').text(nbErreurs + '/' + nbData);
                $('#unverified-prct').text(prctUnverif + '%');
                hideLoading(500);
            },
            error: function(){
                hideLoading(500);
            }
        });
    }

export {generate_trame_details};