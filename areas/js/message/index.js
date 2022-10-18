function init() {
    fncGet();
}

function fncGet() {
    let res = fncApiCallExtGet('Message/all');
    let resStr = fncFillCommentSection(res);
    var table = document.getElementById('dvComentarios');
    table.innerHTML = resStr;
}
