function getdbConfig() {
  return (dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "dr_norbert",
  });
}

module.exports = { getdbConfig };
