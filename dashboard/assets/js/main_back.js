import reloadBd from "./reload-bd.js";

reloadBd();
setInterval(reloadBd, 300000);

$( document ).ready(function() {

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
