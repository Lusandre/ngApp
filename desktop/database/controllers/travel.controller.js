const mysql = require("promise-mysql");
const { getdbConfig } = require("../config.js");

const dbConfig = getdbConfig();

async function crearViaje(viaje) {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query =
      "INSERT INTO travel (user_id, date, origin, destination, departure_time, arrival_time, total_hours, breakfast, lunch, dinner, dailyallowance, corrected_daily_allowance, accommodation_rate, travel_distance_km, rate_per_km, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await pool.query(query, [
      viaje.user_id,
      viaje.date,
      viaje.origin,
      viaje.destination,
      viaje.departure_time,
      viaje.arrival_time,
      viaje.total_hours,
      viaje.breakfast,
      viaje.lunch,
      viaje.dinner,
      viaje.daily_allowance,
      viaje.corrected_daily_allowance,
      viaje.accommodation_rate,
      viaje.travel_distance_km,
      viaje.rate_per_km,
      viaje.total_amount,
    ]);
    pool.end();
    return { success: true, message: "Registro de viaje creado exitosamente" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar crear el registro de viaje",
    };
  }
}

async function obtenerViajePorId(viaje_id) {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query = "SELECT * FROM travel WHERE id = ?";
    const result = await pool.query(query, [viaje_id]);
    pool.end();
    if (result.length > 0) {
      return { success: true, viaje: result[0] };
    } else {
      return {
        success: false,
        message:
          "No se encontró ningún registro de viaje con el id especificado",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener el registro de viaje",
    };
  }
}

async function actualizarViaje(viaje_id, viaje) {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query =
      "UPDATE travel SET user_id = ?, date = ?, origin = ?, destination = ?, departure_time =?, arrival_time = ?, total_hours = ?, breakfast = ?, lunch = ?, dinner = ?, dailyallowance = ?, corrected_daily_allowance = ?, accommodation_rate = ?, travel_distance_km = ?, rate_per_km = ?, total_amount = ? WHERE id = ?";
    const result = await pool.query(query, [
      viaje.user_id,
      viaje.date,
      viaje.origin,
      viaje.destination,
      viaje.departure_time,
      viaje.arrival_time,
      viaje.total_hours,
      viaje.breakfast,
      viaje.lunch,
      viaje.dinner,
      viaje.daily_allowance,
      viaje.corrected_daily_allowance,
      viaje.accommodation_rate,
      viaje.travel_distance_km,
      viaje.rate_per_km,
      viaje.total_amount,
      viaje_id,
    ]);
    pool.end();
    return {
      success: true,
      message: "Registro de viaje actualizado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar actualizar el registro de viaje",
    };
  }
}

async function eliminarViaje(viaje_id) {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query = "DELETE FROM travel WHERE id = ?";
    const result = await pool.query(query, [viaje_id]);
    pool.end();
    return {
      success: true,
      message: "Registro de viaje eliminado exitosamente",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar eliminar el registro de viaje",
    };
  }
}

async function obtenerViajesDeUsuario(user_id) {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query = "SELECT * FROM travel WHERE user_id = ?";
    const result = await pool.query(query, [user_id]);
    pool.end();
    if (result.length > 0) {
      return { success: true, viajes: result };
    } else {
      return {
        success: false,
        message:
          "No se encontraron registros de viaje para el usuario especificado",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener los registros de viaje",
    };
  }
}

async function obtenerViajesOrdenadosPorFecha() {
  try {
    const pool = await mysql.createPool(dbConfig);
    const query = "SELECT * FROM travel ORDER BY date ASC";
    const result = await pool.query(query);
    pool.end();
    if (result.length > 0) {
      return { success: true, viajes: result };
    } else {
      return {
        success: false,
        message: "No se encontraron registros de viaje",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Error al intentar obtener los registros de viaje",
    };
  }
}
