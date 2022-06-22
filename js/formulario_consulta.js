

let botonenvio=document.getElementById("boton_consulta");
let boton_valid_capt=document.getElementById("boton_captcha")
let label_confirmacion=document.getElementById("confirmacion");



let captcha_gen = document.getElementById("captcha");
let num_aleatorio = Math.floor((Math.random() * 10000) + 1);
captcha_gen.value = num_aleatorio;
captcha_gen.style.color="red";
captcha_gen.innerHTML = "Debe verificar el siguiente numero: "+captcha_gen.value;


let texto_ingresado = document.getElementById("texto_ing");


boton_valid_capt.addEventListener("click",enviarConsulta);



function validacionCaptcha() {
    let nombre_ing = (document.getElementById("nombre").value);
    let numero_ing = texto_ingresado.value;
    let mail_ing = (document.getElementById("mail").value);
    let num_captcha = captcha_gen.value;
    if (numero_ing == num_captcha) {
        return true;
    }
    else {
        return false;
    }
}

//El siguiente bloque verifica que se haya ingresado un nombre y apellido.
function validarNombre() {
    let nombre = document.getElementById("nombre").value;
    if (nombre != "") {
      return true;
    }
    return false;
}

//El siguiente bloque verifica que se haya ingresado un telefono.
function validarTelefono() {
    let telefono = document.getElementById("telefono").value;
    if (telefono != "") {
      return true;
    }
    return false;
}

//El siguiente bloque verifica que se haya ingresado un mail.
function validarMail() {
    let mail = document.getElementById("mail").value;
    if (mail != "") {
      return true;
    }
    return false;
}

//El siguiente bloque verifica que se haya ingresado un texto consulta.
function validarConsulta() {
    let consulta = document.getElementById("consulta").value;
    if (consulta != "") {
      return true;
    }
    return false;
}

//El siguiente bloque envia el formulario en caso de que se hayan ingresado todos los datos correctamente.
function enviarConsulta() {
  let formulario=document.getElementById("form_Contacto");

  if (validarNombre() && validarTelefono() && validarMail() && validarConsulta() &&validacionCaptcha()) {
    alert("la consulta se envio");
    formulario.submit();
  }
  else {
    alert("Por favor verifique los datos obligatorios")
  }
}

