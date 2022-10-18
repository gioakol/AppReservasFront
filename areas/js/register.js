var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var registroAdmin = urlParams.get('Admin');

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
					fncRegister();
				}
			}, false)
		})
})();

fncRegister = () => {
    let email = document.getElementById('email').value;
    let res = fncValidateIfExist(email);

    if(res == true) {
        alert('Ya existe un usuario con el mismo correo electrónico!');
    }
    else {
        let name = document.getElementById('name').value; 
        let age = document.getElementById('age').value;  
        let password = document.getElementById('password').value;  
        let administrador = true;  
        if(registroAdmin != null) {
            if(registroAdmin == 'false'){
                administrador == false;
            }
        }
        let resSave = fncSave (email, password, name, age, administrador);
        if (resSave.status == true) {
            alert('Usuario registrado!');
            fncLogin(resSave.json.idClient, administrador);
        } else {            
            alert('Error registrando usuario!');
        }
    }    
}
