const muestraDatos = (usuarios) => {
    let htmlTabla = ""
    for (let usuario of usuarios) {
        htmlTabla += `<tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.first_name}</td>
                        <td>${usuario.last_name}</td>
                        <td>${usuario.email}</td>
                        <td>
                            <img src="${usuario.avatar}">
                        </td>
                    </tr>`
    };
    document.getElementById('datos-usuario').innerHTML = htmlTabla;
}

let ultimoAcceso = localStorage.getItem('ultimoAcceso');

const btnGetUsers = document.getElementById("getUsers")
btnGetUsers.addEventListener('click', () => {

    const url = 'https://reqres.in/api/users?delay=3';
    if (Object.is(ultimoAcceso,null) || new Date().getTime() - ultimoAcceso > 60_000) {
        console.log("fetch a las "+ new Date());
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(usuarios => {
                localStorage.setItem("datosUsuarios", JSON.stringify(usuarios.data));
                localStorage.setItem("ultimoAcceso", (new Date().getTime()));
                ultimoAcceso = localStorage.getItem('ultimoAcceso');
                muestraDatos(usuarios.data);
            })
            .catch(error => console.log(error));
    }
    else {
        muestraDatos(JSON.parse(localStorage.getItem("datosUsuarios")));
        console.log("Datos locales a las "+ new Date());
    }

});

