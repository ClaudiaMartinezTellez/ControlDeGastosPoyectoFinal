//clases
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto)
        this.restante = Number(presupuesto)
        this.gastos = []
        this.categorias=[]
        this.gastosFiltrados=[]
        this.totalGastosFiltrados=Number(0)
        this.porcentajeGastado=Number(0)
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto]
        this.calcularRestante()
    }

    borrarGasto(id) {
        this.gastos = this.gastos.filter(gasto => gasto.id !== id);//tal vez se necesite cambiar a 
        this.calcularRestante()
    }
    filtrarGastos(categoria){
        this.gastosFiltrados=this.gastos.filter(elem=>elem.categoria===categoria)
        this.totalGastosFiltrados = this.gastosFiltrados.reduce((total, gasto) => total + gasto.cantidad, 0)
    }
    //reduce
    calcularRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + gasto.cantidad, 0)
        this.restante = this.presupuesto - gastado
        this.porcentajeGastado= (gastado / this.presupuesto) * 100;
        this.categorias=[...new Set(this.gastos.map(elem =>elem.categoria))] 
    }
}
export default Presupuesto;