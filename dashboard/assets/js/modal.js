
//Show logout

function showLogout(){
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.id = 'modal-logout';
    const content = document.createElement('div');
    content.classList.add('modal-content');
    const closeModal = document.createElement('div');
    closeModal.classList.add('absolute-modal');
    const iClose = document.createElement('i');
    iClose.id = 'close';
    iClose.classList.add('far');
    iClose.classList.add('fa-times-circle');
    closeModal.appendChild(iClose);

    let html = `
        <p id="text-logout">Voulez-vous vous déconnecter ?</p>
        <a id="y" href="logout.php">Oui</a>
        <p id="n">Non</p>
    `;
    content.innerHTML = html;
    modal.appendChild(content);
    content.appendChild(closeModal);
    document.body.insertAdjacentElement("beforeend", modal);

    const n = document.getElementById('n');
    n.addEventListener('click', ()=>{
        modal.remove();
    })
    closeModal.addEventListener('click', ()=>{
        modal.remove();
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.remove();
        }
    })
};

export {showLogout};