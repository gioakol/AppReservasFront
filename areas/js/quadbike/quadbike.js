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
    fncFillCategory();
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
fncFillCategory = () => {
    let dataRows = fncApiCallExtGet('Category/all');
    var input = document.getElementById('category');

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

/* Carga datos campos */

fncGetById = (id) =>{
    let res = fncApiCallExtGet('Quadbike/' + id);
    return res;
}

fncFillFields = (res) => {    
    let name = document.getElementById('name');  
    let description = document.getElementById('description');  
    let brand = document.getElementById('brand');  
    let year = document.getElementById('year');  
    let category = document.getElementById('category'); 
    
    name.value = res.name;
    description.value = res.description;
    brand.value = res.brand;
    year.value = res.year;
    category.selectedIndex = res.category.id;
}

/* Sección guardado / actualización */

fncManage = () => {
    let name = document.getElementById('name').value;  
    let description = document.getElementById('description').value;  
    let brand = document.getElementById('brand').value;  
    let year = parseInt(document.getElementById('year').value);  
    let category = parseInt(document.getElementById('category').value);  

    if(idRegistro != null) {
        fncUpdate(idRegistro, name, description, brand, year, category);
    }
    else {
        fncCreate(name, description, brand, year, category);
    }
}

fncCreate = (name, description, brand, year, category) => {
    let json = {
        name: name,
        description: description,
        brand: brand,
        year: year,
        category: {id: category}
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Quadbike/save', 'POST', dataJson);

    if (res.status == true) {
        alert('Infomación registrada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error registrando información!');
    }
}

fncUpdate = (id, name, description, brand, year, category) => {
    let json = {
        id: id,
        name: name,
        description: description,
        brand: brand,
        year: year,
        category: {id: category}
    }

    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Quadbike/update', 'PUT', dataJson);

    if (res.status == true) {
        alert('Información actualizada!');
        location.href = `index.html?id=${idusuario}&admin=${esAdmin}`;
    } else {            
        alert('Error actualizando información!');
    }
}
