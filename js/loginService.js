document.getElementById("formLogin").addEventListener('submit', function(e){e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let message= ' '
    let alertType=''



})

function login (email,password){
    fetch("htpps://reqres.in/api/login",{
    method:"POST",
    headers:{
        "content-type": "application/json"
    },
    body:JSON.stringify({email,password})
    })
     .then((data)=>{
        alertType = 'success'
        message='Inicio de Sesion correcto';
        
        console.log('responde bien')
     })
     .catch((error)=>{
        alertType = 'danger'
        message='correo o contraseña incorrecto';
        console.error(error)
     })

     let alert = `
     <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
    document.getElementById('alert').innerHTML=alert;
}