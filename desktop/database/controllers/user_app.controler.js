const mysql = require("promise-mysql");
const { getdbConfig } = require("../config.js");

const dbConfig = getdbConfig();

async function getUsers() {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener todoslos usuarios de la tabla
    const users = await pool.query("SELECT * FROM user_app");

    // Cerrar la conexión
    pool.end();

    // Devolver los usuarios
    return { success: true, users };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener los usuarios",
    };
  }
}

async function login(username, password) {
  try {
    //comprobar si el usuario existe en la base de datos
    const pool = await mysql.createPool(dbConfig);
    const usuario = await pool.query(
      "SELECT * FROM user_app WHERE username=?",
      [username]
    );
    if (usuario.length === 0) {
      return false; //usuario no encontrado
    }

    //comprobar si la contraseña es correcta
    if (usuario[0].password !== password) {
      return false; //contraseña incorrecta
    }

    return true; //login exitoso
  } catch (error) {
    console.log(error);
    return false; //error en la consulta o conexión a la base de datos
  }
}

async function modificarUsuario(id, nombre, nivel, contraseña) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si el usuario existe
    const usuario = await pool.query("SELECT * FROM user_app WHERE id = ?", [
      id,
    ]);

    if (usuario.length === 0) {
      return { success: false, message: "El usuario no existe" };
    }

    // Actualizar los campos necesarios
    await pool.query(
      "UPDATE user_app SET name = ?, level = ?, password = ? WHERE id = ?",
      [nombre, nivel, contraseña, id]
    );

    // Obtener los datos actualizados del usuario
    const usuarioActualizado = await pool.query(
      "SELECT * FROM user_app WHERE id = ?",
      [id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver los datos del usuario actualizado
    return { success: true, usuario: usuarioActualizado[0] };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar modificar el usuario",
    };
  }
}
async function registrarUsuario(nombre, username, nivel, contraseña) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si el usuario ya existe
    const usuarioExistente = await pool.query(
      "SELECT * FROM user_app WHERE username = ?",
      [username]
    );

    if (usuarioExistente.length > 0) {
      return { success: false, message: "El nombre de usuario ya está en uso" };
    }

    // Insertar el nuevo usuario en la tabla
    const resultado = await pool.query(
      "INSERT INTO user_app (name, username, level, password) VALUES (?, ?, ?, ?)",
      [nombre, username, nivel, contraseña]
    );

    // Obtener los datos del nuevo usuario
    const usuarioNuevo = await pool.query(
      "SELECT * FROM user_app WHERE id = ?",
      [resultado.insertId]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver los datos del nuevo usuario
    return { success: true, user: usuarioNuevo[0] };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al intentar agregar el usuario" };
  }
}

async function eliminarUsuario(id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si el usuario existe
    const usuario = await pool.query("SELECT * FROM user_app WHERE id = ?", [
      id,
    ]);

    if (usuario.length === 0) {
      return { success: false, message: "El usuario no existe" };
    }

    // Eliminar el usuario de la tabla
    await pool.query("DELETE FROM user_app WHERE id = ?", [id]);

    // Cerrar la conexión
    pool.end();

    // Devolver un objeto con éxito
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al intentar eliminar el usuario" };
  }
}
async function userForId(id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener el usuario con el ID correspondiente
    const user = await pool.query("SELECT * FROM user_app WHERE id = ?", [id]);

    // Cerrar la conexión
    pool.end();

    // Devolver el usuario correspondiente
    return { success: true, user: user[0] };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener el usuario",
    };
  }
}
async function buscarUsers(termino) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Buscar los usuarios que contengan el término especificado en el nombre o en el nombre de usuario
    const users = await pool.query(
      "SELECT * FROM user_app WHERE name LIKE ? OR username LIKE ?",
      [`%${termino}%`, `%${termino}%`]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver los usuarios encontrados
    return { success: true, users };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar buscar los usuarios",
    };
  }
}

module.exports = {
  login,
  modificarUsuario,
  eliminarUsuario,
  registrarUsuario,
  getUsers,
  userForId,
  buscarUsers,
};
