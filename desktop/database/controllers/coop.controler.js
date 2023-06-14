const mysql = require("promise-mysql");
const { getdbConfig } = require("../config.js");

const dbConfig = getdbConfig();

async function getCoops() {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener todas las cooperativas de la tabla
    const coops = await pool.query("SELECT * FROM coop");

    // Cerrar la conexión
    pool.end();

    // Devolver las cooperativas
    return { success: true, coops };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener las cooperativas",
    };
  }
}

async function registrarCoop(name, menber_nr) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si la coperativa ya existe
    const coopExistente = await pool.query(
      "SELECT * FROM coop WHERE name = ?",
      [name]
    );

    if (coopExistente.length > 0) {
      return { success: false, message: "El nombre de la coop ya está en uso" };
    }

    // Insertar el nueva coop en la tabla
    const resultado = await pool.query(
      "INSERT INTO coop (name, menber_nr) VALUES (?, ?)",
      [name, menber_nr]
    );

    // Obtener los datos de la nueva coop
    const coopNuevo = await pool.query("SELECT * FROM coop WHERE id = ?", [
      resultado.insertId,
    ]);

    // Cerrar la conexión
    pool.end();

    // Devolver los datos de la nueva coop
    return { success: true, coop: coopNuevo[0] };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al intentar agregar la coop" };
  }
}

async function modificarCoop(id, name, menber_nr) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si el usuario existe
    const coop = await pool.query("SELECT * FROM coop WHERE id = ?", [id]);

    if (coop.length === 0) {
      return { success: false, message: "La coop no existe" };
    }

    // Actualizar los campos necesarios
    await pool.query("UPDATE coop SET name = ?, menber_nr = ? WHERE id = ?", [
      name,
      menber_nr,
      id,
    ]);

    // Obtener los datos actualizados del coop
    const coopActualizado = await pool.query(
      "SELECT * FROM coop WHERE id = ?",
      [id]
    );

    // Cerrar la conexión
    pool.end();

    // Devolver los datos del coop actualizado
    return { success: true, coop: coopActualizado[0] };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar modificar el coop",
    };
  }
}

async function eliminarCoop(id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Verificar si la coop existe
    const usuario = await pool.query("SELECT * FROM coop WHERE id = ?", [id]);

    if (usuario.length === 0) {
      return { success: false, message: "La coop no existe" };
    }

    // Eliminar la coop de la tabla
    await pool.query("DELETE FROM coop WHERE id = ?", [id]);

    // Cerrar la conexión
    pool.end();

    // Devolver un objeto con éxito
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Error al intentar eliminar la coop" };
  }
}
async function coopForId(id) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Obtener la cooperativa con el ID correspondiente
    const coop = await pool.query("SELECT * FROM coop WHERE id = ?", [id]);

    // Cerrar la conexión
    pool.end();

    // Devolver la cooperativa correspondiente
    return { success: true, coop: coop[0] };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener la cooperativa",
    };
  }
}

async function buscarCoops(nombre) {
  try {
    const pool = await mysql.createPool(dbConfig);

    // Buscar las cooperativas que contengan el nombre especificado
    const coops = await pool.query("SELECT * FROM coop WHERE name LIKE ?", [
      `%${nombre}%`,
    ]);

    // Cerrar la conexión
    pool.end();

    // Devolver las cooperativas encontradas
    return { success: true, coops };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar buscar las cooperativas",
    };
  }
}

module.exports = {
  registrarCoop,
  eliminarCoop,
  modificarCoop,
  getCoops,
  coopForId,
  buscarCoops,
};
