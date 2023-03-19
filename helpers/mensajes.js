require("colors");

const mostrarMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("================================================".bgBlue);
    console.log("================================================".green);
    console.log("---------SELECCIONE UNA OPCION------------------".red);
    console.log("================================================".blue);
    console.log("================================================\n".bgGreen);
    console.log(`${"1*".green} ${"Crear Tareas".green}`);
    console.log(`${"2*".green} ${"Listar Tareas".green}`);
    console.log(`${"3*".green} ${"Listar Tareas Completadas".green}`);
    console.log(`${"4*".green} ${"Listar Tareas Pendientes".green}`);
    console.log(`${"5*".green} ${"completar Tarea(s)".green}`);
    console.log(`${"6*".green} ${"Borrar Tareas".red}`);
    console.log(`${"0*".green} ${"SALIR/n".cyan}`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readLine.question("seleccione una opcion: ", (opt) => {
      readLine.close();
      resolve(opt);
    });
  });
};
const pausa = () => {
  return /** @type {Promise<void>} */ (
    new Promise((resolve, reject) => {
      const readLine = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      readLine.question(
        `\nPRESIONE  ${"ENTER PARA CONTINUAR".green}\n`,
        (opt) => {
          readLine.close();
          resolve();
        }
      );
    })
  );
};

module.exports = {
  mostrarMenu,
  pausa,
};
