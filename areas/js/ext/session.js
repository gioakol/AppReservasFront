var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var idusuario = urlParams.get('id');
var esAdmin = urlParams.get('admin');

if (idusuario != null && esAdmin != null){
    fncCreateMenu(idusuario, esAdmin);
    fncCreateFooter(idusuario, esAdmin);
    fncComentarios();
} 
else {
    alert('Tu sesión ha caducado, por favor ingresa de nuevo!');
    fncLogout();
}