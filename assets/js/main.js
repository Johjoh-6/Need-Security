

//Show logout
const showConnect = document.getElementById('btn-connection');
const showLogin = document.getElementById('btn-login');
if (showLogin != null){
    showLogin.addEventListener('click', function(){
        showModal('login');
    });
}
showConnect.addEventListener('click', function (){
    showModal('login');
});
function showModal(modalType, defaultEmail = ''){

    const actual_modal = document.querySelector('.modal');
    if(actual_modal != null){
        actual_modal.remove();
    }

    const modal = document.createElement('div');
    modal.classList.add('modal');
    const content = document.createElement('div');
    content.classList.add('modal-content');
    const closeModal = document.createElement('div');
    closeModal.classList.add('absolute-modal');
    const iClose = document.createElement('i');
    iClose.id = 'close';
    iClose.classList.add('far');
    iClose.classList.add('fa-times-circle');
    closeModal.appendChild(iClose);
    content.appendChild(closeModal);
    modal.appendChild(content);
    const form = document.createElement('form');
    form.classList.add('form-modal');
    content.appendChild(form);

    document.body.insertAdjacentElement("beforeend", modal);


    if(modalType === 'login'){
        loginModal(defaultEmail);
    }
    else if(modalType === 'register'){
        signModal();
    }

    closeModal.addEventListener('click', ()=>{
        modal.remove();
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.remove();
        }
    })
};

function loginModal(defaultEmail = ''){
    const form = document.querySelector('.form-modal');
    form.innerText = '';
    form.id = 'login-form';
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    form.setAttribute('novalidate', 'novalidate');

    if(defaultEmail.length > 0){
        form.innerHTML += '<p class="success">Votre compte a bien été créé. Vous pouvez désormais vous connecter.</p>';
    }

    let html = `
            <label for="user-id">Adresse e-mail</label>
            <input type="email" name="user-id" id="user-id" value="` + defaultEmail + `">

            <label for="user-pwd">Mots de passe</label>
            <input type="password" name="user-pwd" id="user-pwd">

            <input type="submit" id="submitted-login" value="Se connecter">
            <p class="error" id="error-login"></p>
            <p class="low-focus"><a href="request_pwd.php">Mot de passe oublié</a></p>

            <p class="sub-btn-modal" id="sign-in">Inscrivez vous</p>
       `;
    form.innerHTML += html;
    add_form_event('login'); // gère les events & envois ajax
    const sign = document.getElementById('sign-in');
    sign.addEventListener('click', function(){
        showModal('register');
    });
}

function signModal(){
    const form = document.querySelector('.form-modal');
    form.innerText = '';
    form.id = 'register-form';
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    form.setAttribute('novalidate', 'novalidate');
    let html = `
            <label for="last-name">Nom</label>
            <input type="text" name="last-name" id="last-name">

            <label for="first-name">Prénom</label>
            <input type="text" name="first-name" id="first-name">

            <label for="email">Adresse e-mail</label>
            <input type="email" name="email" id="email">

            <label for="pwd">Mots de passe</label>
            <input type="password" name="pwd" id="pwd">

            <label for="pwd-confirm">Confirmer votre mots de passe</label>
            <input type="password" name="pwd-confirm" id="pwd-confirm">
            
            <p>En vous inscrivant, vous acceptez les <a href="#">Conditions d'Utilisation</a> et la <a href="#">Politique de confidentialité</a></p>

            <input type="submit" id="submitted-sign" value="S'inscrire">
            <p class="error" id="error-register"></p>

            <p class="sub-btn-modal" id="login">Se connecter</p>
        
`;
    form.innerHTML = html;
    add_form_event('register'); // gère les events & envois ajax
    const login = document.getElementById('login');
    login.addEventListener('click', function(){
        showModal('login');
    });
}

// Requête de login
function ajax_requestLogin(email, pass, connectionType = 'normal', rememberMe = 0){ // (rememberMe 0 ou 1)
    const loginError = $('#error-login');

    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_login.php",
            data: {email: email, password: pass, connectionType: connectionType, rememberMe: rememberMe},
            success: function(response){
                if(response.length > 0){
                    if(response === 'ok'){
                        window.location.href = './dashboard';
                    }
                    else{
                        loginError.text(response);
                    }
                }
                else{
                    loginError.text('Une erreur s\'est produite');
                }
            },
            error: function(){
            }
        });
    }, 500);
}

// Requête d'inscription
function ajax_requestRegister(email, pass, confPass, prenom = '', nom = ''){ // champs facultatifs nom et prenom

    const registerError = $('#error-register');

    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_inscription.php",
            data: {email: email, password: pass, passwordConf: confPass, prenom: prenom, nom: nom},
            success: function(response){
                if(response.length > 0){
                    if(response === 'ok'){
                        showModal('login', email);
                    }
                    else{
                        registerError.text(response);
                    }
                }
                else{
                    registerError.text('Une erreur s\'est produite');
                }
            },
            error: function(){
            }
        });
    }, 200);
}

function add_form_event(modalName){
    //connexion
    if(modalName === 'login'){
        const form = $('#login-form');

        form.on( "submit", function(e) {
            e.preventDefault();

            const loginError = $('#error-login');
            const login = $('#user-id');
            const pwd = $('#user-pwd');
            const email = login.val();
            const pass = pwd.val();
            pwd.val('');
            if(email.length <= 0) {
                loginError.text('Veuillez renseigner une adresse mail');
            }
            else if(pass.length <= 0) {
                loginError.text('Veuillez renseigner un mot de passe');
            }
            else {
                ajax_requestLogin(email, pass);
            }
        });
    }

    // inscription
    else if(modalName === 'register'){

        const registerError = $('#error-register');
        const formRegister = $('#register-form');

        formRegister.on( "submit", function(e) {
            e.preventDefault();

            const input_email = $('#email');
            const input_pwd = $('#pwd');
            const input_nom = $('#last-name');
            const input_prenom = $('#first-name');
            const input_pwdconf = $('#pwd-confirm');
            const email = input_email.val();
            const nom = input_nom.val();
            const prenom = input_prenom.val();
            const pass = input_pwd.val();
            const pass_conf = input_pwdconf.val();

            input_pwd.val('');
            input_pwdconf.val('');

            if(email.length <= 0) {
                registerError.text('Veuillez renseigner une adresse mail');
            }
            else if(pass.length <= 0) {
                registerError.text('Veuillez renseigner un mot de passe');
            }
            else if(pass !== pass_conf) {
                registerError.text('Veuillez renseigner des mots de passe identiques');
            }
            else {
                ajax_requestRegister(email, pass, pass_conf, prenom, nom);
            }
        });
    }
}

$( document ).ready(function() {

    setTimeout(function(){
        hideLoading();
    }, 500);
});


//Change content on media query
const smallDevice = window.matchMedia("(max-width: 480px)");
const connection = document.getElementById('btn-connection');
smallDevice.addEventListener('change', changeContent);
function changeContent(e) {
    // Check if the media query is true
    if (e.matches) {
        const i = document.createElement('i');
        i.classList.add('fas');
        i.classList.add('fa-sign-in-alt');
        connection.innerText = '';
        connection.appendChild(i);
    } else {
        connection.innerText = '';
        connection.innerText = 'Connexion';
    }
}
// Run it at the init
changeContent(smallDevice);