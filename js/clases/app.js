//instancias
import { preguntarPresupuesto,agregarGasto,eliminarGasto} from "../funciones.js"
const formulario = document.getElementById('agregar-gasto')
const gastoListado = document.querySelector('#gastos ul')

class App {
    constructor() {
        this.initApp();
    }

    //eventos
    initApp() {
        eventListeners()
        function eventListeners() {
            document.addEventListener('DOMContentLoaded', preguntarPresupuesto)
            formulario.addEventListener('submit', agregarGasto)
            gastoListado.addEventListener('click', eliminarGasto)
        }
    }
}
export default App;
