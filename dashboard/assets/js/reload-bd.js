function reloadBd() {
    const request = new XMLHttpRequest();
    request.open('POST', 'inc/ajax.php', true);

    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log('succeed');
        }
    };

    request.onerror = function() {
        console.log('something went wrong');
    };

    request.send();
}

export {reloadBd};