import {ajax_graph} from './graph.js';
import {ajax_getTrames} from "./tableau.js";

function generateDashboardPage(){
    showLoading('Récupération des informations...');
    const container = document.getElementById('container');
    //clear container
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const dashBoard = document.createElement('section');
    dashBoard.id = "dashboard";
    container.appendChild(dashBoard);

    //data box
//Ajax
    function ajax_info(table){

        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_get_info.php",
                data: {table: table},
                success: function(response){
                    if(response.length > 0){
                        const json = JSON.parse(response);
                        const info = getInfo(json);
                        creatBoxData(info);
                    }
                },
                error: function(){
                }
            });
        }, 600);
    }
    function getInfo(objectList){
        let totalTrame = objectList.length;
        let ttl = objectList.filter(object => (object.ttl == 128)).length;
        let disable = objectList.filter(object => (object.protocol_checksum_status == 'disabled')).length;
        let type = objectList.filter(object => (object.protocol_type == '8')).length;

        let info = {
            'Total de trames': totalTrame,
            'TTL sans perte': ttl,
            'Protocole status Disable': disable,
            'Nombre de requêtes': type
        }

        return info;
    }

    function creatBoxData(dataList){
        const dashBoard = document.getElementById('dashboard');
        const dataDiv = document.createElement('div');
        dataDiv.classList.add('back-box');
        for(const data in dataList){
            //creat box
            const dataBox = document.createElement('div');
            dataBox.classList.add('data-box');
            //dataBox.classList.add('clickable');
            const dataBoxName = document.createElement('h3');
            dataBoxName.classList.add('data-box_name');
            dataBox.appendChild(dataBoxName);
            const dataBoxNb = document.createElement('p');
            dataBoxNb.classList.add('data-box_nb');
            dataBox.appendChild(dataBoxNb);

            //add info
            dataBoxName.innerText = data;
            dataBoxNb.innerText = dataList[data];

            //put in the div container
            dataDiv.appendChild(dataBox);
        }
        dashBoard.insertAdjacentElement('afterbegin',dataDiv);
    }
    //get data
    ajax_info('trames');




    //Graph
    const graphDiv = document.createElement('div');
    graphDiv.classList.add('back-box');
    graphDiv.classList.add('graph-box');

        //Graph 1
        graphDiv.appendChild(divGraph('Répartition des protocoles', 'chart-pie1' ));
        ajax_graph('trames', 'protocol_name', 'pie', 'chart-pie1');

        //Graph 2
        graphDiv.appendChild(divGraph('Status protocole', 'chart-bar1'));
        ajax_graph('trames', 'protocol_checksum_status', 'bar', 'chart-bar1', 'hide');

    dashBoard.appendChild(graphDiv);

    //Table
    const tableDiv = document.createElement('div');
    tableDiv.classList.add('back-box');

    let tableContent = `<div class="back-box_table">
                    <h2>Dernières trames</h2>
                    <div class="table" id="last-trames">
                    </div>
                </div>`
    tableDiv.innerHTML = tableContent;
    dashBoard.appendChild(tableDiv);
    // Insert dynamic table
    const table = $('#last-trames');
    ajax_getTrames(table, 1);
}

function divGraph(title, id){
    const div = document.createElement('div');
    div.classList.add('back-box_graph');
    const h2 = document.createElement('h2');
    h2.innerText = title;
    const divBox = document.createElement('div');
    divBox.classList.add('back-box_graph__chatjs');
    const canvas = document.createElement('canvas');
    canvas.id = id;
    divBox.appendChild(canvas);
    div.appendChild(h2);
    div.appendChild(divBox);
    return div;
}



export {generateDashboardPage};