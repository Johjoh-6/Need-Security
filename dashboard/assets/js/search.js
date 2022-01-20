import {generate_table_from_trames} from "./tableau.js";
import {ajax_getTrames} from "./tableau.js";

var searchTimer = null;
var lastSearch = '';

const container = $('#container');
function ajax_search(search){
    showLoading('Actualisation des données...');
    $.ajax({
        type: "GET",
        url: "inc/ajax_search.php",
        data: {search: search},
        success: function(response){
            update_search_page(response);
            hideLoading(100);
        },
        error: function(){
            hideLoading(100);
        }
    });
}

function update_search_page(searchData){
    // Autocomplétion
    const _autocomplete = $('#autocomplete');
    _autocomplete.empty();
    const inputSearch = $('#input-search');

    if(searchData[searchData.length - 2].length > 0){
        _autocomplete.css('display', 'flex');
        let count = 0;
        $.each(searchData[searchData.length - 2], function() {
            if(this.toString() !== inputSearch.val()) {
                const autocompleteData = $('<div class="autocomplete-data">' + this.toString() + '</div>').on('click', function () {
                    const value = $(this).text();
                    $('#input-search').val(value);
                    _autocomplete.empty();
                    _autocomplete.css('display', 'none');
                    ajax_search(value);
                });
                _autocomplete.append(autocompleteData);
                count++;
            }
        });

        if(count == 0){
            _autocomplete.css('display', 'none');
        }
    }
    else{
        _autocomplete.css('display', 'none');
    }

    lastSearch = searchData[searchData.length - 1];
    searchData.pop();
    searchData.pop();
    const searchTable = $('#search-table');
    generate_table_from_trames(searchTable, searchData);
}

function generate_search_page(){
    showLoading('Récupération des informations...');
    container.empty();
    var item, divParent;
    const dashboardMain = $('<section id="search"></section>');

    item = $('<div class="back-box"></div>');
    divParent = $('<div></div>');
    const inputSearch = $('<input id="input-search" type="text" value="'+lastSearch+'" placeholder="Recherche...">');
    divParent.append(inputSearch);
    item.append(divParent);
    dashboardMain.append(item);

    const autocomplete = $('<div id="autocomplete"></div>');
    divParent.append(autocomplete);
    autocomplete.css('display', 'none');

    inputSearch.on('input', function() {
        const value = inputSearch.val();
        const _autocomplete = $('#autocomplete');
        if(value.length <= 0){
            _autocomplete.css('display', 'none');
        }
        if(searchTimer){
            clearTimeout(searchTimer);
        }

        searchTimer = setTimeout(function(){
            _autocomplete.empty();

            if(value.length > 0){
                _autocomplete.css('display', 'flex');
            }
            else{
                _autocomplete.css('display', 'none');
            }
            ajax_search(value);
        }, 800);
    });

    // Ligne autres trames
    const item_autres_trames = $('<div class="back-box"></div>');

    item = $('<div class="back-box_table"></div>');

    const searchTable = $('<div class="table" id="search-table">');
    item.append(searchTable);
    item_autres_trames.append(item);
    dashboardMain.append(item_autres_trames);
    generate_table_from_trames(searchTable, null);

    container.append(dashboardMain);
    ajax_search(lastSearch);
}

export {generate_search_page};