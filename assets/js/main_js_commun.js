/*
Ancien système : faire comme on a dit, un chargement sur toute la page
function generate_loader(){
    const loaderContainer = $("<div class=\"loader-container\"></div>");
    const loader = $("<div class=\"loader\"></div>");
    const square_one = $("<div class=\"square one\"></div>");
    const square_two = $("<div class=\"square two\"></div>");
    loaderContainer.append(loader);
    loader.append(square_one, square_two);
    return loaderContainer;
}*/

//showLoading();

Chart.defaults.color = "#fff";

function showLoading(msg = ''){
    if(!$('#loader').length){
        const tmp_loader = $('<div id="loader"></div>');
        $('body').append(tmp_loader);

        const loader = $('#loader');
        const loaderContainer = $('<div class="loader-container"></div>');
        const loaderContainerChild = $('<div class="loader-container-child"></div>');
        const loaderIcon = $('<div id="loader-icon" class="loader-icon"></div>');
        const loaderLogo = $('<div class="loader-logo"></div>');
        const loaderMsg = $('<p class="loader-msg"></p>');
        loaderMsg.text(msg);
        loaderContainerChild.append(loaderIcon);
        loaderIcon.append(loaderLogo);
        loaderContainerChild.append(loaderMsg);
        loaderContainer.append(loaderContainerChild);
        loader.append(loaderContainer);
        loader.fadeIn( "fast");
    }
    else{
        const loader = $('#loader');
        $('.loader-msg').text(msg);
        loader.fadeIn("fast");
    }
}

function hideLoading(timeout = 0){
    setTimeout(function(){
        const loader = $('#loader');
        if(loader.length){
            loader.fadeOut( "slow", function(){
                loader.remove();
            });
        }
    }, timeout);
}