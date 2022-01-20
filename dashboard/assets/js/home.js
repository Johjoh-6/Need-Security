import {reloadBd} from "./reload-bd.js";
import {showLogout} from "./modal.js";
import {generate_search_page} from "./search.js";
import {generateDashboardPage} from "./dashboard.js";
import {generate_protocol_path} from "./simulation.js";
import {generate_details_protocol_page} from "./detail.js";
// script principal

$( document ).ready(function() {
    // reload db
    reloadBd();
    setInterval(reloadBd, 300000);

    //menu
    menuBack();

    //modal logout
    const showModal = document.getElementById('logout-show');
    showModal.addEventListener('click', showLogout);
});

// MENU
function menuBack(){
    generateDashboardPage();
    //call function for generate page home here
    //menu nav
    const home = document.getElementById('page-accueil');
    const search = document.getElementById('page-recherche');
    const detail = document.getElementById('page-details');
    const simulation = document.getElementById('page-simulation');

    home.addEventListener('click', (e)=>{
        isActiveMenu('page-accueil');
        generateDashboardPage();
    })
    search.addEventListener('click', (e)=>{
        isActiveMenu('page-recherche');
        generate_search_page();
    })
    detail.addEventListener('click', (e)=>{
        isActiveMenu('page-details');
        generate_details_protocol_page('UDP');
    })
    simulation.addEventListener('click', (e)=>{
        isActiveMenu('page-simulation');
        generate_protocol_path('ICMP');
    })
}

function isActiveMenu(menuID){
    if(document.querySelector('.li-selected') != null){
        document.querySelector('.li-selected').classList.remove('li-selected');
    }
    if(document.getElementById(menuID) != null) {
        document.getElementById(menuID).classList.add('li-selected');
    }
}
