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
					fncValidateLogin();
				}
			}, false)
		})
})();

fncValidateLogin = () => {
    let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;      

	let res = fncGetByUserAndPassword(email, password);

	if(res.length != 0) {
		fncLogin(res[0].idClient, res[0].esAdmin);
	}
	else {
		alert('Usuario y/o contraseña incorrectos!');
	}
}

