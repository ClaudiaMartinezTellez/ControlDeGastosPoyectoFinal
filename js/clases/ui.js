import { eliminarGasto,gastosFiltrados, ui } from '../funciones.js';
const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')
//user interfas
class UI {
    //extrayendo los valores
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad;
        document.querySelector('#total').textContent = presupuesto
        //agregando al HTML
        document.querySelector('#restante').textContent = restante
        const Inicio = document.getElementById('Inicio');
        const Resumen = document.getElementById('Resumen');
        Inicio.style.display='none';
        Resumen.style.display='block';
    }
    imprimirAlerta(mensaje, tipo) {
        const divMensaje = document.createElement('div')
        divMensaje.classList.add('text-center', 'alert')
        //si es tipo error se agrega una clase
        if (tipo === 'error') { //va crear un contenedor
            divMensaje.classList.add('alert-danger') //le estamos añadiendo una clase ya predeterminada de alert-danger
        } else {
            divMensaje.classList.add('alert-success')
        }
        //mensaje de error
        divMensaje.textContent = mensaje;
        //insertar en el dom
        document.querySelector('.primario').insertBefore(divMensaje, formulario)//insertar antes de  y dentro del parentesis lo que quiero insertar
        setTimeout(() => {
            document.querySelector('.primario .alert').remove();
        }, 3000)
    }
    agregarGastoLista(gastos) {
        this.imprimeListaGastos(gastos)        
    }

    imprimeListaGastos(arreglo) {
        this.limpiarHTML()
        //iterar los gastos
        arreglo.forEach(gasto => {
            const { nombre, cantidad, categoria, id } = gasto;
            //crear un elemento li desde JS 
            const nuevoGasto = document.createElement('li')
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center'//damos estilo a nuestro elemento desde js
            //insertar nuestro gasto
            nuevoGasto.dataset.id = id;
            nuevoGasto.innerHTML = //agregamos desde js a HTML
                `${nombre}
               <span class='badge badge-primary badge-phill'>${cantidad}</span>${categoria}
                ` //estos estilos son de bootstrap
            //crear otro elemento un boton
            // nuevoGasto.innerHTML ='' //agregamos desde js a HTML
            const btnBorrar = document.createElement('button')
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto')
            btnBorrar.textContent = 'Borrar'//estamos agregando el texto
            btnBorrar.onclick = () => eliminarGasto(id)
            nuevoGasto.appendChild(btnBorrar)//estamos agregando el boton
            gastoListado.appendChild(nuevoGasto)//a la lista le estamos agregando el valor de cantidad,nombre ,id  , lo estamos insertando en el HTML

        });
    }
    actualizarRestante(presupuesto) {
        document.querySelector('span#restante').textContent = presupuesto.restante
        document.querySelector('#porcentajeGastado').textContent = 'Gastado '+presupuesto.porcentajeGastado +' %'
        document.getElementById('porcentajeGastado').style.width =presupuesto.porcentajeGastado+'%';
        document.getElementById("categorias").options.length = 0;
        const select = document.querySelector('#categorias');
        presupuesto.categorias.forEach((elem) => {
            select.add(new Option(elem, elem), null);
        })
        document.getElementById("filtro").onclick = () => gastosFiltrados();
        document.getElementById("divTotalFiltrado").style.display='none';
    }
    imprimeGastosFiltrados(presupuesto) {
        this.imprimeListaGastos(presupuesto.gastosFiltrados)        
        document.querySelector('span#totalFiltrado').textContent ='Total Filtrado: $'+ presupuesto.totalGastosFiltrados;
        document.getElementById("divTotalFiltrado").style.display='block';
    }
    comprobarPresupuesto(presupuestoObj) {
        const { presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante')//accedemos a la clase restante
        //comprobar que el presupuesto este en el 25%, sino manda una alerta
        if ((presupuesto * .25) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning')
            restanteDiv.classList.add('alert-danger');
            ui.imprimirAlerta('Presupuesto menor del 25%', 'error')

        } else if ((presupuesto * .50) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-danger')
            restanteDiv.classList.add('alert-warning');
            ui.imprimirAlerta('Presupuesto menor del 50%', 'error')

        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning')
            restanteDiv.classList.add('alert-success');
        }
        //si presupuesto es igual a cero
        if (restante <= 0) {
            ui.imprimirAlerta('Presupuesto agotado', 'error')
            formulario.querySelector('button[type="submit"]').disabled = true;
        }

    }
    limpiarHTML() { //mientras exista un primer nodo en el gasto listado eliminalo. 
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }
}
export default UI;