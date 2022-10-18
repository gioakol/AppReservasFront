var APIRest = 'http://localhost:8080/api/';

/* Metodos REST API GET */
fncApiCallExtGet = (url) => {
    let urlRest = APIRest + url;
    let res = $.ajax({
        url: urlRest,
        type: 'GET',
        dataType: 'json',
        async: false
    });
    let resObj = {
        "status": res.status == 200 ? true : false,
        "codeStatus": res.status,
        "resultado": res.responseJSON,
    };
    return resObj;
}

/* Metodos REST API PUT, POST, DELETE */
fncApiCallExt = (url, method, json) => {
    let urlRest = APIRest + url;
    let res = $.ajax({
        url: urlRest,
        type: method,
        dataType: 'json',
        data: json,
        contentType: 'application/json',
        async: false
    });
    let resObj;
    if (method == 'PUT') {
        resObj = {
            "status": res.status == 201 ? true : false,
            "codeStatus": res.status,
            "resultado": res.statusText,
        };
        return resObj;
    }
    if (method == 'POST') {
        resObj = {
            "status": res.status == 201 ? true : false,
            "codeStatus": res.status,
            "resultado": res.statusText,
            "json": res.responseJSON,
        };
        return resObj;
    }
}

fncApiCallExtGetExist = (url) => {
    let urlRest = APIRest + url;
    let res = $.ajax({
        url: urlRest,
        type: 'GET',
        dataType: 'json',
        async: false
    });
    let resObj = {
        "json": res.responseJSON,
    };
    return resObj;
}

fncApiCallExtDelete = (url) => {
    let urlRest = APIRest + url;
    let res = $.ajax({
        url: urlRest,
        type: 'DELETE',
        async: false
    });
    let resObj;
    resObj = {
        "json": res.responseJSON,
    };
    return resObj;
}

/* Metodos Llenar tablas dinamicamente */
fncFillTable = (dataCols, dataRows) => {
    let res = '';
    let rows = dataRows.resultado;
    let colsOmite = dataCols.omitir;
    let colsBD = dataCols.colsBD;
    let colsButton = dataCols.buttons;
    let colsCount = dataCols.colsCount;
    res += `<thead class="table-dark">`;
    res += `<tr>`;
    for (let i = 0; i < colsBD.length; i++) {
        res += `<th scope="col">${colsBD[i]}</th>`;
    }
    if (colsButton.button1 != null) {
        res += `<th scope="col">${colsButton.button1.buttonName}</th>`;
    }
    if (colsButton.button2 != null) {
        res += `<th scope="col">${colsButton.button2.buttonName}</th>`;
    }
    if (colsButton.button3 != null) {
        res += `<th scope="col">${colsButton.button3.buttonName}</th>`;
    }
    if (colsButton.button4 != null) {
        res += `<th scope="col">${colsButton.button4.buttonName}</th>`;
    }
    if (colsButton.button5 != null) {
        res += `<th scope="col">${colsButton.button5.buttonName}</th>`;
    }
    res += `</tr>`;
    res += `</thead>`;
    res += `<tbody>`;
    if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
            res += `<tr>`;
            for (let x = 0; x < Object.values(rows[i]).length; x++) {
                if (!colsOmite.includes(x)) {
                    if (typeof (Object.values(rows[i])[x]) != 'object') {
                        res += `<td>${Object.values(rows[i])[x]}</td>`;
                    }
                    else {
                        if (Object.values(rows[i])[x] == null) {
                            res += `<td></td>`;
                        }
                    }
                }
            }
            if (colsButton.button1 != null) {
                res += fncFillColumnButton(colsButton.button1.buttonName, colsButton.button1.buttonStyle, colsButton.button1.buttonType, colsButton.button1.buttonAction, Object.values(rows[i])[0]);
            }
            if (colsButton.button2 != null) {
                res += fncFillColumnButton(colsButton.button2.buttonName, colsButton.button2.buttonStyle, colsButton.button2.buttonType, colsButton.button2.buttonAction, Object.values(rows[i])[0]);
            }
            if (colsButton.button3 != null) {
                res += fncFillColumnButton(colsButton.button3.buttonName, colsButton.button3.buttonStyle, colsButton.button3.buttonType, colsButton.button3.buttonAction, Object.values(rows[i])[0]);
            }
            if (colsButton.button4 != null) {
                res += fncFillColumnButton(colsButton.button4.buttonName, colsButton.button4.buttonStyle, colsButton.button4.buttonType, colsButton.button4.buttonAction, Object.values(rows[i])[0]);
            }
            if (colsButton.button5 != null) {
                res += fncFillColumnButton(colsButton.button5.buttonName, colsButton.button5.buttonStyle, colsButton.button5.buttonType, colsButton.button5.buttonAction, Object.values(rows[i])[0]);
            }
            res += `</tr>`;
        }
    }
    else {
        res += `<tr>`;
        res += `<td colspan="${colsCount}">No se encontraron registros...</td>`;
        res += `</tr>`;
    }
    res += `</tbody>`;

    return res;
}

fncFillColumnButton = (buttonName, buttonStyle, buttonType, buttonAction, id) => {
    let str = '';
    if (buttonType == 'REDIRECT') {
        str = `<td><a href="${buttonAction}${id}" class="${buttonStyle}" role="button" aria-disabled="true">${buttonName}</a></td>`;
        return str;
    }
    if (buttonType == 'ACTION') {
        str = `<td><a onclick="${buttonAction}(${id})" class="${buttonStyle}" role="button" aria-disabled="true">${buttonName}</a></td>`;
        return str;
    }
}


fncFillTableReserva = (dataRows) => {
    let res = '';
    let rows = dataRows.resultado;
    res += `<thead class="table-dark">`;
    res += `<tr>`;
    res += `<th scope="col">Id Reserva</th>`;
    res += `<th scope="col">Fecha inicio</th>`;
    res += `<th scope="col">Fecha devolución</th>`;
    res += `<th scope="col">Estado</th>`;
    res += `<th scope="col">Editar</th>`;
    res += `</tr>`;
    res += `</thead>`;
    res += `<tbody>`;
    if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
            if(esAdmin == 'true') {
                res += `<tr>`;
                res += `<td>${rows[i].idReservation}</td>`;
                res += `<td>${rows[i].startDate.split('T')[0].toString('dd/MM/yyyy')}</td>`;
                res += `<td>${rows[i].devolutionDate.split('T')[0].toString('dd/MM/yyyy')}</td>`;
                res += `<td>${rows[i].status}</td>`;
                res += fncFillColumnButton('Editar', 'btn btn-light', 'REDIRECT', `/areas/html/reservation/manage.html?id=${idusuario}&admin=${esAdmin}&califica=true&idRegistro=`, rows[i].idReservation);
                res += `</tr>`;
            }
            else if (esAdmin == 'false' && idusuario == rows[i].client.idClient) {
                res += `<tr>`;
                res += `<td>${rows[i].idReservation}</td>`;
                res += `<td>${rows[i].startDate.split('T')[0].toString('dd/MM/yyyy')}</td>`;
                res += `<td>${rows[i].devolutionDat.split('T')[0].toString('dd/MM/yyyy')}</td>`;
                res += `<td>${rows[i].status}</td>`;
                res += fncFillColumnButton('Editar', 'btn btn-light', 'REDIRECT', `/areas/html/reservation/manage.html?id=${idusuario}&admin=${esAdmin}&califica=true&idRegistro=`, rows[i].idReservation);
                res += `</tr>`;
            }
            else {
                res += `<tr>`;
                res += `<td colspan="5">No se encontraron registros...</td>`;
                res += `</tr>`;
            }
        }
    }
    else {
        res += `<tr>`;
        res += `<td colspan="5">No se encontraron registros...</td>`;
        res += `</tr>`;
    }
    res += `</tbody>`;

    return res;
}

/* Metodos Llenar tabla mensajes dinamicamente */
fncFillCommentSection = (resRows) => {
    let res = '';
    let rows = resRows.resultado;

    if (rows.length > 0) {
        for (let i = 0; i < rows.length; i++) {
            let usuario = rows[i].client.esAdmin == true ? ' - (Admin)' : ' - (Cliente)' ;
            res += `<div class="card-body p-4">`;
            res += `    <div class="d-flex flex-start">`;
            res += `        <img class="rounded-circle shadow-1-strong me-3" src="/assets/img/users/${Math.floor(Math.random() * 25)}.png" alt="avatar" width="60" height="60" />`;
            res += `        <div>`;
            res += `        <h6 class="fw-bold mb-1">${rows[i].client.name} ${usuario}</h6>`;
            res += `        <div class="d-flex align-items-center mb-3">`;
            res += `            <p class="mb-0">`;
            res += `            ${rows[i].client.email}`;
            res += `            </p>`;
            res += `        </div>`;
            res += `        <p class="mb-0">`;
            res += `            ${rows[i].messageText}`;
            res += `        </p>`;
            res += `        </div>`;
            res += `    </div>`;
            res += `</div>`;
            res += `<hr class="my-0" style="height: 1px;" />`;
        }
    }
    else {
        res += `<div class="card-body p-4">`;
        res += `No hay comentarios registrados...`;
        res += `</div>`;
    }
    return res;
}

/* Acción login */
fncLogin = (idClient, esAdmin) => {
    location.href = `/home.html?id=${idClient}&admin=${esAdmin}`;
}

/* Acción logout */
fncLogout = () => {
    window.location.href = "/index.html"
}

/* Carga dinamica menú superior */
fncCreateMenu = (idClient, esAdmin) => {
    let res = '';
    if (esAdmin == 'false') {
        res += `<div class="container-fluid">`;
        res += `    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>`;
        res += `    <div class="collapse navbar-collapse" id="navbarSupportedContent">`;
        res += `        <ul class="navbar-nav me-auto mb-2 mb-lg-0">`;
        res += `            <li class="nav-item"><a class="nav-link active text-white" aria-current="page" onClick="fncLogin(${idClient}, ${esAdmin});">Inicio</a></li>`;
        res += `            <li class="nav-item"><a class="nav-link active text-white" aria-current="page" href="/areas/html/reservation/manage.html?id=${idClient}&admin=${esAdmin}&califica=true">Nueva reserva</a></li>`;
        res += `        </ul>`;
        res += `        <form class="d-flex">`;
        res += `            <a class="btn btn-outline-success btn-outline-light" onClick="fncLogout();"><i class="fa fa-sign-out-alt" aria-hidden="true"></i>&nbsp;Salir</a>`;
        res += `        </form>`;
        res += `    </div>`;
        res += `</div>`;
    }
    else {
        res += `<div class="container-fluid">`;
        res += `    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>`;
        res += `    <div class="collapse navbar-collapse" id="navbarSupportedContent">`;
        res += `        <ul class="navbar-nav me-auto mb-2 mb-lg-0">`;
        res += `            <li class="nav-item"><a class="nav-link active text-white" aria-current="page" onClick="fncLogin(${idClient}, ${esAdmin});">Inicio</a></li>`;
        res += `            <li class="nav-item"><a class="nav-link active text-white" aria-current="page" href="/areas/html/reservation/manage.html?id=${idClient}&admin=${esAdmin}&califica=true">Nueva reserva</a></li>`;
        res += `            <li class="nav-item dropdown">`;
        res += `                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorias</a>`;
        res += `                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">`;
        res += `                    <li><a class="dropdown-item " href="/areas/html/category/index.html?id=${idClient}&admin=${esAdmin}">Consultar</a></li>`;
        res += `                    <li><hr class="dropdown-divider"></li>`;
        res += `                    <li><a class="dropdown-item" href="/areas/html/category/manage.html?id=${idClient}&admin=${esAdmin}">Nuevo</a></li>`;
        res += `                </ul>`;
        res += `            </li>`;
        res += `            <li class="nav-item dropdown">`;
        res += `                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cuatrimotos</a>`;
        res += `                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">`;
        res += `                    <li><a class="dropdown-item " href="/areas/html/quadbike/index.html?id=${idClient}&admin=${esAdmin}">Consultar</a></li>`;
        res += `                    <li><hr class="dropdown-divider"></li>`;
        res += `                    <li><a class="dropdown-item" href="/areas/html/quadbike/manage.html?id=${idClient}&admin=${esAdmin}">Nuevo</a></li>`;
        res += `                </ul>`;
        res += `            </li>`;
        res += `            <li class="nav-item dropdown">`;
        res += `                <a class="nav-link dropdown-toggle text-white" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Usuarios</a>`;
        res += `                <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">`;
        res += `                    <li><a class="dropdown-item " href="/areas/html/client/index.html?id=${idClient}&admin=${esAdmin}">Consultar</a></li>`;
        res += `                    <li><hr class="dropdown-divider"></li>`;
        res += `                    <li><a class="dropdown-item" href="/areas/html/client/manage.html?id=${idClient}&admin=${esAdmin}">Nuevo</a></li>`;
        res += `                </ul>`;
        res += `            </li>`;
        res += `            <li class="nav-item"><a class="nav-link active text-white" aria-current="page" href="/areas/html/message/index.html?id=${idClient}&admin=${esAdmin}">Mensajes</a>`;
        res += `        </ul>`;
        res += `        <form class="d-flex">`;
        res += `            <a class="btn btn-outline-success btn-outline-light" onClick="fncLogout();"><i class="fa fa-sign-out-alt" aria-hidden="true"></i>&nbsp;Salir</a>`;
        res += `        </form>`;
        res += `    </div>`;
        res += `</div>`;
    }

    let nav = document.getElementById('navHeader');
    nav.innerHTML = res;
}

/* Carga dinamica footer */
fncCreateFooter = () => {
    let res = '';

    res += `<section class="d-flex justify-content-between p-4 text-white" style="background-color: #3c6d79">`;
    res += `    <div class="me-5">`;
    res += `        <span>Encuentra nuestro codigo en:</span>`;
    res += `    </div>`;
    res += `    <div>`;
    res += `        <a target="_blank" href="https://github.com/gioakol/AppReservas.git" class="text-white me-4">`;
    res += `            Back-End <i class="fab fa-github"></i>`;
    res += `        </a>`;
    res += `        <a target="_blank" href="https://github.com/gioakol/AppReservasFront.git" class="text-white me-4">`;
    res += `            Front-End <i class="fab fa-github"></i>`;
    res += `        </a>`;
    res += `    </div>`;
    res += `</section>`;
    res += `<section class="">`;
    res += `    <div class="container text-center text-md-start mt-5">`;
    res += `        <div class="row mt-3">`;
    res += `            <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">`;
    res += `                <h6 class="text-uppercase fw-bold">Universidad Sergio Arboleda</h6>`;
    res += `                <hr class="mb-4 mt-0 d-inline-block mx-auto"`;
    res += `                    style="width: 60px; background-color: #7c4dff; height: 2px" />`;
    res += `                <p>`;
    res += `                    Diplomado desarrollo de aplicaciones web y moviles.`;
    res += `                </p>`;
    res += `                <p>`;
    res += `                    Ciclo 3 - Grupo 4`;
    res += `                </p>`;
    res += `            </div>`;
    res += `            <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-4">`;
    res += `                <h6 class="text-uppercase fw-bold">Integrantes</h6>`;
    res += `                <hr class="mb-4 mt-0 d-inline-block mx-auto"`;
    res += `                    style="width: 60px; background-color: #7c4dff; height: 2px" />`;
    res += `                <p>`;
    res += `                    <a href="#!" class="text-dark">Giovanni Beltran Avila</a>`;
    res += `                </p>`;
    res += `                <p>`;
    res += `                    <a href="#!" class="text-dark">Efraín Lasso Ordóñez</a>`;
    res += `                </p>`;
    res += `                <p>`;
    res += `                    <a href="#!" class="text-dark">Jennifer Johana Escobar Vargas</a>`;
    res += `                </p>`;
    res += `            </div>`;
    res += `            <div class="col-md-4 col-lg-4 col-xl-4 mx-auto mb-md-0 mb-4">`;
    res += `                <h6 class="text-uppercase fw-bold">Contacto</h6>`;
    res += `                <hr class="mb-4 mt-0 d-inline-block mx-auto"`;
    res += `                    style="width: 60px; background-color: #7c4dff; height: 2px" />`;
    res += `                <p><i class="fas fa-envelope mr-3"></i> giovanni.beltran.mt@usa.edu.co</p>`;
    res += `                <p><i class="fas fa-envelope mr-3"></i> efrain.lasso.mt@usa.edu.co</p>`;
    res += `                <p><i class="fas fa-envelope mr-3"></i> jennifer.escobar.mt@usa.edu.co</p>`;
    res += `            </div>`;
    res += `        </div>`;
    res += `    </div>`;
    res += `</section>`;
    res += `<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">`;
    res += `    © Powered by Bootstrap v5.0.2.`;
    res += `</div>`;

    let footer = document.getElementById('footer');
    footer.innerHTML = res;
}

fncComentarios = () => {
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let tieneCalificacion = urlParams.get('califica');  
    let idRegistro = urlParams.get('idRegistro');       
    
    let res = '';

    res += `<div class="btn-messages">`;
    res += `	<button type="button" class="btn btn-messages-bg btn-btn-messages text-white" data-bs-toggle="modal" data-bs-target="#addMyModal"><i class="fa-solid fa-pen-to-square"></i> Escribir comentario</button>`;
    res += `</div>`;
    res += `<div class="modal fade" id="addMyModal" tabindex="-1" aria-labelledby="addMyModalLabel" aria-hidden="true">`;
    res += `    <div class="modal-dialog modal-dialog-centered" role="document">`;
    res += `    	<div class="modal-content">`;
    res += `    		<div class="text-right cross"><i class="fa fa-times mr-2" data-bs-dismiss="modal"></i></div>`;
    res += `			<form class="row g-3 needs-validation2" novalidate>`;
    res += `				<div class="card-body text-center">`;
    res += `					<img src="/assets/img/calificacion.png" height="100" width="100">`;
    res += `						<div class="comment-box text-center">`;
    res += `						<h4>Dejanos tus comentarios</h4>`;
    if(tieneCalificacion == 'true' && idRegistro != null) {
    res += `						<div class="rating">`; 
    res += `							<input type="radio" name="rating" value="5" id="5"><label for="5">☆</label>`;
    res += `							<input type="radio" name="rating" value="4" id="4"><label for="4">☆</label>`;
    res += `							<input type="radio" name="rating" value="3" id="3"><label for="3">☆</label>`;
    res += `							<input type="radio" name="rating" value="2" id="2"><label for="2">☆</label>`;
    res += `							<input type="radio" name="rating" value="1" id="1"><label for="1">☆</label>`; 
    res += `						</div>`;
    }
    res += `						<div class="comment-area">`; 
    res += `							<textarea class="form-control" id="messageText" placeholder="Escribe tu aporte..." rows="4"></textarea>`; 
    res += `						</div>`; 
    res += `						<div class="text-center mt-4">`; 
    res += `							<button class="btn btn-success send px-5">Enviar mensaje! <i class="fa fa-long-arrow-right ml-1"></i></button>`; 
    res += `						</div>`; 
    res += `					</div>`;
    res += `				</div>`;
    res += `			</form>`;
    res += `    	</div> `;
    res += `    </div>`;
    res += `</div>`;

    let comments = document.getElementById('comments');
    if(comments != null){
        comments.innerHTML = res;
    }
}