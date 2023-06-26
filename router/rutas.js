const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');

//router.get('/jugador', consultaController.getJugador);
router.get('/nuevaPartida/:email', consultaController.getNewPartida);
router.get('/categoria', consultaController.getCategoria);
router.get('/contiene', consultaController.getContiene);
router.get('/preguntas', consultaController.getPreguntas);
router.get('/preguntas/:nombre_categoria', consultaController.getPreguntasCategoria);
router.get('/respuestas/:id_pregunta', consultaController.getPreguntaRespuestas);
router.get('/respuestas', consultaController.getRespuestas);
router.post('/respuestas/:id_pregunta/:id_respuesta', consultaController.getYcheckRespuestaCorrecta);
//router.get('/jugador/:email', consultaController.handleLogin);
router.post('/login', consultaController.getJugador);
//router.post('/puntos', consultaController.sendPuntos);
router.get('/:nombre_categoria', consultaController.getPreguntaAleatoriaConRespuestas);
router.get('/partida/:email', consultaController.getPuntuacionPartida);
router.get('/jugador/:email', consultaController.getPuntuacionTotal);


module.exports = router








