init = () => {
    fncGet();
}

fncGet = () => {
    let dataRows = fncApiCallExtGet('Reservation/all');    
    let resStr = fncFillTableReserva(dataRows);
    var table = document.getElementById('tableJS');
    table.innerHTML = resStr;
}
