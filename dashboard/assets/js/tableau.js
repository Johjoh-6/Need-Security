import {capitalizeFirstLetter} from "./utils.js";
import {generate_trame_details} from "./detail.js";
function ajax_getTrames(table, page, nbRows = 10, protocol_name = '') {

    showLoading('Récupération des données du tableau...');
    const tableID = table.attr('id');

    $('#' + tableID + ' .table_body_row').fadeOut(350, function () {
    });

    table.attr('data-protocol', protocol_name);

    setTimeout(function () {
        $.ajax({
            type: "GET",
            url: "inc/ajax_table_trames.php",
            data: {page: page, nbRows: nbRows, protocolName: protocol_name},
            success: function (response) {
                if (response.length > 1) {
                    $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                    generate_table_from_trames(table, response);
                }

                $('#' + tableID + ' .table_body_row').fadeIn(350, function () {
                });
                hideLoading(100);
            },
            error: function () {
                $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                $('#' + tableID + ' .table_body_row').fadeIn(350, function () {
                });
                hideLoading(100);
            }
        });
    }, 600);
}

function generate_table_from_trames(table, response) {
    if(response == null){
        return;
    }
    const tableID = table.attr('id');

    const trHeaderExist = $('#' + tableID + ' .table_head').length;
    if (!trHeaderExist) {
        const trHeaderNew = $('<div class="table_head"></div>');
        if (response != null) {
            $.each(response[0], function (k, v) {
                if (k !== 'id') {
                    const tdHeader = $('<p>' + capitalizeFirstLetter(k.replaceAll('_', ' ')) + '</p>');
                    trHeaderNew.append(tdHeader);
                }
            });
        }
        table.append(trHeaderNew);
    }

    const trBodyExist = $('#' + tableID + ' .table_body').length;
    var goodBody = $('#' + tableID + ' .table_body');
    if (!trBodyExist) {
        const trBodyNew = $('<div class="table_body" id="' + tableID + '-css"></div>');
        goodBody = trBodyNew;
        table.append(goodBody);
    }

    goodBody.empty();

    let cpt = 0;
    let data_count = 0;
    if (response != null) {
        $.each(response, function () {
            if (cpt < response.length - 1) {
                if($(this)[0]['id'] !== -1){
                    const trTrame = $('<div class="table_body_row" data-idtrame="' + $(this)[0]['id'] + '"></div>').on('click', function () {
                        ajax_getTrameDetail($(this).data("idtrame"));
                    });

                    $.each(this, function (k, v) {
                        if (k !== 'id') {
                            const tdTrame = $('<p>' + v + '</p>');
                            trTrame.append(tdTrame);
                        }
                    });
                    goodBody.append(trTrame);
                    data_count++;
                }
            } else {
                // Régénération du paginator s'il n'existe pas
                const paginator = $('#paginator-' + tableID);

                var goodPaginator;
                if (paginator.length) {
                    goodPaginator = paginator;
                } else {
                    goodPaginator = $('<div id="paginator-' + tableID + '" class="paginator"></div>');
                    table.after(goodPaginator);
                }

                goodPaginator.empty();

                $.each(this, function (k, v) {
                    const paginatorItem = $('<span data-tableid="' + table.attr('id') + '" class="paginator-item"></span>');
                    if (v[1] === 'selected') {
                        paginatorItem.addClass('paginator-selected');
                    }
                    paginatorItem.text(v[0]);
                    paginatorItem.on('click', function () {
                        const page = parseInt($(this).text());
                        const table = $('#' + $(this).data("tableid"));
                        const protocol_name = table.attr('data-protocol');
                        ajax_getTrames(table, page, 10, protocol_name);
                    });
                    goodPaginator.append(paginatorItem);
                });
            }
            cpt++;
        });

        if(data_count == 0){
            const trTrame = $('<div class="table_body_row""></div>');
            const tdTrame = $('<p style="padding: 1rem; color: white;">Aucune donnée correspondante.</p>');
            trTrame.append(tdTrame);
            goodBody.append(tdTrame);
        }
    }
}

function ajax_getTrameDetail(trameid){
    showLoading('Récupération des données de la trame...');
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_get_trame_data.php",
            data: {trameid: trameid},
            success: function(response){
                if(response.length > 0){
                    const trame = JSON.parse(response);
                    generate_trame_details(trame);
                    hideLoading(500);
                }
            },
            error: function(){

            }
        });
    }, 600);
}

export {ajax_getTrames, generate_table_from_trames, ajax_getTrameDetail};
