const mysql = require('mysql');
const dotenv = require('dotenv'); // Importa dotenv

dotenv.config(); // Carga las variables de entorno desde .env

const connection = mysql.createConnection({
  host: process.env.DB_HOST,//host: 'localhost',
  user: process.env.DB_USER, //user: 'usuario',
  password: process.env.DB_PASSWORD, //password: '1234',
  database: process.env.DB_NAME, //database: 'quiz',
  port: process.env.DB_PORT // port: 3306
});

connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = connection;












  