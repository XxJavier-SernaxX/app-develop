document.getElementById("formLogin").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("Password1").value;
    
    login(email, password)
})
function login(email, password) {
    let message = ''
    let alerType = ''
    localStorage.removeItem('token')
    fetch("https://reqres.in/api/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json ",
            'x-api-key': 'reqres-free-v1'



        },
        body: JSON.stringify({ email, password })
    })
        .then((response) => {
            if(response.status === 200){
                alerType = 'success';
                message = 'Inicio de sesión exitosa';
                console.log('respode bien ' + response) 
                alertBuilder(alerType, message)
                response.json().then((data)=> {
                    localStorage.setItem('token', data.token)

                })
                
                setTimeout(() => {
                location.href ='admin/dashboard.html'
                }, 2000) // 2000 ms = 2 segundos 
            }
            else{
                alerType = 'danger';
                message = 'correo o contraseña incorrectos.';
                alertBuilder(alerType, message)

            }
        }
        )
        .catch((error) => {
           
            alerType = 'danger';
                message = 'Error inesperado';
                console.error(error)
                alertBuilder(alerType, message)
        })
    

}
function  alertBuilder(alerType, message){
    const alert = `
    <div class="alert alert-${alerType} alert-dismissible fade show" role="alert">
        ${message}
       <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
   </div>
    `;
    document.getElementById('alert').innerHTML = alert;
}