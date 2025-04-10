document.getElementById("formLogin").addEventListener('submit', function(e){e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    let message= ' '
    let alertType=''


    if(email === "" || password=== ""){
       
        alertType= 'warning'
        message='ingrese los datos' ;

    }

    else if (email === 'prueba@gmail.com'&& password=== '123456'){
    alertType = 'success'
    message='Inicio de Sesion correcto';
    

    }
    else{
        alertType = 'danger'
        message='correo o contraseña incorrecto';
    }


    let alert = `
     <div class="alert alert-${alertType} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
  `;
    document.getElementById('alert').innerHTML=alert;





})