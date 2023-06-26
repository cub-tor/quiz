const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'usuario',
  password: '1234',
  database: 'quiz',
  port: 3306
});

connection.connect(error => {
  if (error) {
    console.error('Error al conectar a la base de datos:', error);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = connection;












  