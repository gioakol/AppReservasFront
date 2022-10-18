init = () => {
    fncGet();
}

fncGet = () => {
    let dataCols = {
        "colsBD": ['id usuario', 'Email','Nombre', 'Edad', 'EsAdmin'],
        "omitir": [2],
        "colsCount": 3,
        "buttons": {
            "button1": {
                "buttonName": 'Editar',
                "buttonStyle": 'btn btn-light',
                "buttonType": 'REDIRECT',
                "buttonAction": `/areas/html/client/manage.html?id=${idusuario}&admin=${esAdmin}&idRegistro=`
            },
            "button2": {
                "buttonName": 'Eliminar',
                "buttonStyle": 'btn btn-danger',
                "buttonType": 'ACTION',
                "buttonAction": 'fncDelete'
            }
        }
    };    
    let dataRows = fncApiCallExtGet('Client/all');
    let resStr = fncFillTable(dataCols, dataRows);
    var table = document.getElementById('tableJS');
    table.innerHTML = resStr;
}

fncDelete = (idClient) => {
    if (confirm('¿Desea eliminar el registro de la base de datos?')) {
        let res = fncApiCallExtDelete('Client/'+ idClient);
        if(res.json == true) {
            alert('Información eliminada con exito!');
            fncGet();
        }
        else {
            alert('Error actualizado la información!');
        }
    } else {
        alert('Operación cancelada!');
    }
}
