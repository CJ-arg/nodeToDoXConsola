const Tarea = require("./tarea");

class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
    console.log("Tarea  borrada ");
  }
  cargarTareaArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }
  createTask(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
  listadoCompleto(tareas = []) {
    this.listadoArr.forEach((tarea, i) => {
      const idx = `${i + 1})*`.green;
      const { desc, completed } = tarea;
      const estado = completed ? "Completada".green : "Pendiente".red;
      console.log(`${idx}${desc.green} ${">>>".yellow} ${estado}`);
      // console.log("\n");
    });
  }

  listarTareasCompletadas(completedas = true) {
    let count = 0;
    this.listadoArr.forEach((tarea, i) => {
      const { desc, completed } = tarea;
      const estado = completed ? "Completada".green : "Pendiente".red;

      if (completedas) {
        if (completed) {
          count += 1;
          console.log(
            `${count + "*"}${desc.green} ${">>>".yellow} ${completed}`
          );
        }
      } else {
        if (!completed) {
          count += 1;
          console.log(`${count + "*"}${desc.green} ${">>>".yellow} ${estado}`);
        }
      }
    });
  }
  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completed) {
        tarea.completed = new Date().toISOString();
      }
    });
    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completed = null;
      }
    });
  }
}

module.exports = Tareas;
