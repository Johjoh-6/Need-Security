import {ajax_getTrameDetail} from "./tableau.js";

const container = $('#container');

function generate_protocol_path(protocol_name){
    container.empty();

    const dashboardMain = $('<section id="simulation"></section>');

    // Ligne titre
    var item = $('<div class="back-box"></div>');
    var box_clickable = $('<div data-protocol="ICMP" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">ICMP</h3>')).on('click', function(){
        generate_protocol_path('ICMP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="UDP" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">UDP</h3>')).on('click', function(){
        generate_protocol_path('UDP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="TCP" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TCP</h3>')).on('click', function(){
        generate_protocol_path('TCP');
    });
    item.append(box_clickable);
    box_clickable = $('<div data-protocol="TLSv1.2" class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TLSv1.2</h3>')).on('click', function(){
        generate_protocol_path('TLSv1.2');
    });
    item.append(box_clickable);
    dashboardMain.append(item);

    // Ligne chemins
    item = $('<div class="back-box"></div>');
    dashboardMain.append(item);
    ajax_generateProtocolPath(item, protocol_name);

    container.append(dashboardMain);

    $("#simulation .data-box").each(function() {
        if($(this).data('protocol') == protocol_name){
            $(this).addClass('selected');
        }
        else{
            $(this).removeClass('selected');
        }
    });
}

function ajax_generateProtocolPath(element, protocol_name){
    showLoading('Récupération des données...');
    $.ajax({
        type: "GET",
        url: "inc/ajax_get_simulation.php",
        data: {protocolName: protocol_name},
        success: function(response){
            const chemins = JSON.parse(response);
            const divCheminParent = $('<div class="way-list">');
            divCheminParent.append('<h2>Protocole '+protocol_name+'</h2>');
            $.each(chemins, function() {
                $.each(this, function() {
                    const divCheminItem = $('<div data-trameid="'+this.id+'" class="way-box"></div>').on('click', function(){
                        const trameid = $(this).data('trameid');
                        ajax_getTrameDetail(trameid);
                    });
                    const h4 = $(`<h4 class="way-title">Paquet <span class="bold-id">${this.identification}</span></h4>`);
                    const way = $(`<div class="way">`);
                    divCheminItem.append(h4);
                    divCheminItem.append(way);

                    //Div to
                    const divTo = $(`<div class="way-to"></div>`);
                    const paquetTo = $('<i class="fas fa-laptop-code way-paquet"></i>');
                    const pTo =$(`<span class="way-ip way-ip-from">${this.ip_from }</span>`);
                    divTo.append(paquetTo);
                    divTo.append(pTo);
                    way.append(divTo);

                    //Div transit

                    const arrows = $('<div class="transit-box">');
                    const animate = $(` <i  class="fas fa-network-wired data-transit" ></i>`);
                    arrows.append(animate);
                    //Add function for add the class

                    const codeTo = $(`<span class="way-code way-code-1">${statusCode(this.statut)}</span>`);
                    const arrowR = $(`<i class="fas fa-long-arrow-alt-right way-paquet "></i>`);

                    arrows.append(codeTo);
                    arrows.append(arrowR);
                    if(protocol_name === 'ICMP'){
                        const codeFrom = $(`<span class="way-code way-code-2">0x00</span>`);
                        const arrowL = $(`<i class="fas fa-long-arrow-alt-left way-paquet "></i>`);

                        arrows.append(arrowL);
                        arrows.append(codeFrom);
                        animate.addClass('with-return');
                        if (this.statut.length > 0){
                            animate.addClass('bad');
                            arrowR.addClass('send-bad');
                            arrowL.addClass('send-bad');
                        } else {
                            animate.addClass('good');
                            arrowR.addClass('send-good');
                            arrowL.addClass('send-good');
                        }
                    } else {
                        animate.addClass('one-way');
                        //Because we don't have any information to verify
                        animate.addClass('unverified');
                        arrowR.addClass('send-unverified');
                    }


                    way.append(arrows);

                    //Div from
                    const divFrom = $(`<div class="way-from"></div>`);
                    const paquetFrom = $('<i class="fas fa-laptop-code way-paquet"></i>');
                    const pFrom =$(`<span class="way-ip way-ip-dest">${this.ip_dest }</span>`);
                    divFrom.append(paquetFrom);
                    divFrom.append(pFrom);
                    way.append(divFrom);


                    divCheminParent.append(divCheminItem);
                });
            });
            element.append(divCheminParent);
            hideLoading(500);
        },
        error: function(){
            hideLoading(500);
        }
    });
}
function statusCode(status){
    if(status != ''){
        return status;
    }
    return '0x00';
}



export {generate_protocol_path};