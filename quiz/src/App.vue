<script>
//import Pregunta from './components/Pregunta.vue';
//import Principal from './components/Principal.vue';
//import Respuestas from './components/Respuestas.vue';
//import Formulario from './components/Formulario.vue';
import FormularioLogin from './components/FormularioLogin.vue';

export default {
  name: 'App',
  components: {
    //Pregunta,
    //Principal,
    FormularioLogin
    
  }
};

</script>

<template>
  <div class="d-flex justify-content-center ml-5">
    <div id="cabecera ml-5" style="margin-right: -50%; margin-left: auto;">
      
      <!--<principal></principal>
      <formulario></formulario>-->
      <div id="titulo" class="d-felx justify-content-center">
        <img id="adorno" class="pr-0 mr-0" src="https://cdn.pixabay.com/photo/2012/04/02/13/57/chemical-reaction-24562__340.png"/>
        <h1 id="quiz" class="ml-0" style="margin-left: 0;"> Quiz Científico</h1>
    </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-felx justify-content-around">
        <ul class="d-flex justify-content space-around pr-5">
          <li class="px-5"><router-link to = "/">Login</router-link></li>
          <li class="px-5"><router-link to = "/Formulario">Registro</router-link></li>
          <li class="px-5"><router-link to = "/Instrucciones">Cómo se juega</router-link></li>
        </ul>
      </nav>
      <router-view></router-view>
      
    </div>
</div>
</template>

<style>
/* Estilos del componente */


#cabecera {
  display: flex;
  flex-direction: column;
  /*justify-content: center;centrar el contenido*/
  /*position: fixed;
  top: 0;
  left: 0;*/
  width: 100%;
  margin: 0px auto;/*centrar el contenido*/
  

}


nav{
  background-color: gainsboro;
  border: 1px solid grey;
  width: 100%;
  justify-content: center;
}

nav ul {
  display: flex!important;
  flex-direction: row;
  list-style: none;
  align-items: center;
  justify-content: center;
}

#titulo {
  display: flex;
  flex-direction: row;
  width: 100%;
  /*margin: 0px auto;*/
  /*border-bottom:  1px solid grey;*/
  float:left;
  justify-content:flex-start;
  /*width:100%;*/
 
}

#quiz {
  display: flex;
  align-self: center;
  margin-left: 20%;
  letter-spacing: 20%;
  font-size: 450%;
  font-family:monospace;
  font-weight: bold;
  color: green
  /*font-size: 1000%;*/
  
  
}

/* Estilos para dispositivos móviles pequeños */
@media screen and (max-width: 400px) {
  
 #adorno{
  /*display:none;*/
  width: 30%;
  max-width: 100%;
  height: auto;
 }

 #quiz {
  font-size: 200%;
  margin-right: 20%;
 }

 
 
}

/* Estilos para dispositivos móviles medianos */
@media screen  and (min-width: 400px) and (max-width: 767px) {

  #adorno{
    /*display: none;*/
    width: 40%;
    max-width: 100%;
    height: auto;
 }
 #quiz {
  font-size: 250%;
  margin-left: 15%;
 }
 
}

/* Estilos para pantallas de escritorio pequeñas */
@media screen and (min-width: 767.1px) and (max-width: 992px) {
  
   #adorno{
    /*display:none;*/
    width: 60%;
    max-width: 100%;
    height: auto;
 }
  #quiz{
    
    margin-right: 10%;
 }
 
  
}

/* Estilos para pantallas de escritorio medianas */
@media screen and (min-width: 992.1px) and (max-width: 1280px) {
  
  
  #adorno{
    /*display:none;*/
    width: 80%;
    max-width: 100%;
    height: auto;
 }
  #quiz{
   
    margin-right: 10%;
 }
 
}


</style>
