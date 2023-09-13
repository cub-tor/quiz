//Importa el módulo Express que es un marco de aplicación web para nodejs
const express = require('express');

//importa el módulo bodys-parser
const bodyParser = require('body-parser');

//Importa las rutas que manejan la solicitud al servidor
const consultaRoutes = require('./router/rutas');

//Importa consultaController
const consultaController = require("./controllers/consultaController");

//Crea una nueva instancia de una aplicación Express.
const app = express();


//Importa CORS, middleware para permitir comunicación entre el back y el front (npm i cors)
//Va después de app porque lo ocupa
const cors = require('cors');
var corsOptions = {
  origin: ' http://localhost:5173/',//remplazar con dominio
  credentials:true,
  optionSuccessStatus: 200  
}


// Habilitar CORS para todas las peticiones
app.use(cors(corsOptions));

// Configura el middleware para analizar el contenido del JSON 
app.use(bodyParser.json());


//Configura el middleware body-parser para analizar el cuerpo de las solicitudes entrantes en formato urlencoded con la opción extended habilitada.
app.use(bodyParser.urlencoded({ extended: true }));

//Añadido 22-04-23
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


// Rutas,  define las rutas de la aplicación utilizando las rutas de consultas importadas
app.use('/', consultaRoutes);

//Middleware para el manejo de errores
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Error interno del servidor');
});


// Iniciar el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});























































































