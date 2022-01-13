/*import reloadBd from "./reload-bd.js";

reloadBd();
setInterval(reloadBd, 300000);*/

$( document ).ready(function() {

    const container = $('#container');

    const table = $('#last-trames');
    ajax_getTrames(table, 1);

    // Graphe - Pie 1

    let data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    let config = {
        type: 'pie',
        data: data,
    };

    const chart1 = new Chart(
        document.getElementById('chart-1'),
        config
    );

    // Graphe - 2

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    config = {
        type: 'line',
        data: data,
        options: {}
    };

    const chart2 = new Chart(
        document.getElementById('chart-2'),
        config
    );


    function ajax_getTrameDetail(trameid){
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_get_trame_data.php",
                data: {trameid: trameid},
                success: function(response){
                    if(response.length > 0){
                        const trame = JSON.parse(response);
                        generate_trame_details(trame);
                    }
                },
                error: function(){

                }
            });
        }, 600);
    }

    function generate_trame_details(trame){
        container.empty();
        const dashboardMain = $('<section id="dashboard-main"></section>');
        const items = $('<div class="dashboard-items"></div>');
        dashboardMain.append(items);

        const item_line = $('<div class="dashboard-items-line"></div>');

        items.append(item_line);

        container.append(dashboardMain);
    }

    function ajax_getTrames(table, page, nbRows = 10){
        const tableHeight = table.css('height');
        table.fadeOut(350, function(){
        });

        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_table_trames.php",
                data: {page: page, nbRows: nbRows},
                success: function(response){
                    if(response.length > 1){
                        generate_table_from_trames(table, response);
                    }

                    table.fadeIn(350, function(){  });
                },
                error: function(){
                    table.fadeIn(350, function(){  });
                }
            });
        }, 600);
    }

    function generate_table_from_trames(table, response){
        const trHeader = $('<tr class="table-header"></tr>');

        $.each(response[0], function(k, v) {
            if(k !== 'id'){
                const tdHeader = $('<td>'+ capitalizeFirstLetter(k.replaceAll('_', ' ')) + '</td>');
                trHeader.append(tdHeader);
            }
        });

        table.empty();
        table.append(trHeader);

        let cpt = 0;
        $.each(response, function() {
            if(cpt < response.length - 1){
                const trTrame = $('<tr class="trame-clickable" data-idtrame="' + $(this)[0]['id'] + '"></tr>').on('click', function(){
                    ajax_getTrameDetail($(this).data("idtrame"));
                });

                $.each(this, function(k, v) {
                    if(k !== 'id'){
                        const tdTrame = $('<td>'+v+'</td>');
                        trTrame.append(tdTrame);
                    }
                });
                table.append(trTrame);
            }
            else{
                // Régénération du paginator
                const paginator = $('<div class="paginator"></div>');
                $.each(this, function(k, v) {
                    const paginatorItem = $('<span data-tableid="' + table.attr('id') + '" class="paginator-item"></span>');
                    if(v[1] === 'selected'){
                        paginatorItem.addClass('paginator-selected');
                    }
                    paginatorItem.text(v[0]);
                    paginatorItem.on('click', function(){
                        const page = parseInt($(this).text());
                        const table = $('#' + $(this).data("tableid"));
                        ajax_getTrames(table, page);
                    });
                    paginator.append(paginatorItem);
                });
                table.append(paginator);
            }
            cpt++;
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

//Show logout
const showModal = document.getElementById('logout-show');
showModal.addEventListener('click', showLogout);
function showLogout(){
    console.log('Ask for logout');
    const modal = document.querySelector('#modal-logout');
    const closeModal = document.querySelector('#n');
    modal.style.display = "block";
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
};