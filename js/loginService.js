document.getElementById("formLogin").addEventListener('submit' , function(e){
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
   login(email, password)
})

function login(email, password){
     let message = ""
     let alerType = ""
    fetch("https://reqres.in/api/login",{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify({email, password})
    })

    .then((response) => {
        if(response.status === 200){
            alerType = "success"
            message = 'Incio de secion exitosa'
            console.log("Responde bien"+ response)
            alertbuilder(alerType,message)
            setTimeout(() => {
                location.href = "admin/dashboard.html"
            location.href= 'admin/dashboard.html'
            },2000)//2000

        }else{
             alerType = "danger"
             message = "correo o contraseña incorrecta"
             alertbuilder(alerType,message)

        }
       
    })
    .catch((error) => {
        console.error(error)
    })
}
   

    function alertbuilder(alerType, message){
        let alert = `
    <div class="alert alert-${alerType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> 
    `;
    document.getElementById("alert").innerHTML = alert
}