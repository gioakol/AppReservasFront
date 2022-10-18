init = () =>{

}

fncSave = (email, password, name, age, esAdmin) => {
    let json = {
        email: email,
        password: password,
        name: name,
        age: age,
        esAdmin: false
    }
    let dataJson = JSON.stringify(json);    
    let res = fncApiCallExt('Client/save', 'POST', dataJson);

    return res;
}