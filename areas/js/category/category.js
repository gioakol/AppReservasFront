var queryStr = window.location.search;
var urlPar = new URLSearchParams(queryStr);
var idRegistro = urlParams.get('idRegistro');

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
    if(idRegistro != null) {
        if(parseInt(idRegistro) != 0){
            let res = fncGetById(parseInt(idRegistro));
            if (res.status == true) {
                fncFillFields(res.resultado);
            }
            else {
                alert('Error cargando información!');
                location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
            }
        }
    }
}

/* carga datos combos */

/* Carga datos campos */
fncGetById = (id) =>{
    let res = fncApiCallExtGet('Category/' + id);
    return res;
}

fncFillFields = (res) => {    
    let name = document.getElementById('name');  
    let description = document.getElementById('description');  
    
    name.value = res.name;
    description.value = res.description;
}

/* Sección guardado / actualización */
fncManage = () => {
    let name = document.getElementById('name').value;  
    let description = document.getElementById('description').value;

    if(idRegistro != null) {
        fncUpdate(idRegistro, name, description);
    }
    else {
        fncCreate(name, description);
    }
}

fncCreate = (name, description) => {
    let json = {
        name: name,
        description: description
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Category/save', 'POST', dataJson);

    if (res.status == true) {
        alert('Infomación registrada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error registrando información!');
    }
}

fncUpdate = (id, name, description) => {
    let json = {
        id: id,
        name: name,
        description: description
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Category/update', 'PUT', dataJson);

    if (res.status == true) {
        alert('Información actualizada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error actualizando información!');
    }
}
