init = () => {
    fncGet();
}

fncGet = () => {
    let dataCols = {
        "colsBD": ['id Cuatrimoto', 'Nombre', 'Brand', 'Año', 'Descripción'],
        "omitir": [],
        "colsCount": 5,
        "buttons": {
            "button1": {
                "buttonName": 'Editar',
                "buttonStyle": 'btn btn-light',
                "buttonType": 'REDIRECT',
                "buttonAction": `/areas/html/quadbike/manage.html?id=${idusuario}&admin=${esAdmin}&idRegistro=`
            },
            "button2": {
                "buttonName": 'Eliminar',
                "buttonStyle": 'btn btn-danger',
                "buttonType": 'ACTION',
                "buttonAction": 'fncDelete'
            }
        }
    };    
    let dataRows = fncApiCallExtGet('Quadbike/all');
    let resStr = fncFillTable(dataCols, dataRows);
    var table = document.getElementById('tableJS');
    table.innerHTML = resStr;
}

fncDelete = (Id) => {
    if (confirm('¿Desea eliminar el registro de la base de datos?')) {
        let res = fncApiCallExtDelete('Quadbike/'+ Id);
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