<template>
    <!--<div>
      <h1>Lista de preguntas</h1>
      <ul>
        <li v-for="pregunta in preguntas" :key="pregunta.id_pregunta">{{ pregunta.enunciado_pregunta }}</li>
      </ul>
    </div>-->

    
  <div v-if="categoriaActual">
    <h1>{{ categoriaActual.nombre_categoria }}</h1>
  </div>
  <!--
  <div v-if="preguntas.length>0">
    <div v-for="pregunta in preguntas" :key="pregunta.id_pregunta">
      <ul>
        <li>{{ pregunta.enunciado_pregunta }}</li>
      </ul></div></div>-->

      <div v-if="preguntaAleatoria">
        <p>{{ preguntaAleatoria.enunciado_pregunta }} </p>
      </div>

      
    
</template>

  
  
<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const categorias = ref([]);
    const preguntas = ref([]);
    const categoriaActual = ref(null);
    let category = -1;
    let id_pregunta;
    const preguntaAleatoria =ref(null);

    //Obtiene la categoría correspondiente. 
    const obtenerCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categoria');
        categorias.value = response.data;
        //categoriaActual es una referencia, hay que asignar el valor a su propiedad value
        categoriaActual.value= categorias.value[chooseCategory()];
        let valorCategoriaActual = categoriaActual.value.nombre_categoria;
        console.log(valorCategoriaActual);

        //Llama a obtenerPreguntasPorCategoria, que obtiene las preguntas de esa categoría
        const preguntasPorCategoria = await obtenerPreguntasPorCategoria(valorCategoriaActual);
        console.log("En obtenerCategorias:", preguntasPorCategoria.length);

        //Llama a random para escoger una pregunta al azar
        let id_preguntaRandom = randomQuestion(preguntasPorCategoria.length);
        console.log("id_preguntaRandom vale ", id_preguntaRandom);
        preguntaAleatoria.value = preguntasPorCategoria[id_preguntaRandom]
        console.log("preguntaAleatoria vale ", preguntaAleatoria.value);



      } catch (error) {
        console.error('Error al obtener las categorias:', error);
      }
    };
    
    //Obtiene las preguntas de una categoría concreta
    const obtenerPreguntasPorCategoria = async (nombre_categoria) => {
      try {
        const response = await axios.get(`http://localhost:3000/preguntas/${nombre_categoria}`);
        preguntas.value = response.data;
        console.log("En obtenerPreguntasPorCategoria:", preguntas.value.length);
        return preguntas.value;
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

//Función random, elegir una pregunta al azar
function randomQuestion(max) {
	let randomNumber = Math.floor(Math.random() * max );
	id_pregunta = randomNumber;
	console.log("id_pregunta vale ",id_pregunta);
  return randomNumber;
}



    onMounted(() => {
      obtenerCategorias();
    });

    return {
      categorias,
      preguntas,
      categoriaActual,
      obtenerCategorias,
      obtenerPreguntasPorCategoria,
      preguntaAleatoria
    };
  },
};

</script>
  