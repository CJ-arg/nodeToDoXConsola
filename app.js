const { Switch } = require("react-router");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoBorrarTareas,
  confirmar,
  mostrarListadoCheck,
} = require("./helpers/inquirer");
const Tareas = require("./models/tareas");

require("colors");

const main = async () => {
  let opt = "";
  const tareas = new Tareas();
  const tareasDB = leerDB();
  if (tareasDB) {
    tareas.cargarTareaArray(tareasDB);
  }

  do {
    //imprime menu
    opt = await inquirerMenu();
    //hace un loop hasta que se sale con 0
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion: ");
        tareas.createTask(desc);
        break;
      case "2":
        console.log("\n");
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarTareasCompletadas(true);
        break;
      case "4":
        tareas.listarTareasCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoCheck(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;
      case "6":
        const id = await listadoBorrarTareas(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("Estas Seguro de borrar la Tarea?");
          ok
            ? tareas.borrarTarea(id)
            : console.log("No se ha borrado ninguna tarea.");
        }

        break;
      case "0":
        break;
    }
    guardarDB(tareas.listadoArr);
    opt !== "0" ? await pausa() : null;
  } while (opt !== "0");
  console.log("Hasta la vista.".bgRed);
};
main();
