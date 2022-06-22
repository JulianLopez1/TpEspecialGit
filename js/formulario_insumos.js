document.getElementById('agrega').addEventListener('click', agregarProducto);
document.getElementById('triplica').addEventListener('click', agregar3);
let fila_numero = 0;
const url = 'https://6195bfdf74c1bd00176c6e63.mockapi.io/productos/';
let botonBuscar = document.getElementById("buscar").addEventListener("click", filtrar);

// esta funcion agrega un producto al servicio
async function agregarProducto() {
    let nombre = document.querySelector('#nombre').value;
    let proveedor = document.querySelector('#proveedor').value;
    let stock = document.querySelector('#cantidad').value;
    let precio = document.querySelector('#precio_unitario').value;
    let item = {
        "nombre": nombre,
        "proveedor": proveedor,
        "stock": stock,
        "precio": precio,
    }
    try {
        let res = await fetch(url, {
            "method": "POST",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(item)
        });

        if (res.status == 201)
            console.log("Agregado con éxito");
        refrescar();
    } catch (error) {
        console.log(error + "error al agregar");
    }
}

// esta funcion edita la fila elegida
function editar() { 
    let fila = this.getAttribute("name");
    let idModificar = this.getAttribute("editid");
    let tabla = document.getElementById("tabla_insumos");
    document.getElementById("nombre").value = tabla.rows[fila].cells[0].textContent;
    document.getElementById("proveedor").value = tabla.rows[fila].cells[1].textContent;
    document.getElementById("cantidad").value = parseInt(tabla.rows[fila].cells[2].textContent, 10);
    document.getElementById("precio_unitario").value = parseInt(tabla.rows[fila].cells[3].textContent, 10);
    tabla.rows[fila].cells[4].innerHTML = `
     <td>
     <button type="button" idMod="${idModificar}" class="modificar"> Modificar </button>  
     <button type="button" name="fila" class="cancelar"> Cancelar </button>
     </td>`
    let botonModificar = document.getElementsByClassName("modificar");
    console.log(botonModificar[0]);
    botonModificar[0].addEventListener('click', modificar);
    let botonCancelar = document.getElementsByClassName("cancelar");
    botonCancelar[0].addEventListener('click', cancelar);
}

// esta funcion cancela la edicion de datos y refresca
function cancelar() {
    refrescar();
}

// esta funcion agrega un producto x 3 al servicio
async function agregar3() {
    for (i = 0; i < 3; i++) {
        setTimeout(agregarProducto, 5000)
    }
}

// esta funcion llama al servicio y muestra todos los datos
async function refrescar() {
    try {
        let res = await fetch(url);

        if (res.status == 200) {
            console.log("Request con éxito");
            let json = await res.json();
            listar(json);
        }
    } catch (error) {
        console.log(error + "error al cargar los datos");
    }
}

// esta funcion agrega los datos a la tabla
function listar(elementos) {
    let tabla = document.getElementById("tabla_insumos");
    tabla_insumos.innerHTML = "";
    for (i = 0; i < elementos.length; i++) {
        tabla.innerHTML += `
       <tr>
          <td>${elementos[i].nombre}</td>
           <td>${elementos[i].proveedor}</td>
           <td>${elementos[i].stock}</td>
           <td>${elementos[i].precio}</td>
           <td>
               <button name="${i}" editid="${elementos[i].id}" class="editar"> Editar </button>  
               <button name="${elementos[i].id}" class="eliminar"> Eliminar </button>
           </td>
        </tr> `
    }
    crearEventosBotones();
}

// esta funcion crea los botones eliminar y editar
function crearEventosBotones() {
    let botonesEliminar = document.getElementsByClassName("eliminar");
    for (let index = 0; index < botonesEliminar.length; index++) {
        let boton = botonesEliminar[index];
        boton.addEventListener('click', eliminar);
    }

    let botonesEditar = document.getElementsByClassName("editar");
    for (let index = 0; index < botonesEditar.length; index++) {
        let boton = botonesEditar[index];
        boton.addEventListener('click', editar);
    }
}

// esta funcion elimina un registro y actualiza el servicio
async function eliminar() {
    let id = this.getAttribute('name');
    console.log(id);
    try {
        let res = await fetch(url + id, {
            "method": "DELETE",
            "headers": { "Content-type": "application/json" }
        });
        if (res.status == 200) {
            console.log("Borrado con éxito");
        }
        console.log(res.status)
        refrescar();
    } catch (error) {
        console.log(error);
    }
}

// esta funcion modifica un registro y actualiza
async function modificar() {
    let nombre = document.querySelector('#nombre').value;
    let proveedor = document.querySelector('#proveedor').value;
    let stock = document.querySelector('#cantidad').value;
    let precio = document.querySelector('#precio_unitario').value;
    let id = this.getAttribute('idMod');
    let item = {
        "nombre": nombre,
        "proveedor": proveedor,
        "stock": stock,
        "precio": precio,
    }
    try {
        let res = await fetch(url + id, {
            "method": "PUT",
            "headers": { "Content-type": "application/json" },
            "body": JSON.stringify(item)
        });
        if (res.status == 200) {
            console.log("Borrado con éxito");
        }
        console.log(res.status)
        refrescar();
    } catch (error) {
        console.log(error);
    }
    document.querySelector('#nombre').value = " ";
    document.querySelector('#proveedor').value = " ";
    document.querySelector('#cantidad').value = " ";
    document.querySelector('#precio_unitario').value = " ";
}

// esta funcion filtra los datos
async function filtrar() {
    try {
        let res = await fetch(url);
        if (res.status == 200) {
            console.log("Request con éxito");
            let json = await res.json();
            buscar(json);
        }
    } 
    catch (error) {
        console.log(error + "error al cargar los datos");
    }
}

// esta funcion busca registros en el servicio
async function buscar(elementos) {
    let j = 0;
    let busqueda = document.querySelector('#text_buscar').value;
    let tabla2 = document.getElementById("tabla_insumos");
    tabla2.innerHTML = "";
    for (i = 0; i < elementos.length; i++) {
        if (elementos[i].nombre.match(busqueda)) {
            tabla2.innerHTML += `     
                <tr>
                <td>${elementos[i].nombre}</td>
                <td>${elementos[i].proveedor}</td>
                <td>${elementos[i].stock}</td>
                <td>${elementos[i].precio}</td>
                <td>
                    <button name="${j}" editid="${elementos[i].id}" class="editar"> Editar </button>  
                    <button name="${elementos[i].id}" class="eliminar"> Eliminar </button>
                </td>
                </tr> `
            j++;
        }
    }
    crearEventosBotones();
    document.querySelector('#text_buscar').value = "";
}

refrescar();

