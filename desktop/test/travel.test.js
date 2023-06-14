const {
  crearViaje,
  obtenerViajePorId,
  actualizarViaje,
  eliminarViaje,
} = require("./nombre_del_archivo.js");

// Crear un nuevo registro de viaje
const nuevoViaje = {
  user_id: 1,
  date: "2023-05-28",
  origin: "Ciudad de México",
  destination: "Guadalajara",
  departure_time: "08:00:00",
  arrival_time: "12:00:00",
  total_hours: 4,
  breakfast: 50,
  lunch: 100,
  dinner: 75,
  daily_allowance: 225,
  corrected_daily_allowance: 225,
  accommodation_rate: 800,
  travel_distance_km: 500,
  rate_per_km: 4.5,
  total_amount: 2675,
};

crearViaje(nuevoViaje)
  .then((result) => {
    if (result.success) {
      console.log(result.message);
    } else {
      console.log(result.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Obtener un registro de viaje por id
obtenerViajePorId(1)
  .then((result) => {
    if (result.success) {
      console.log(result.viaje);
    } else {
      console.log(result.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Actualizar un registro de viaje existente
const viajeActualizado = {
  user_id: 2,
  date: "2023-05-29",
  origin: "Guadalajara",
  destination: "Ciudad de México",
  departure_time: "09:00:00",
  arrival_time: "14:00:00",
  total_hours: 5,
  breakfast: 50,
  lunch: 100,
  dinner: 75,
  daily_allowance: 225,
  corrected_daily_allowance: 225,
  accommodation_rate: 800,
  travel_distance_km: 500,
  rate_per_km: 4.5,
  total_amount: 2675,
};

actualizarViaje(1, viajeActualizado)
  .then((result) => {
    if (result.success) {
      console.log(result.message);
    } else {
      console.log(result.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Eliminar un registro de viaje existente

// Obtener todos los registros de viaje de un usuario
obtenerViajesDeUsuario(1)
  .then((result) => {
    if (result.success) {
      console.log(result.viajes);
    } else {
      console.log(result.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });

// Obtener todos los registros de viaje ordenados por fecha
obtenerViajesOrdenadosPorFecha()
  .then((result) => {
    if (result.success) {
      console.log(result.viajes);
    } else {
      console.log(result.message);
    }
  })
  .catch((error) => {
    console.log(error);
  });
