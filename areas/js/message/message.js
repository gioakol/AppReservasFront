(function () { 
	'use strict'
	var forms = document.querySelectorAll('.needs-validation2');
	Array.prototype.slice.call(forms)
		.forEach(function (form) {
			form.addEventListener('submit', function (event) {
				event.preventDefault();
				event.stopPropagation();
				if (!form.checkValidity()) {
					form.classList.add('was-validated');
				} else {
					fncManageMessage();
				}
			}, false)
		})
})();

/* carga datos combos */

/* Carga datos campos */

/* Sección guardado / actualización */
fncManageMessage = () => {
    let messageText = document.getElementById('messageText').value;

    if(idusuario != null) {
        if(typeof(idRegistro) == 'undefined' || typeof(idRegistro) == 'object') {
            fncCreateMessage(messageText);
        }
        else {
            if(idRegistro != null && idRegistro != 0) {
                fncUpdateReservation(messageText);
            }
            else {                
                fncCreateMessage(messageText);
            }
        }
    }
    else {
        alert('Tu sesión ha caducado, por favor ingresa de nuevo!');
        fncLogout();  
    }
}

fncCreateMessage = (messageText) => {
    let json = {
        messageText: messageText,
        client: {idClient: idusuario}
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Message/save', 'POST', dataJson);

    if (res.status == true) {
        alert('Gracias por tu aporte!');
        $('#addMyModal').modal('toggle');
        document.getElementById("messageText").value = "";
    } else {            
        alert('Error registrando información!');
        document.getElementById("messageText").value = "";
    }
}

fncUpdateReservation = (messageText) => {
    let res = fncGetReservaById(idRegistro);

    if (res.status == true) {
        var rating = document.getElementsByName('rating');
        var resRating = null;
        if(rating != null) {
            for(i = 0; i < rating.length; i++) {
                if(rating[i].checked) {
                    resRating = rating[i].value;
                }
            }
        }
        var resUpd = fncUpdateScore(res.resultado.idReservation, res.resultado.startDate, res.resultado.devolutionDate, res.resultado.status, res.resultado.quadbike.id, resRating);
    
        if(resUpd == true) {
            let resUpdScore = fncCreateScore(messageText);
            if(resUpdScore == true) {
                alert('Gracias por tu aporte!');
                $('#addMyModal').modal('toggle');
                document.getElementById("messageText").value = "";
            }
            else {
                alert('Error registrando información!');
                document.getElementById("messageText").value = "";
            }
        }
        else {
            alert('Error registrando información!');            
        }
    }
    else {
        alert('Error registrando información!');
    }
}

fncGetReservaById = (id) =>{
    let res = fncApiCallExtGet('Reservation/' + id);
    return res;
}

fncCreateScore = (messageText) => {
    let json = {
        messageText: messageText,
        quadbike: { id: idRegistro },
        client: { idClient: idusuario },
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Message/save', 'POST', dataJson);

    if (res.status == true) {
        return true;
    } else {     
        return false;       
    }
}

fncUpdateScore = (id, startDate, devolutionDate, status, quadbike, score) => {
    let json = {
        idReservation: id,
        startDate: startDate,
        devolutionDate: devolutionDate,
        status: status,
        quadbike: { id: quadbike },
        client: { idClient: idusuario },
        score: score
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Reservation/update', 'PUT', dataJson);

    if (res.status == true) {
        return true;
    } else {            
        return false;
    }
}