const consultaModel = require('../models/consultas');


const getJugador = async (req, res, next) => {
  try {
    const { nombre, email} = req.body;
    //const mail = req.body.email; 
    //const name = req.body.nombre;
    console.log("El req.body.email es: ", email);
    let results = await consultaModel.getJugador(email);
    if (results.length === 0) {
      // el jugador no existe, así que lo creamos
      await consultaModel.newJugador(nombre, email);
      results = await consultaModel.getJugador(email);
    }//Añadido 22-05-23
    // Verificar si existe una partida para el jugador, si no, crear una nueva partida
    const jugador = results[0];
    if (!jugador.id_partida) {
      // No existe una partida para el jugador, crear una nueva partida
      await createNewPartida(email);
      results = await consultaModel.getJugador(email);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
};


/*const getPartida = async (req, res, next) => {
  try {
    const results = await consultaModel.getPartida();
    res.json(results);
  } catch (error) {
    next(error);
  }
};*/
const getNewPartida = async (req, res, next) => {
  try {
    const email = req.params.email;
    //let partida = await consultaModel.getPartida(email);

    //if (!partida) {
      // Si no existe una partida, crear una nueva partida
      //partida = await consultaModel.newPartida(email);
      partida = await createNewPartida(email);
    //}

    res.json(partida);
  } catch (error) {
    next(error);
  }
};

//Obtiene el último ID de partida y lo incrementa en uno para actualizar la tabla JUGADOR y PARTIDA
//Llamada asíncrona a las funciones getLastPartida e insertPartida
const createNewPartida = async (email) => {
  const lastPartida = await consultaModel.getLastPartida();
  let newIdPartida = 1; // Valor predeterminado para la primera partida

  if (lastPartida) {
    // Si existe una partida anterior, incrementar el ID en una unidad
    newIdPartida = lastPartida.id_partida + 1;
    console.log("newIdpartida en consultaController, vale: ", newIdPartida);
  }

  let partida=consultaModel.insertPartida(email, newIdPartida);
  //consultaModel.updatePartidaJugador(newIdPartida,email);
  
  // Insertar nueva partida y actualizar la tabla JUGADOR
  return partida;
};



const getCategoria = async (req, res, next) => {
  try {
    const results = await consultaModel.getCategoria();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getContiene = async (req, res, next) => {
  try {
    const results = await consultaModel.getContiene();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const getPreguntas = async (req, res, next) => {
  try {
    const results = await consultaModel.getPreguntas();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

//Obtiene todas las preguntas de una categoria dada
const getPreguntasCategoria = async (req, res, next) => {
  try {
    const categoriaActual = req.params.nombre_categoria;
    const results = await consultaModel.getPreguntasCategoria(categoriaActual);
    res.json(results);
  } catch (error) {
    next(error);
  }
};


//Obtiene una pregunta aleatoria de un array de preguntas (no funciona)
function obtenerPreguntaAleatoria(preguntas) {
  if (preguntas.length === 0) {
    throw new Error('El array de preguntas está vacío');
  }
  const indiceAleatorio = Math.floor(Math.random() * preguntas.length);
  return preguntas[indiceAleatorio];
}


////Obtiene las respuestas propias de una pregunta dada
const getPreguntaRespuestas = async (req, res, next) => {
  try {
    const id_pregunta = req.params.id_pregunta;
    const results = await consultaModel.getPreguntaRespuestas(id_pregunta);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

//Obtiene las respuestas 
const getRespuestas = async (req, res, next) => {
  try {
    const results = await consultaModel.getRespuestas();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

//Obtiene una pregunta aleatoria con sus respuestas (no funciona)
const getPreguntaAleatoriaConRespuestas = async (req, res, next) => {
  try {
    const categoriaActual = req.params.nombre_categoria;
    const preguntas = await consultaModel.getPreguntasCategoria(categoriaActual);
    const preguntaAleatoria = obtenerPreguntaAleatoria(preguntas);
    const id_pregunta = preguntaAleatoria.id_pregunta;
    const respuestas = await consultaModel.getPreguntaRespuestas(id_pregunta);
    const preguntaConRespuestas = {
      pregunta: preguntaAleatoria,
      respuestas: respuestas
    };
    res.json(preguntaConRespuestas);
  } catch (error) {
    next(error);
  }
};



//Comprueba si la respuesta es correcta
const getYcheckRespuestaCorrecta = async (req, res, next) => {
  try {
    // Variables para llevar la puntuación de la partida y la puntuación total
    //let puntuacionPartida = 0;
    //let puntuacionTotal = 0;
    const id_pregunta = req.params.id_pregunta;
    const id_respuesta = req.params.id_respuesta;//si es un parámetro, es lo que ha elegido el usuario
    const email = req.body.email; // Asegúrar el email del jugador en el body de la petición
    const id_respuesta_num = parseInt(id_respuesta);//id_respuesta es de tipo string hay que pasarla a número
    const esCorrecta = await consultaModel.getRespuestaCorrecta(id_pregunta, id_respuesta);
    //const idRespuestaCorrecta = results && results.id_respuesta //&& results[0] && results[0].id_respuesta;
    
    /*console.log("id_respuesta recibida: ", id_respuesta);
    console.log(typeof id_respuesta, id_respuesta);
    console.log("id_respuestaCorrecta: ", idRespuestaCorrecta);
    console.log(typeof idRespuestaCorrecta, idRespuestaCorrecta);
    console.log("results: ", results);
    console.log(typeof results, results);*/
    
    
    //if(id_respuesta_num === ){// antes idRespuestaCorrecta
      //puntuacionPartida += 1; // Sumar 1 punto a la puntuación de la partida
      //puntuacionTotal += 1; // Sumar 1 punto a la puntuación total del jugador
       // Actualizar la puntuación de la partida en la base de datos
    if(esCorrecta) {
      await consultaModel.actualizarPuntuacion(email, 1); // Suma 1 punto si la respuesta es correcta
      const respuestaCorrectayPuntos = {
        correcta: true,
        puntos: 1
      };
      res.json(respuestaCorrectayPuntos);
      //res.json({correcta: true});
    } else {
      const respuestaIncorrectayPuntos = {
        correcta: false,
        puntos: 0
      };
      res.json(respuestaIncorrectayPuntos);
      //res.json({correcta: false});
    }
  } catch (error) {
    next(error);
  }
};

//Obtiene los puntos de una partida 
const getPuntuacionPartida = async (req, res, next) => {
  try {
    const email = req.params.email;
    const results = await consultaModel.getPuntuacionPartida(email);
    //res.json(results);
    console.log("getPuntuacionPArtida vale: ", results);
    if(results) {
      res.json({puntos_partida: results});
    } else {
      res.json({puntos_partida: 0});
    }
  } catch (error) {
    next(error);
  }
};

//Obtiene los puntos totales de un jugador
const getPuntuacionTotal = async (req, res, next) => {
    try {
      const email = req.params.email;
      const puntuacionTotal = await consultaModel.getPuntuacionTotal(email);
      console.log("getPuntuacionTotal vale: ", puntuacionTotal);
      //if (puntuacionTotal) {
      if (puntuacionTotal !== null && puntuacionTotal !== undefined){
        res.json({ puntuacionTotal: puntuacionTotal });
        
      } else {
        res.json({ puntuacionTotal: 0 });
        
      }
    } catch (error) {
      next(error);
    }
};





module.exports = {
  getJugador,
  //handleGlogin,
  getNewPartida,
  getCategoria,
  getContiene,
  getPreguntas,
  getPreguntasCategoria,
  getPreguntaRespuestas,
  getRespuestas,
  getYcheckRespuestaCorrecta,
  //sendPuntos,
  getPreguntaAleatoriaConRespuestas,
  getPuntuacionPartida,
  getPuntuacionTotal,
  createNewPartida
  
};