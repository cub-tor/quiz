<template>
  <div id="generalFormulario" class="d-flex flex-column justify-content-center align-items-center mt-5">
    <h1 id="tituloRegistro" class=" mt-5 ">Registro</h1>
    <form @submit.prevent = "handleSubmit" class="d-flex flex-column justify-content-center align-items-center mt-3">
        
          <input type="nombre" placeholder="nombre" v-model = "nombre" class="form-control">
          <input type="email" placeholder="ejemplo@email.com" v-model = "email" class="form-control">
          <input type="password" placeholder="constraseña " v-model = "password" class="form-control">
        
          <div class="d-flex flex-row justify-content-center align-items-center mt-2">
            <button type= "submit" class="btn btn-primary px-2">Crear usuario</button>
            <button @click.prevent="logoutUser" class="btn btn-secondary px-2">Salir</button>
         </div>
      
    </form>
  </div>
    
</template>

<script>

import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth" ;
import { auth } from '../firebaseConfig';
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios";

export default {
  setup() {
    const user = ref(null);
    const router = useRouter();
    const nombre = ref("");
    const email = ref("");
    const password = ref("");
    var registerOk = false;

   

    const handleSubmit = async () => {
      if (!email.value || password.value.length < 6) {
        return alert("Los campos son obligatorios y la contraseña debe tener al menos 6 caracteres");
      }
      console.log(email.value);
      console.log(password.value);
      console.log("Procesando formulario");
    
      // Registro de usuario
      await registerUser(email.value, password.value);
      if (registerOk) {
        await enviarDatosAlServidor(nombre.value, email.value, password.value);

        // Al hacer el registro llevar al usuario a la pagina principal
        router.push('/Principal');
      } else {
        alert("Revisa los campos y vuelve a intentarlo");
      }
    };

    const registerUser = async (email, password) => {
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        registerOk= true;
        console.log(user);
        this.user = { email: user.email, uid: user.uid }
        console.log("user.email es: ", user.email);
        console.log("user.uid es: ", user.uid);
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      }
    };

    const enviarDatosAlServidor = async (nombre, email, password) => {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          nombre: nombre,
          email: email,
          password: password
        });
        console.log("Respuesta del servidor: ", response.data);
      } catch (error) {
        console.error("Error enviando datos al servidor: ", error);
      }
    };

    const logoutUser = async () => {
      try {
        await signOut(auth);
        user.value = null;
        console.log("Al salir user vale: ", user.value);
      } catch (error) {
        console.log("error al hacer logout: ", error);
      }
    }

    return {
      handleSubmit,
      logoutUser,
      nombre,
      email,
      password,
      user
    };
  },
};





</script>
<style>

#generalFormulario {
  margin: 0px auto;/*centrar el contenido*/
}
  #tituloRegistro {
    /*display:flex;
    align-self: center;
    margin: 2% auto;*/
    color: green;
   
  }

  /*form {
    display: flex;
    flex-direction: column;
    width: 25%;
    margin: 4% auto;
  }

  form input {
    margin-bottom: 5%;
  }

  form button {
    margin-bottom: 1%;
  }*/


</style>
