const { app, ipcMain, BrowserWindow } = require("electron");
const mysql = require("promise-mysql");

const {
  login,
  modificarUsuario,
  eliminarUsuario,
  registrarUsuario,
  getUsers,
  userForId,
} = require("./desktop/database/controllers/user_app.controler");

const {
  registrarCoop,
  eliminarCoop,
  modificarCoop,
  getCoops,
  coopForId,
  agregarUsuarioCoop,
} = require("./desktop/database/controllers/coop.controler");

const {
  obtenerTrabajadoresDeCoop,
  obtenerCoopsDeTrabajador,
  agregarCoopAUsuario,
} = require("./desktop/database/controllers/user_coop.controler");

let appWin;

// Configura las opciones de conexión a la base de datos MySQL
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dr_norbert",
};

createWindow = () => {
  appWin = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Angular and Electron",
    resizable: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
    },
  });

  appWin.loadURL(`file://${__dirname}/dist/elec/index.html`);

  // appWin.setMenu(null);

  appWin.webContents.openDevTools();

  appWin.on("closed", () => {
    appWin = null;
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.on("message", (event) => event.reply("reply", "pong"));

ipcMain.handle("get-coops", async (event, arg) => {
  const coops = await getCoops();
  return coops.coops;
});

ipcMain.handle("get-users", async (event, arg) => {
  const users = await getUsers();
  return users;
});
ipcMain.handle("update-users", async (event, id, name, nivel, contraseña) => {
  const user = await modificarUsuario(id, name, nivel, contraseña);
  console.log(user);
  return user;
});
ipcMain.handle("update-coop", async (event, id, name, menber_nr) => {
  const user = await modificarCoop(id, name, menber_nr);
  console.log(user);
  return user;
});

ipcMain.handle("coop-for-id", async (event, id) => {
  const coop = await coopForId(id);
  return coop;
});
ipcMain.handle("user-for-id", async (event, id) => {
  const user = await userForId(id);
  return user;
});
ipcMain.handle("users-for-coop", async (event, id) => {
  const users = await obtenerTrabajadoresDeCoop(id);
  return users;
});
ipcMain.handle("coops-for-user", async (event, id) => {
  const coops = await obtenerCoopsDeTrabajador(id);
  return coops;
});
ipcMain.handle("registrar-coop", async (event, name, menber_nr) => {
  const resultado = await registrarCoop(name, menber_nr);
  console.log(menber_nr);
  return resultado;
});
ipcMain.handle(
  "registrar-user",
  async (event, nombre, username, nivel, contraseña) => {
    const resultado = await registrarUsuario(
      nombre,
      username,
      nivel,
      contraseña
    );
    return resultado;
  }
);
ipcMain.handle("add-user-coop", async (event, id_user, id_coop) => {
  const resultado = await agregarUsuarioCoop(id_user, id_coop);
  return resultado;
});
async function connectToDB() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log("Connected to database!");

    // Perform database operations here

    connection.end(); // Close the connection when finished
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
  }
}

connectToDB();

// getCoops()
//   .then((result) => {
//     if (result.success) {
//       console.log(result.coops);
//     } else {
//       console.log(result.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// getUsers()
//   .then((result) => {
//     if (result.success) {
//       console.log(result.usuarios);
//     } else {
//       console.log(result.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// obtenerCoopsDeTrabajador(2)
//   .then((result) => {
//     if (result.success) {
//       console.log(result.coops);
//     } else {
//       console.log(result.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// obtenerTrabajadoresDeCoop(20)
//   .then((result) => {
//     if (result.success) {
//       console.log(result.users);
//     } else {
//       console.log(result.message);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// Registrar un coop
// registrarCoop("Mejor", 12)
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Coop registrado exitosamente:", resultado.coop);
//     } else {
//       console.log("Error al registrar la coop:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentar registrar la coop:", error.message);
//   });
// eliminar una coop
// eliminarCoop(21)
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Coop eliminada exitosamente");
//     } else {
//       console.log("Error al eliminar la tabla:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentareliminar el usuario:", error.message);
//   });

// Modificar
// modificarCoop(22, "Test", 1)
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Coop modificado exitosamente:", resultado.coop);
//     } else {
//       console.log("Error al modificar la Coop:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentar modificar el Coop:", error.message);
//   });
// Loguear usuario
// login("TES01", "Prueba")
//   .then((resultado) => {
//     if (resultado) {
//       console.log("Inicio de sesion exitoso");
//     } else {
//       console.log("Credenciales de inicio de sesion incorrectas");
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentar iniciar sesion: ", error.message);
//   });
// Modificar usuario
// modificarUsuario(21, "Bien", 1, "Prueba")
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Usuario modificado exitosamente:", resultado.usuario);
//     } else {
//       console.log("Error al modificar el usuario:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentar modificar el usuario:", error.message);
//   });

// Registrar un usuario
// registrarUsuario("Nuevo usuario", "nuevo_usuario", 1, "nueva_contraseña")
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Usuario registrado exitosamente:", resultado.usuario);
//     } else {
//       console.log("Error al registrar el usuario:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentar registrar el usuario:", error.message);
//   });

// Eliminar un usuario
// eliminarUsuario(23)
//   .then((resultado) => {
//     if (resultado.success) {
//       console.log("Usuario eliminado exitosamente");
//     } else {
//       console.log("Error al eliminar el usuario:", resultado.message);
//     }
//   })
//   .catch((error) => {
//     console.log("Error al intentareliminar el usuario:", error.message);
//   });
