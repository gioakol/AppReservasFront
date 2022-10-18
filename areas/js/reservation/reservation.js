var queryStr = window.location.search;
var urlPar = new URLSearchParams(queryStr);
var idRegistro = urlParams.get('idRegistro');
var calificaciones = document.getElementById('calificaciones');

(function () { 
	'use strict'
	var forms = document.querySelectorAll('.needs-validation');
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (!form.checkValidity()) {
					form.classList.add('was-validated');
				} else {
                    fncManage();
				}
			}, false)
		})
})();

init = () =>{
    fncFillCuatrimoto();
    fncFillStatus();
    if(idRegistro != null) {        
        if(parseInt(idRegistro) != 0){
            let res = fncGetReservaById(parseInt(idRegistro));
            if (res.status == true) {
                fncFillFields(res.resultado);
            }
            else {
                alert('Error cargando información!');
                location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
            }
        }
    }
    else {
        fncUsuarioById();
        calificaciones.classList.add("d-none");
        var input = document.getElementById('status');
        input.disabled = true;
        input.value = 'created';
    }
}

/* carga datos combos */
fncFillCuatrimoto = () => {
    let dataRows = fncApiCallExtGet('Quadbike/all');
    var input = document.getElementById('quadbike');

    var opt = document.createElement("option");
    opt.value = ''; 
    opt.text = ''; 
    input.appendChild(opt); 

    for (let i = 0; i < dataRows.resultado.length; i++) {
        var opt = document.createElement("option");
        opt.value = dataRows.resultado[i].id; 
        opt.text = dataRows.resultado[i].name;     
        input.appendChild(opt);    
    }
}

fncFillStatus = () => {
    var input = document.getElementById('status');

    var opt = document.createElement("option");
    opt.value = ''; 
    opt.text = ''; 
    input.appendChild(opt); 

    var opt0 = document.createElement("option");
    opt0.value = 'created'; 
    opt0.text = 'created'; 
    input.appendChild(opt0); 

    var opt0 = document.createElement("option");
    opt0.value = 'completed'; 
    opt0.text = 'completed'; 
    input.appendChild(opt0); 

    var opt1 = document.createElement("option");
    opt1.value = 'cancelled'; 
    opt1.text = 'cancelled'; 
    input.appendChild(opt1); 
    
    var opt2 = document.createElement("option");
    opt2.value = 'programmed'; 
    opt2.text = 'programmed'; 
    input.appendChild(opt2); 
}

/* Carga datos campos */
fncUsuarioById = () =>{
    let res = fncApiCallExtGet('Client/' + idusuario);
    if(res.status == true) {
        document.getElementById('infoUsuario').innerHTML = `${res.resultado.name} - ${res.resultado.email}`;
    }
}

fncGetReservaById = (id) =>{
    let res = fncApiCallExtGet('Reservation/' + id);
    return res;
}

fncFillFields = (res) => {    
    document.getElementById('infoUsuario').innerHTML = `${res.client.name} - ${res.client.email}`;
    let startDate = document.getElementById('startDate'); 
    let devolutionDate = document.getElementById('devolutionDate'); 
    let status = document.getElementById('status');  
    let quadbike = document.getElementById('quadbike');  
    
    startDate.value = res.startDate.split('T')[0].toString('dd/MM/yyyy');
    devolutionDate.value = res.devolutionDate.split('T')[0].toString('dd/MM/yyyy');
    status.value = res.status;
    quadbike.value = res.quadbike.id;

    if(idRegistro != null) {
        var option = `#opc_${res.score}`;
        $(option).prop("checked", true);
    }
}

/* Sección guardado / actualización */
fncManage = () => {
    let startDate = document.getElementById('startDate').value; 
    let devolutionDate = document.getElementById('devolutionDate').value; 
    let status = document.getElementById('status').value;  
    let quadbike = document.getElementById('quadbike').value;  

    if(idRegistro != null) {
        fncUpdate(idRegistro, startDate, devolutionDate, status, quadbike, null);
    }
    else {
        fncCreate(startDate, devolutionDate, status, quadbike);
    }
}

fncCreate = (startDate, devolutionDate, status, quadbike) => {
    let json = {
        startDate: startDate,
        devolutionDate: devolutionDate,
        status: status,
        quadbike: { id: quadbike },
        client: { idClient: idusuario }
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Reservation/save', 'POST', dataJson);

    if (res.status == true) {
        alert('Infomación registrada!');
        location.href = `/home.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error registrando información!');
    }
}

fncUpdate = (id, startDate, devolutionDate, status, quadbike) => {
    let json = {
        idReservation: id,
        startDate: startDate,
        devolutionDate: devolutionDate,
        status: status,
        quadbike: { id: quadbike },
        client: { idClient: idusuario }
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Reservation/update', 'PUT', dataJson);

    if (res.status == true) {
        alert('Información actualizada!');
        location.href = `/home.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error actualizando información!');
    }
}