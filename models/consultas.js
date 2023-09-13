const connection = require('./connection');


// En consultas.js
//Buscar un jugador
const getJugador = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM JUGADOR WHERE email = ?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

//Crear un jugador
const newJugador = (nombre, email) => {//Tengo que meter nombre (nombre, email) si lo quiero
  return new Promise((resolve, reject) => {//Tengo que meter [nomre,email] si quiero el nombre
    connection.query('INSERT INTO JUGADOR (nombre, email, puntos_totales) VALUES (?, ?, 0)', [nombre, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getPartida = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM PARTIDA WHERE email=? ', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

//Actualiza el campo id_partida en la tabla JUGADOR 
const updatePartidaJugador=(idPartida,email)=> {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE JUGADOR SET id_partida=? WHERE email=? ', [idPartida,email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//Crear una partida
//puntos_partida en la tabla PARTIDA. También puedes asignar el valor de puntos_totales en la tabla JUGADOR como 0 al crear una nueva partida.
/*const newPartida = async (email) => {//he añadido async

  const lastPartida =  await getLastPartida();//he añadido await
  let newIdPartida = 1; // Valor predeterminado para la primera partida

    if (lastPartida) {
      // Si existe una partida anterior, incrementar el ID en una unidad
      newIdPartida = lastPartida.id_partida + 1;
      console.log("newIdpartida linea 53 consulta, vale: ", newIdPartida)
    }
    //Insertar nueva partida
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO PARTIDA (email, puntos_partida, id_partida) VALUES (?, ?, ?)', [email, 0, newIdPartida], (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.query('UPDATE JUGADOR SET puntos_totales = 0, id_partida = ? WHERE email = ?', [newIdPartida, email], (error) => {
          if (error) {
            reject(error);
          } else {
            console.log("Nueva partida creada con email:", email);
            resolve(results);
          }
        });
      }
    });
  });
};*/
//insertar una nueva partida en la base de datos y actualizar la tabla JUGADOR
const insertPartida = (email, id_partida) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO PARTIDA (email, puntos_partida, id_partida) VALUES (?, 0, ?)', [email, id_partida], (error, results) => {//antes tenida 0 en vez de null
      if (error) {
        reject(error);
      } else {
        connection.query('UPDATE JUGADOR SET  id_partida = ? WHERE email = ?', [id_partida, email], (error) => {
          if (error) {
            reject(error);
          } else {
            console.log("Nueva partida creada con email:", email);
            resolve(results);
          }
        });
      }
    });
  });
};




//Comprueba y obtiene la partida más reciente
const getLastPartida = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM PARTIDA ORDER BY id_partida DESC LIMIT 1',
      (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length > 0) {
            resolve(results[0]);
          } else {
            resolve(null); // Si no hay partidas existentes, devuelve null
          }
        }
      }
    );
  });
};



const getCategoria = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM CATEGORIA', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getContiene = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM CONTIENE', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getPreguntas = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM PREGUNTA', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getPreguntasCategoria = (categoriaActual) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM PREGUNTA WHERE nombre_categoria = ? ', categoriaActual, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

const getPreguntaRespuestas = (id_pregunta) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM RESPUESTA r JOIN PREGUNTA p ON r.id_pregunta = p.id_pregunta WHERE p.id_pregunta = ?', id_pregunta, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};


const getRespuestas = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM RESPUESTA', (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

/*const getRespuestaCorrecta = (id_pregunta) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM respuesta WHERE id_pregunta=? AND es_correcta = 1', id_pregunta, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};*/

const getRespuestaCorrecta = (id_pregunta, id_respuesta) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM RESPUESTA WHERE id_pregunta=? AND id_respuesta=? AND es_correcta = 1', [id_pregunta, id_respuesta], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results==undefined || results.length==0) {
          resolve(0);
        }
        else {
          resolve(1);
        }
        //console.log("Esto es results: ",results[0]);
        //resolve(results[0]);
      }
    });
  });
};

//Guardar puntos obtenidos por jugador
/*const sendPuntos = (puntos, email) => {//Tengo que meter email
  return new Promise((resolve, reject) => {
    //Consulta para obtener los puntos de una partida
    connection.query('UPDATE jugador SET puntos_jugador = ? WHERE email = ?', [puntos, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};*/
/*const sendPuntos = (puntos, email) => {
  return new Promise((resolve, reject) => {
    try{
      // Obtener los puntos actuales del jugador
      connection.query('SELECT puntos_jugador FROM jugador WHERE email = ?', [email], (error, jugador) => {
        if (error) {
          reject(error);
        } else {
          //Obtener los puntos de una partida (puntos_jugador)
          connection.query('UPDATE jugador SET puntos_jugador = ? WHERE email = ?', [puntos, email], (error) => {
            if (error) {
              reject(error);
            } else {
              // Agregar los nuevos puntos a los puntos actuales
              const puntosTotales = jugador[0].puntos_jugador + puntos;
              // Actualizar la base de datos con la nueva cantidad de puntos
              connection.query('UPDATE jugador SET puntos_totales = ? WHERE email = ?', [puntosTotales, email], (error) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(); 
                }
              });
            }
          });
        }
      });
    } catch (error){
      reject(error);
    }
  });
};*/

//actualiza la puntuación de una partida en la tabla PARTIDA y la del jugador
const actualizarPuntuacion = (email, puntos) => {
  return new Promise(async (resolve, reject) => {
    let partidaActual=await getPartidaActualJugador(email);

    connection.query('UPDATE PARTIDA SET puntos_partida = puntos_partida + ? WHERE id_partida = ?', [puntos, partidaActual], (error, results) => {
      if (error) {
        reject(error);
      } else {
        connection.query('UPDATE JUGADOR SET puntos_totales = puntos_totales + ? WHERE email = ?', [puntos, email], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      }
    });
  });
};

//consulta la base de datos para obtener la partida actual asociada a un jugador
const getPartidaActualJugador = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM JUGADOR WHERE email=?', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results==undefined || results.length==0) {
          resolve(0);
        }
        else {
          resolve(results[0].id_partida);
        }
        //console.log("Esto es results: ",results[0]);
        //resolve(results[0]);
      }
    });
  });
};



//obtiene la puntuación de una partida desde la tabla PARTIDA
const getPuntuacionPartida = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT puntos_partida FROM PARTIDA WHERE PARTIDA.email = ? AND id_partida = (SELECT id_partida FROM JUGADOR WHERE email = ?)', [email, email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        console.log("getPuntuacionPartida vale: ", results[0].puntos_partida);
        //console.log("Esto es results.puntos_partida: ", results.puntos_partida);
        resolve(results[0].puntos_partida);
      }
    });
  });
};


//obtiene la puntuación total de un jugador sumando todas las puntuaciones de sus partidas
const getPuntuacionTotal = (email) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT JUGADOR.email, SUM(PARTIDA.puntos_partida) as puntos_totales FROM JUGADOR JOIN PARTIDA ON JUGADOR.email = PARTIDA.email WHERE JUGADOR.email = ? GROUP BY JUGADOR.email', [email], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length >0){
          console.log("getPuntuacionTotal vale: ",results[0].puntos_totales);
          resolve(results[0].puntos_totales);
          //resolve(results[0]);
        } else {
        resolve(0);
        }
      }
    });
  });
};





module.exports = {
  getJugador,
  newJugador,
  getPartida,
  getCategoria,
  getContiene,
  getPreguntas,
  getPreguntasCategoria,
  getPreguntaRespuestas,
  getRespuestas,
  getRespuestaCorrecta,
  //sendPuntos,
  getPuntuacionPartida,
  getPuntuacionTotal,
  actualizarPuntuacion,
  //newPartida,
  getLastPartida,
  insertPartida,
  updatePartidaJugador
};














