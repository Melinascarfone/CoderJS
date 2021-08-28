let campoMail = document.getElementById("mail");
campoMail.onchange = () => { 
    console.log("Se ingreso un mail"); 
}
let campoMensaje = document.getElementById("mensaje");
campoMensaje.onchange = () => { 
    console.log("Se ingreso un nuevo mensaje"); 
}
campoMail.onfocus = () => { 
    campoMail.style = "background-color: #FFECD8;"
}
campoMensaje.onfocus = () => { 
    campoMensaje.style = "background-color: #FFECD8;"
}

let miFormulario = document.getElementById("formUno");
miFormulario.addEventListener("submit", validarFormUno);

function validarFormUno(e) {
    e.preventDefault();
}

let boton1 = document.getElementById("boton1");

let titulo = document.getElementById("tit");

boton1.onclick = () => { 
    titulo.innerHTML= "Gracias por contactarnos!"
}

const info =[{ mail:"libreriablic@gmail.com", wpp:"11576647001", ig:"@libreriablic"}];

for (const datos of info){
    $("#info").append(`<form id="formUno">
                       <p> Mail: ${datos.mail}</p>
                       <p> WhatsApp: ${datos.wpp}</p>
                       <p> Instagram: ${datos.ig}</p>
                       </form>`)
}


