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
            const protocol_data = JSON.parse(response);
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
                        $(':root').css('--red-bad'),
                        $(':root').css('--green-good'),
                        $(':root').css('--blue-unverified')
                    ],
                    hoverOffset: 4
                }]
            };

            let config = {
                type: 'pie',
                data: data,
                options: {
                    maintainAspectRatio: false,
                    responsive: true,
                    layout: {
                        padding: 15
                    }
                }
            };

            const chartjs_graphe_errors = new Chart(chartjs_graphe, config);
            chartjs_graphe_errors.resize(200,200);

            $('#erreur-prct-' + protocol_name.replaceAll('.', '')).text(prct + '%');
            $('#erreur-prct-' + protocol_name.replaceAll('.', '')).text(prct + '%');
            $('#erreur-paquet-count-' + protocol_name.replaceAll('.', '')).text(nbErreurs + '/' + nbData);
            $('#unverified-prct-' + protocol_name.replaceAll('.', '')).text(prctUnverif + '%');
            hideLoading(500);
        },
        error: function(){
            hideLoading(500);
        }
    });
}

function update_details_protocol_desc(protocole){

    $("#detail-protocole .data-box").each(function() {
        if($(this).data('protocol') == protocole){
            $(this).addClass('selected');
        }
        else{
            $(this).removeClass('selected');
        }
    });

    const descContainerTitle = $('#descriptionContainer h2');
    descContainerTitle.text(protocole);

    const descContainerInfos = $('#descriptionContainer p');

    if(protocole === 'ICMP'){
        descContainerInfos.text('L’ICMP (Internet Control Message Protocol) est un protocole de signalement d’erreurs que les appareils de réseau comme les routeurs utilisent pour générer des messages d’erreur à l’adresse IP source lorsque des problèmes de réseau empêchent la livraison de paquets IP. L’Internet Control Message Protocol crée et envoie des messages à l’adresse IP source indiquant qu’une passerelle vers l’internet qu’un routeur, un service ou un hôte ne peut pas être atteint pour la livraison de paquets. Tout dispositif de réseau IP a la capacité d’envoyer, de recevoir ou de traiter des messages ICMP.');
    }
    else if(protocole === 'UDP'){
        descContainerInfos.text('UDP (User Datagram Protocol) est un protocole de communication qui est principalement utilisé pour établir des connexions à faible latence et à tolérance de perte entre les applications sur l’internet. Il accélère les transmissions en permettant le transfert de données avant qu’un accord ne soit fourni par la partie destinataire. L’UDP est donc utile pour les communications sensibles au temps, notamment la voix sur IP (VoIP), la consultation du domain name system (DNS) et la lecture vidéo ou audio. L’UDP est une alternative au protocole de contrôle de transmission (TCP).');
    }
    else if(protocole === 'TCP'){
        descContainerInfos.text('TCP/IP, ou Transmission Control Protocol/Internet Protocol, est une suite de protocoles de communication utilisés pour interconnecter des dispositifs de réseau sur internet. Le TCP/IP peut également être utilisé comme protocole de communication dans un réseau local (LAN).');
    }
    else if(protocole === 'TLSv1.2'){
        descContainerInfos.text('La Transport Layer Security (TLS) est un protocole qui assure l’authentification, la confidentialité et l’intégrité des données entre deux applications informatiques communicantes. Il s’agit du protocole de sécurité le plus largement déployé à l’heure actuelle. Il est utilisé pour les navigateurs web et d’autres applications qui nécessitent l’échange sécurisé de données sur un réseau, comme les sessions de navigation sur le web, les transferts de fichiers, les connexions VPN, les sessions de bureau à distance et la voix sur IP (VoIP).');
    }
    else{
        descContainerInfos.text('');
    }
}

/* Page détails */
function generate_details_protocol_page(protocole){
    container.empty();
    const dashboardMain = $('<section id="detail-protocole"></section>');

    // Ligne titre
    let item = $('<div class="back-box"></div>');
    let box_clickable = $('<div data-protocol="ICMP" class="data-box clickable selected"></div>');
    box_clickable.append($('<h3 class="data-box_name">ICMP</h3>')).on('click', function(){
        update_details_protocol_desc('ICMP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="UDP" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">UDP</h3>')).on('click', function(){
        update_details_protocol_desc('UDP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="TCP" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TCP</h3>')).on('click', function(){
        update_details_protocol_desc('TCP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="TLSv1.2" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TLSv1.2</h3>')).on('click', function(){
        update_details_protocol_desc('TLSv1.2');
    });
    item.append(box_clickable);
    dashboardMain.append(item);

    item = $('<div class="back-box"></div>');
    const descriptionContainer = $('<div id="descriptionContainer"></div>');
    descriptionContainer.append($('<h2>ICMP</h2>'));
    descriptionContainer.append($('<p></p>'));
    item.append(descriptionContainer);
    dashboardMain.append(item);

    const item_graphes = $('<div class="back-box"></div>');
    dashboardMain.append(item_graphes);
    item = $('<div class="back-box_graph"></div>');
    item.append('<h2>Trames des 7 derniers jours</h2>');

    const chartjs_canvas = $('<canvas id="graphe_days"></canvas>');
    const chartjs_canvas_parent = $('<div class="back-box_graph__chatjs" id="graphe_days_parent"></div>');
    chartjs_canvas_parent.append(chartjs_canvas);
    item.append(chartjs_canvas_parent);
    item_graphes.append(item);

    let config = {
        type: 'bar',
        data: {
            labels: [],
            datasets: []
        }
    };

    const chartjs_graphe_days = new Chart(chartjs_canvas, config);
    ajax_getDaysData(chartjs_graphe_days);

    // Ligne graphes (errors)

    let proto = ['ICMP', 'UDP', 'TCP', 'TLSv1.2'];
    for(let i=0; i<proto.length;i++){
        let item_graphes_er = $('<div class="back-box"></div>');
        item = $('<div class="back-box_graph"></div>');
        item.append('<h2>Erreurs '+proto[i]+'</h2>');
        item.append('<p class="error-trame-infos"><strong id="erreur-prct-'+proto[i].replaceAll('.', '')+'">0%</strong> d\'erreurs, <strong id="erreur-paquet-count-'+proto[i].replaceAll('.', '')+'">0/0</strong> trame(s)' +
            '<br /><strong id="unverified-prct-'+proto[i].replaceAll('.', '')+'">0%</strong> n\'ont pas pu être vérifiées</p>');
        const chartjs_canvas = $('<canvas id="graphe_errors_'+proto[i].replaceAll('.', '')+'"></canvas>');
        const chartjs_canvas_parent = $('<div class="back-box_graph__chatjs" id="graphe_errors_parent"></div>');
        chartjs_canvas_parent.append(chartjs_canvas);
        item.append(chartjs_canvas_parent);

        ajax_getProtocolData(chartjs_canvas, proto[i]);

        item_graphes_er.append(item);
        dashboardMain.append(item_graphes_er);
    }

    container.append(dashboardMain);
    update_details_protocol_desc('ICMP');
    hideLoading(200);
}


function ajax_getDaysData(chartjs_graphe){
    showLoading('Récupération des informations...');
    $.ajax({
        type: "GET",
        url: "inc/ajax_get_days_data.php",
        data: {},
        success: function(response){
            const days_data = JSON.parse(response);

            let cpt = 0;
            let jour_icmp = [];
            let jour_tcp = [];
            let jour_udp = [];
            let jour_tls = [];
            $.each(days_data, function() {
                if(cpt > 0){
                    if(this.ICMP != null) {
                        jour_icmp[cpt-1] = this.ICMP;
                    }
                    else{
                        jour_icmp[cpt-1] = 0;
                    }
                    if(this.TCP != null) {
                        jour_tcp[cpt-1] = this.TCP;
                    }
                    else{
                        jour_tcp[cpt-1] = 0;
                    }
                    if(this.UDP != null) {
                        jour_udp[cpt-1] = this.UDP;
                    }
                    else{
                        jour_udp[cpt-1] = 0;
                    }
                    if(this['TLSv1.2'] != null) {
                        jour_tls[cpt-1] = this['TLSv1.2'];
                    }
                    else{
                        jour_tls[cpt-1] = 0;
                    }
                }
                cpt++;
            });

            let data = {
                labels: days_data[0],
                datasets: [
                    {
                        label: 'ICMP',
                        data: jour_icmp,
                        backgroundColor: '#D6E9C6'
                    },
                    {
                        label: 'TCP',
                        data: jour_tcp,
                        backgroundColor: '#FAEBCC'
                    },
                    {
                        label: 'UDP',
                        data: jour_udp,
                        backgroundColor: '#EBCCD1'
                    },
                    {
                        label: 'TLSv1.2',
                        data: jour_tls,
                        backgroundColor: '#ef526c'
                    }
                ]
            };
            chartjs_graphe.config.data = data;
            chartjs_graphe.update();
            hideLoading(500);
        },
        error: function(){
            hideLoading(500);
        }
    });
}


export {generate_trame_details, generate_details_protocol_page};