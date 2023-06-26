<template>
  <div id="general">
    <div id="juego">
      <!--<div id="pizarra">-->
        <div id="interiorPizarra">
          <div v-if="categoriaActual" class="categoria">
            <h1>{{ categoriaActual.nombre_categoria }}</h1><hr>
          </div>
              
          <div v-if="preguntas" class="pregunta">
            <p>{{ preguntas.enunciado_pregunta }} </p>
          </div>

          <div v-if="respuestas" class="respuestas">
            <div v-for="(respuesta, index) in respuestas" :key="index" class="res">
              <input type="radio" :id="index" :name="'respuesta'" :value="respuesta.id_respuesta" v-model="respuestaSeleccionada" />
              <label :for="index">{{ respuesta.enunciado_respuesta }}</label><br />
            </div>
          </div>
          <div class="botones">
            <div>
              <button id="respuesta" @click="processAnswer" class="btn">Responder</button>
            </div>
            <div>
              <button v-if="mostrarBotonVolverAjugar" @click="reset" class="btn">Volver a jugar</button>
             
            </div>
            <div>
              <button v-if="mostrarBotonVerPuntuacion"  @click="mostrarPuntuacion" type="button" class="btn" data-toggle="modal" data-target="#exampleModal">Ver Puntuación</button>

              
            </div>
        </div>
     
      </div>
    </div>

    <div id="resultado">
      <div id="cuadroExterno">
        <div class="etiquetaTema">Biología<div class="cuadroInterno" id="tema0" ></div>
        </div>  
        <div class="etiquetaTema">Física<div class="cuadroInterno" id="tema1" ></div>
        </div>    
        <div class="etiquetaTema">Matemáticas<div class="cuadroInterno" id="tema2" ></div>
        </div>
        <div class="etiquetaTema">Medicina<div class="cuadroInterno" id="tema3" ></div>
        </div>
        <div class="etiquetaTema">Química<div class="cuadroInterno" id="tema4" ></div>
        </div>
        <div class="etiquetaTema">Tecnología<div class="cuadroInterno" id="tema5" ></div>
        </div>  
      </div>     
    </div>
</div>
  
    
    
</template>

  
  
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { auth } from '@/firebaseConfig.js';
//import { reactive } from 'vue';



export default {
  setup() {
    const categorias = ref([]);
    const preguntas = ref([]);
    const respuestas = ref([]);
    const categoriaActual = ref(null);
    let category = -1;
    let id_pregunta;
    const preguntaIndex = ref(0);
    const preguntaAleatoria =ref(null);
    const respuestaSeleccionada = ref(null);
    let valorCategoriaActual;
    let id_respuesta;
    const puntos = ref(0);
    const mostrarBotonVolverAjugar = ref(false);
    const mostrarBotonVerPuntuacion = ref(false);
    const data = ref({ puntuacionTotal: 0 });
    const dataPartida = ref({puntos_partida: 0});
    //const claseCirculo = ref('');
    var localMode=true;

    function URLServer() {
      if (localMode) {
        return 'http://localhost:3000';
      }
      else {
        return 'https://elsapi.com';
      }
    }

    //Obtener los datos del usuario que ha iniciado sesión
    const obtenerDatosUsuarioActual = () => {
      const usuarioActual = auth.currentUser;
      if (usuarioActual) {//verifica si hay un usuario actual
          const { email } = usuarioActual;
          return { email };//objeto comun  de firebase
      } else {
          return null;
      }
    }


    //Carga el juego, llamando a obtenerDatosUsuarioActual, obtenerPartida y CargarSiguientePregunta
    const cargarQuiz= async ()=> {
      try {

        const datosJugador = obtenerDatosUsuarioActual();
        const email = datosJugador.email;
        console.log("Datos jugador antes de cargar partida es: ", email)

        //Crear u obtener una partida 
        await obtenerPartida(email);
        
        
        CargarSiguientePregunta ();


      } catch (error) {
        console.error('Error:', error);
      }
    };

    //Carga la siguiente pregunta, llamando a obtenerSiguienteCategoria
    const CargarSiguientePregunta = async ()=> {
        valorCategoriaActual = await obtenerSiguienteCategoria();
        console.log('valorCategoriaActual',valorCategoriaActual); 
        
        await getPreguntaAleatoriaConRespuestas(valorCategoriaActual);
    }

   
    //Obtiene los datos de la partida que está jugando el jugador
    const obtenerPartida = async (email) => {
      try {
        const response = await axios.get(`${URLServer()}/nuevaPartida/${email}`);
        //const response = await axios.get('http://localhost:3000/categoria');
        const partida = response.data;
        if (partida) {
          console.log("La partida se ha creado");
          
        }

      } catch (error) {
        console.error('Error al obtener la partida', error);
      }
    }

    //Pasa de una categoria a otra, en orden
    const obtenerSiguienteCategoria = async () => {
      try {
        const response = await axios.get(`${URLServer()}/categoria`);
        //const response = await axios.get('http://localhost:3000/categoria');
        categorias.value = response.data;
        if (categorias.value.length > 0) {
          //categoriaActual es una referencia, hay que asignar el valor a su propiedad value
          categoriaActual.value= categorias.value[chooseCategory()];
          valorCategoriaActual = categoriaActual.value.nombre_categoria;
          console.log(valorCategoriaActual);
          return valorCategoriaActual;
        }

      } catch (error) {
        console.error('Error al obtener las categorias:', error);
      }
    }

   
    //Obtener una pregunta aleatoria de una categoria y sus respuestas
    const getPreguntaAleatoriaConRespuestas = async (nombre_categoria=valorCategoriaActual) => {
      try {
        //const response = await axios.get(`http://localhost:3000/${nombre_categoria}`);
        const response = await axios.get(`${URLServer()}/${nombre_categoria}`);
        preguntas.value = response.data.pregunta;
        id_pregunta = preguntas.value.id_pregunta;//añadido
        //console.log("id_pregunta vale: ", id_pregunta);//añadido
        //console.log("En obtenerPreguntaAleatoria:", preguntas.value.length);
        respuestas.value = response.data.respuestas;
        //console.log("En obtener ConRespuestas:", respuestas.value.length);
      } catch (error) {
        console.error('Error al obtener las preguntas por categoria:', error);
      }
    };

    

      //Elegir categoría 
    function chooseCategory() {
      if (category < 5) {
        category = category+1;
      } else{
        category = 0;
      }
      return category
    }

    
    
    
 //Chequear
    const chequearRespuesta = async (id_pregunta) => {
      try {
        const inputRespuestas = document.querySelectorAll('input[name="respuesta"]');
        console.log("inputRespuestas es ", inputRespuestas);

        for (const respuesta of inputRespuestas) {
          if (respuesta.checked) {
            id_respuesta = respuesta.value; // id_respuesta recogido en el formulario

            break;
          }
        }
        console.log("id_respuesta es el id_respuesta de la seleccionada: ", id_respuesta);

        // Obtener el email del jugador (ajusta esto según cómo obtengas el email en el front-end)
        const datosJugador = obtenerDatosUsuarioActual();
        const email = datosJugador.email;

        // Enviar el email junto con los otros datos al back-end
        const response = await axios.post(`${URLServer()}/respuestas/${id_pregunta}/${id_respuesta}`, { email });

        if (response.data.correcta) {
          console.log("Respuesta correcta");
          console.log("Category aqui vale: ", category);
          colorGoodScore("tema"+ category);
          //enviarPuntosAlServidor(puntos.value, datosJugador.email);//añadido ahora
          //puntos.value += 1;
          console.log("Los datos del jugador son: ", datosJugador);
          //await axios.post(`${URLServer()}/partida/:email`);//, { puntos: puntos.value, email: datosJugador.email });
          return true;
        } else {
          console.log("Respuesta incorrecta");
          colorBadScore("tema"+ category);
          return false;
        }
      } catch (error) {
      console.error(error, "al chequear respuesta");
     }
    }

//Funciones para comprobar si la respuesta es correcta o no:
//Funciones para colorear los cuadrados según se conteste bien o mal
function colorBadScore(id) {
	let square = document.getElementById(id);
	square.classList.add("red");
}

function colorGoodScore(id) {
	let square = document.getElementById(id);
	if (id == "tema0") {
		square.classList.add("green");
	} else if  (id == "tema1") {
		square.classList.add("orange");
	} else if (id == "tema2") {
		square.classList.add("yellow");
	} else if (id == "tema3") {
		square.classList.add("purple");
	}  else if (id == "tema4") {
		square.classList.add("blue");
	}  else if (id == "tema5") {
		square.classList.add("brown");
	}
}


    //Comprobar última categoría
    function lastCategory() {
      if (category==5) {
        return true;
      }
      else {
        return false;
      }
    }


    //Procesar respuesta (antes function processAnswer () {})
    const processAnswer = async ()=>{

      //comprobar respuesta
      //chequearRespuesta(preguntaIndex.value+1);
      await chequearRespuesta(id_pregunta);

      //Quitar la propiedad checked de la pregunta anterior
      let radio= document.querySelector('input[name="respuesta"]:checked');
  		radio.checked = false;
      
      //Comprobar si es última categoría
      if (lastCategory()) {						
          //si es la última categoria pintar botón para recargar pantalla al hacer click
          //category= 0;
          mostrarBotonVolverAjugar.value = true;
          mostrarBotonVerPuntuacion.value = true;
          const datosJugador = obtenerDatosUsuarioActual();
          const email = datosJugador.email;
          let puntuacionPartida = await obtenerPuntuacionPartida(email);
          let puntuacionTotal = await obtenerPuntuacionTotal();
          console.log("Tienes estos puntos en esta categoria: ", puntuacionPartida);
          console.log("Tienes estos puntos totales: ", puntuacionTotal);
          //alert("Tu puntuación es: ", puntuacionTotal);
      } else {
          //si no es la última categoría, cargar pregunta de la siguiente categoria 
          //cargarQuiz();	
          CargarSiguientePregunta();
        }
    
    }

  async function obtenerPuntuacionTotal() {
    try {
      const datosJugador = obtenerDatosUsuarioActual();
      const email = datosJugador.email;
      const response = await axios.get(`${URLServer()}/jugador/${email}`);
      data.value.puntuacionTotal= response.data.puntuacionTotal;
      let puntuacionJugador = data.value.puntuacionTotal;
      console.log("puntuacion Total vale: ", data.value.puntuacionTotal);
      //mostrarBotonVerPuntuacion.value = false;
      //return response.data.puntuacionTotal;
      
      return puntuacionJugador;
    } catch (error) {
      console.error('Error al obtener la puntuación total:', error);
      return null;
    }
  }



  async function obtenerPuntuacionPartida() {
    try {
      const datosJugador = obtenerDatosUsuarioActual();
      const email = datosJugador.email;
      const response = await axios.get(`${URLServer()}/partida/${email}`);
      console.log("response en obtenerPuntuacionPartida vale: ", response);
      dataPartida.value.puntos_partida = response.data.puntos_partida;
      console.log("puntuacionPartida vale: ", response.data.puntos_partida);
      return response.data.puntos_partida;
    } catch (error) {
        console.error('Error al obtener la puntuación por partida:', error);
        return null;
    }
  }

  //Muestra la puntuación en una ventana a parte
  async function mostrarPuntuacion () {
    // Obtener la puntuación de la última partida y la puntuación total del jugador
    let puntuacionPartida = await obtenerPuntuacionPartida();
    let puntuacionTotal = await obtenerPuntuacionTotal();

    // Abrir una nueva ventana
    const nuevaVentana = window.open("", "_blank", "width=400, height=200")
    
    // Escribir la puntuación en la nueva ventana
    nuevaVentana.document.write("<h1 style='font-family: monospace; text-align: center; color: green; font-weight: bold; font-size: 200%;'>Tú Puntuación</h1>");
    nuevaVentana.document.write("<p style='font-family: monospace; text-align: center;font-size: 150%;'>Puntuación de esta partida: " + puntuacionPartida + "</p>");
    nuevaVentana.document.write("<p style='font-family: monospace; text-align: center;font-size: 150%;'>Puntuación Total: " + puntuacionTotal + "</p>");

     // Agregar botón de cierre
    nuevaVentana.document.write('<button id="cerrarVentana">Cerrar</button>');

    // Cerrar el documento de la nueva ventana
    nuevaVentana.document.close();

    // Agregar event listener al botón de cierre
    const botonCerrar = nuevaVentana.document.getElementById("cerrarVentana");
    botonCerrar.addEventListener("click", () => {
      nuevaVentana.close();
    });

    

  }

    //Función para volver a jugar, pone las condiciones de inicio
    function reset (){
      puntos.value = 0;
      category= -1;
      mostrarBotonVolverAjugar.value = false;
      mostrarBotonVerPuntuacion.value = false;
      let squares = document.querySelectorAll(".cuadroInterno");
      for (const square of squares) {
        square.classList.remove("red");
        square.classList.remove("green");
        square.classList.remove("orange");
        square.classList.remove("yellow");
        square.classList.remove("purple");
        square.classList.remove("blue");
        square.classList.remove("brown");
      }
      cargarQuiz();
    }

  

    //Acciones que deben realizarse cuando el componente se monta por primera vez.
    onMounted(() => {
      cargarQuiz();
      
    });

    //Objeto de retorno  
    return {
      categorias,
      preguntas,
      categoriaActual,
      valorCategoriaActual,
      obtenerSiguienteCategoria,
      //obtenerPreguntasPorCategoria,
      preguntaAleatoria,
      //obtenerRespuestasPorPregunta,
      respuestaSeleccionada,
      respuestas,
      preguntaIndex,
      //randomQuestion,
      id_pregunta,
      chequearRespuesta,
      processAnswer,
      puntos,
      obtenerDatosUsuarioActual,
      mostrarBotonVolverAjugar,
      reset,
      getPreguntaAleatoriaConRespuestas,
      URLServer,
      obtenerPuntuacionTotal,
      obtenerPuntuacionPartida,
      mostrarBotonVerPuntuacion,
      obtenerPartida,
      data,
      dataPartida,
      mostrarPuntuacion,
      colorBadScore,
      colorGoodScore
      //claseCirculo
      //puntuacionPartida,
      //puntutacionTotal
     
      //enviarPuntosAlServidor
    };
  },
};

</script>

<style>

#general {
  display: flex;
  flex-direction: row;
  justify-content:flex-start;
  
  width: 100%;
  margin: 0px auto;/*centrar el contenido*/
  
}

/*#juego {
  
  color: white; 
  font-family: 'White Wonder', cursive; 
  background-image: url(https://c1.wallpaperflare.com/preview/184/716/976/chalkboard-slate-green-blackboard.jpg);
  background-repeat: no-repeat;
  min-height:60%;
  margin: 3% 0% 0% 10%;
  display: flex;
  flex-direction: column;
  justify-content:left;
  align-content: center;
  text-align: center;
  flex-grow: 0.5;
}*/

#juego {
  position: absolute;
  left: 30%;
  color: white;
  font-family: 'White Wonder', cursive;
  background-image: url(https://c1.wallpaperflare.com/preview/184/716/976/chalkboard-slate-green-blackboard.jpg);
  background-repeat: no-repeat;
  background-size: 950px 500px;
  min-height: 60%;
  margin: 3% 0% 0% 10%;
  display: grid;
  place-items: center;
  /*display: flex;
  flex-direction: column;
  justify-content: center;*/
  align-items: center;
  flex-grow: 0.5;
  font-size: 130%;
  width: 70%;
}

/*#pizarra {
  display: flex;
  /*justify-content: center;
  align-items:center;*/
  /*align-content: center;
  margin: 30% auto;
}*/

/*#interiorPizarra {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15% auto 40% auto;
  flex-grow: 1;
}*/

#interiorPizarra {
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: right;
  /* margin: 15% auto 40% auto; Elimina esta propiedad *;
  flex-grow: 1;
  text-align:right; /* Añade esta propiedad */
  width: 100%;
  margin-right: 50%;
  margin-top: 5%;
  
}


.categoria {
  display: flex;
  align-self: center;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: center;
  margin-top: 2%;
  margin-bottom: 3%;
  width: fit-content;
  
}

.pregunta {
  color: white;
  width: 80%;
  height: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 3%;
  
  
}

.respuestas {
  color: white;
  width: 80%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  flex-wrap: wrap;
 
  margin-left: 45%;

}

.res {
  display: flex;
  align-items: center;
  flex-basis: 100%;
}

.respuestas input[type="radio"] {
  margin-right: 10px;
}

.botones {
  display: flex;
  flex-direction: row;
  background-color: gainsboro;
  color: white;
  margin-top:5%;
  margin-bottom: 150%;
  margin-left: 45%;
  text-align: center;
  
}

#cuadroExterno {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 25px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  width: 200%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10%;
  margin-top: 80%;
  margin-left: 300%;

}
.cuadroInterno {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items:center;
  text-align:center;
  justify-content:space-evenly;
  margin: auto;
}

.red {
  background-color: #fc0202;
}
.green{
  background-color: #5efc02;
}
.orange{
  background-color: #fc7b02;
}
.yellow{
  background-color: #fcf802;
}
.purple{
  background-color: #ca02fc;
}
.blue {
  background-color: #02f4fc;
}
.brown{
  background-color: #634607;
}

/* Estilos para dispositivos móviles pequeños */
@media screen and (max-width: 400px) {
  #general {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  #juego {
    width: 60%;
    height: 36%;
    margin-top: 5%;
    
  }
  #interiorPizarra {
    align-items: center;
    margin-top: 25%;
    margin-left: 30%;
  }
  .categoria {
    font-size:small;
    
  }
  .pregunta{
    font-size:small;
  }
  .respuestas {
    font-size:small;
  }
  .botones {
    font-size: small;
  }
  #resultado {
    width:25%;
    height: 25%;
    margin-left: 10%;
  }
   #cuadroExterno {
    width: 20%;
    height: 20%;
    margin-left: 15%;
    
   }

}

/* Estilos para dispositivos móviles medianos */
@media screen  and (min-width: 400.1px) and (max-width: 768px) {
  #general {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }
  #juego {
    width: 65%;
    height: 40%;;
    align-self: flex-start;
    margin-top: 5%;
  }

  #interiorPizarra {
    margin-top: 25%;
    margin-left: 30%;
    align-items: center;

  }

  #resultado {
    width: 20%;
    height: 20%;
    margin-left: 15%;
    align-self: flex-start;
  }

  #cuadroExterno {
    width: 20%;
    height: 20%;
    margin-left:20%;
    align-self: flex-start;
    
   }
  .categoria {
    font-size:small;
  }
  .pregunta{
    font-size:small;
  }
  .respuestas {
    font-size:small;
  }

  .botones {
    font-size: small;
  }

 

}

/* Estilos para pantallas de escritorio pequeñas */
@media screen and (min-width: 768.1px) and (max-width: 992px) {
  
  #general {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: baseline;
    text-align: center;
  }
  #juego {
    width: 60%;
    height: 50%;;
    align-self: flex-start;
  }

  #interiorPizarra {
    margin-top: 15%;
    margin-left: 15%;
    display: flex;
    align-items: center;
    text-align: center;
  }

  #resultado {
    width: 25%;
    height: 25%;
    margin-left: 7%;
    align-self: flex-start;
  }

  #cuadroExterno {
    width: 25%;
    height: 25%;
    margin-left:10%;
    align-self: flex-start;
    
   }
  .categoria {
    font-size:small;
  }
  .pregunta{
    font-size:small;
  }
  .respuestas {
    font-size:small;
  }
 
}

/* Estilos para pantallas de escritorio medianas */
@media screen and (min-width: 992.1px) and (max-width: 1280px) {
  #general {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;
  }
  #juego {
    width: 70%;
    height: 15%;;
    align-self: flex-start;
  }

  #interiorPizarra {
    margin-top: 15%;
    margin-left: 15%;
    display: flex;
    align-items: center;
    text-align: center;
  }

  #resultado {
    width: 35%;
    height: 15%;
    margin-top:20%;
    margin-left: 0;
    margin-bottom: 50%;
    align-self: flex-start;
    display: flex;
    justify-content: center;
  }

  #cuadroExterno {
    width: 35%;
    height: 30%;
    margin-right:30%;
    align-self: flex-start;
    
   }
  .categoria {
    font-size:medium;
  }
  .pregunta{
    font-size:medium;
  }
  .respuestas {
    font-size:medium;
  }

  
}



</style>
  