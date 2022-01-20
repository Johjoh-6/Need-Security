function ajax_graph(table, column, type, docId, labelT){
    showLoading('Récupération des données graphiques...');
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_graph.php",
            data: {table: table,
                column:  column},
            success: function(response){
                if(response.length > 0){
                    const graph = JSON.parse(response);
                    //generate graph
                    createGraph(graph, type, docId, labelT );
                }
                hideLoading(500);
            },
            error: function(){
                hideLoading(500);
            }
        });
    }, 600);
}


// Graph
function createGraph(object, type, docId, labelT = '' ) {
    //Key = key, Data = Value, color
    let dataT = [];
    let keyT = [];
    let randomColor = [];
    for (const key in object) {
        keyT.push(key);
        dataT.push(object[key]);
        randomColor.push(color());
    }
//func for colos
    function color(){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
    }

//Let's updatedDataSet[] be the array to hold the upadted data set with every update call
    let updatedDataSet;
    /* Creating graph */
    let container = document.getElementById(docId);
    let graph = new Chart(container, {
        type: type,
        data: {
            labels: keyT,
            datasets: [{
                backgroundColor: randomColor,
                label: labelT,
                data: dataT
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: 15
            }
        }
    });
}
    /*Function to update the bar chart*/
    function updateGraph(chart, color, data, labelT) {
        chart.data.datasets.pop();
        chart.data.datasets.push({
            backgroundColor: color,
            label: labelT,
            data: data
        });
        chart.update();
    }

export {ajax_graph};