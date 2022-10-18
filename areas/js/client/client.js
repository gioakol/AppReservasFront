var queryStr = window.location.search;
var urlPar = new URLSearchParams(queryStr);
var idRegistro = urlPar.get('idRegistro');

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
    let res = fncApiCallExtGet('Client/' + id);
    return res;
}

fncFillFields = (res) => {    
    let name = document.getElementById('name');  
    let email = document.getElementById('email');  
    let age = document.getElementById('age');  
    let password = document.getElementById('password');  
    
    name.value = res.name;
    email.value = res.email;
    age.value = res.age;
    password.value = res.password;
}

/* Sección guardado / actualización */
fncManage = () => {
    let name = document.getElementById('name').value;  
    let email = document.getElementById('email').value;  
    let age = parseInt(document.getElementById('age').value);  
    let password = document.getElementById('password').value;  

    if(idRegistro != null) {
        fncUpdate(idRegistro, name, email, age, password);
    }
    else {
        fncCreate(name, email, age, password);
    }
}

fncCreate = (name, email, age, password) => {
    let json = {
        name: name,
        email: email,
        age: age,
        password: password,
        esAdmin: true
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Client/save', 'POST', dataJson);

    if (res.status == true) {
        alert('Infomación registrada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error registrando información!');
    }
}

fncUpdate = (id, name, email, age, password) => {
    let json = {
        idClient: id,
        name: name,
        email: email,
        age: age,
        password: password,
        esAdmin: true
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Client/update', 'PUT', dataJson);

    if (res.status == true) {
        alert('Información actualizada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error actualizando información!');
    }
}

/* validaciones login */
fncValidateIfExist = (email) => {
    let res = fncApiCallExtGetExist('Client/email/' + email);
    return res.json;
}

fncGetByUserAndPassword = (email, password) => {
    let res = fncApiCallExtGet('Client/user/' + email + '/' + password);
    return res.resultado;
}

fncGetById = (id) =>{
    let res = fncApiCallExtGet('Client/' + id);
    return res;
}