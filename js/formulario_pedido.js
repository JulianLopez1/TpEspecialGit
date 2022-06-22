

let productos = document.getElementById("nivel");
productos.addEventListener("change", mostrarSabores);

//Este bloque muestra segun el producto que se elija, los sabores disponibles para el mismo.
function mostrarSabores() {
  if ((productos.value !== "cookies") || (productos.value !== "macarrones") || (productos.value !== "masassurtidas")) {
    document.getElementById("macarrones").classList.add("checkinvisible");
    document.getElementById("cookies").classList.add("checkinvisible");
    document.getElementById("masassurtidas").classList.add("checkinvisible");
  }
  if (productos.value === "cookies") {
    document.getElementById("cookies").classList.remove("checkinvisible");
  }
  if (productos.value === "macarrones") {
    document.getElementById("macarrones").classList.remove("checkinvisible");
  }
  if (productos.value === "masassurtidas") {
    document.getElementById("masassurtidas").classList.remove("checkinvisible");
  }
}

let boton_envio = document.getElementById("enviarpedido");
boton_envio.addEventListener("click", enviarpedido);

//El siguiente bloque verifica que se haya ingresado un nombre.
function validarNombre() {
  let nombre = document.getElementById("nombre").value;
  if (nombre != "") {
    return true;
  }
  return false;
}

//El siguiente bloque verifica que se haya ingresado un apellido.
function validarApellido() {
  let apellido = document.getElementById("apellido").value;
  if (apellido != "") {
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

//El siguiente bloque valida la seleccion de cookies y un sabor de los mismos.
function validarSaborCookies() {
  let productos = document.getElementById("nivel");
  i = 0;
  if (productos.value === "cookies") {
    let sabores = document.getElementsByName("variedadcookies");
    while (i < sabores.length) {
      if (sabores[i].checked == true) {
        return true;
      }
      i++;
    }
  }
  return false;
}

//El siguiente bloque verifica la seleccion de masas surtidas y un sabor de las mismas.
function validarSaborMasas() {
  let productos = document.getElementById("nivel");
  i = 0;
  if (productos.value === "masassurtidas") {
    let sabores = document.getElementsByName("variedadmasas");
    while (i < sabores.length) {
      if (sabores[i].checked == true) {
        return true;
      }
      i++;
    }
  }
  return false;
}

//El siguiente bloque verifica la seleccion de macarrones y un sabor de los mismos.
function validarSaborMacarrones() {
  let productos = document.getElementById("nivel");
  i = 0;
  if (productos.value === "macarrones") {
    let sabores = document.getElementsByName("variedadmacarrones");
    while (i < sabores.length) {
      if (sabores[i].checked == true) {
        return true;
      }
      i++;
    }
  }
  return false;
}

//El siguiente bloque verifica la seleccion de bombones especiales.
function validarBombonesEsp() {
  let productos = document.getElementById("nivel");
  if (productos.value === "bombonese") {
    return true;
  }
  return false;
}

//El siguiente bloque verifica la seleccion de bombones.
function validarBombones() {
  let productos = document.getElementById("nivel");
  if (productos.value === "bombonesc") {
    return true;
  }
  return false;
}

//El siguiente bloque verifica la seleccion de masas comunes.
function validarMasasComunes() {
  let productos = document.getElementById("nivel");
  if (productos.value === "masascomunes") {
    return true;
  }
  return false;
}

//El siguiente bloque valida que se haya seleccionado al menos un opcion del peso.
function validarPeso() {
  let un_kilo = document.getElementsByName("peso");
  for (i = 0; i < un_kilo.length; i++) {
    if (un_kilo[i].checked == true) {
      return true;
    }
  }
  return false;
}

//El siguiente bloque valida que se haya seleccionado al menos un producto y un sabor.
function validarEleccionSabor() {
  if (validarSaborCookies() || validarSaborMasas() || validarSaborMacarrones() || validarMasasComunes() || validarBombones() || validarBombonesEsp()) {
    return true;
  }
  return false;
}

//El siguiente bloque envia el formulario en caso de que se hayan ingresado todos los datos correctamente.
function enviarpedido() {
  let formulario = document.getElementById("pedido");
  let imagen_error = document.getElementById("error_img");
  let mensaje_error = document.getElementById("mensaje_error");
  if (validarNombre() && validarApellido() && validarMail() && validarPeso() && validarEleccionSabor()) {
    //imagen_error.classList.add("visible_error");
    formulario.submit();
  }
  else {
    imagen_error.classList.remove("visible_error");
    mensaje_error.classList.remove("visible_error");
  }
}
