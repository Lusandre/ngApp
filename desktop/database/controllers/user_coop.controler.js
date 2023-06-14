const mysql = require("promise-mysql");
const { getdbConfig } = require("../config.js");

const dbConfig = getdbConfig();

async function obtenerTrabajadoresDeCoop(coop_id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener todoslos trabajadores de la cooperativa especificada
    const users = await pool.query(
      "SELECT user_app.* FROM user_app JOIN user_coop ON user_app.id = user_coop.user_id WHERE user_coop.coop_id = ?",
      [coop_id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver los trabajadores de la cooperativa
    return { success: true, users };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener los trabajadores de la cooperativa",
    };
  }
}

async function obtenerCoopsDeTrabajador(user_id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener todas las cooperativas deltrabajador especificado
    const coops = await pool.query(
      "SELECT coop.* FROM coop JOIN user_coop ON coop.id = user_coop.coop_id WHERE user_coop.user_id = ?",
      [user_id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver las cooperativas del trabajador
    return { success: true, coops };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener las cooperativas del trabajador",
    };
  }
}

async function agregarCoopAUsuario(user_id, coop_id) {
  try {
    const pool = await mysql.createPool(dbConfig);
    // Insertar una nueva fila en la tabla user_coop con el user_id y coop_id especificados
    const result = await pool.query(
      "INSERT INTO user_coop (user_id, coop_id) VALUES (?, ?)",
      [user_id, coop_id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver un objeto indicando que la operación se realizó con éxito
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar agregar la cooperativa al usuario",
    };
  }
}

async function agregarUsuarioCoop(user_id, coop_id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si el usuario y la cooperativa ya están relacionados en la tabla user_coop
    const result = await pool.query(
      "SELECT * FROM user_coop WHERE user_id = ? AND coop_id = ?",
      [user_id, coop_id]
    );
    if (result.length > 0) {
      // El usuario y la cooperativa ya están relacionados
      return {
        success: false,
        message: "El usuario y la cooperativa ya están registrados juntos",
      };
    }

    // Insertar una nueva fila en la tabla user_coop con el user_id y coop_id especificados
    const insertResult = await pool.query(
      "INSERT INTO user_coop (user_id, coop_id) VALUES (?, ?)",
      [user_id, coop_id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver un objeto indicando que la operación se realizó con éxito
    return { success: true };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar agregar la cooperativa al usuario",
    };
  }
}

module.exports = {
  obtenerTrabajadoresDeCoop,
  obtenerCoopsDeTrabajador,
  agregarCoopAUsuario,
  agregarUsuarioCoop,
};
