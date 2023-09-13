const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'bhdmldn5iqrc9jer9kqe-mysql.services.clever-cloud.com',//host: 'localhost',
  user: 'ucsqlozwph4we0cc', //user: 'usuario',
  password: 'bKeaNdtQ9Rdelo36iHLz', //password: '1234',
  database: 'bhdmldn5iqrc9jer9kqe', //database: 'quiz',
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












  