<template>
      <div id="generalLogin" class="d-flex flex-column justify-content-center align-items-center mt-5">
        <h1 id="tituloLogin" class=" mt-5 ">Login</h1>
        <form @submit.prevent = "handleSubmit" class="d-flex flex-column justify-content-center align-items-center mt-3">
            <input type="nombre" placeholder="nombre" v-model = "nombre" class="form-control">
            <input type="email" placeholder="ejemplo@email.com" v-model = "email" class="form-control">
            <input type="password" placeholder="contraseña" v-model = "password" class="form-control">
            
            <div class="d-flex flex-row justify-content-center align-items-center mt-2">
              <button type= "submit" class="btn btn-primary px-2">Login</button>
              <button @click.prevent="logoutUser" class="btn btn-secondary px-2">Salir</button>
            </div>
        </form>
      </div>
        
</template>
    
    
<script>
    //Vue 3
    import { getAuth, signInWithEmailAndPassword, updateEmail, signOut } from "firebase/auth" ;
    import { auth } from '../firebaseConfig';
    import { ref, onMounted } from 'vue';
    import { useRouter } from 'vue-router'
    import axios from "axios";
      

export default {
  setup() {
    const user = ref(null);
    const router = useRouter();
    const nombre = ref('');
    const email = ref('');
    const password = ref('');
    var localMode=false;

    function URLServer() {
      if (localMode) {
        return 'http://localhost:3000';
      }
      else {
        return 'https://app-f1c0fd3b-2baa-473b-804c-fd15fd625772.cleverapps.io';
      }
    }

    

    async function enviarDatosAlServidor() {
      try {
        //const response = await axios.post("http://localhost:3000/login", {
        const response = await axios.post(`${URLServer()}/login`, {
          nombre: nombre.value,
          email: email.value
          //password: password.value,
        });
        console.log("Respuesta del servidor: ", response.data);
        console.log ("tipo de dato de email: ", typeof(email.value));
        console.log ("response.data es:  ", response.data.data);
      } catch (error) {
        console.error("Error enviando datos al servidor: ", error);
      }
    }
    
    async function handleSubmit() {
      if (!email.value || password.value.length < 6) {
        return alert('Los campos son obligatorios y la contraseña debe tener al menos 6 caracteres');
      }
      console.log(email.value);
      console.log (password.value);
      console.log("Procesando formulario");
          
          //Login de usuario
         var loginOk=  await loginUser(email.value, password.value);

        //Al hacer login llevar al usuario a la pagina principal
        if (loginOk) {
            await enviarDatosAlServidor();
            router.push('/Principal');//ver router/index.js
        } else {//Si no, llevarlo a registrarse
            alert("Registrate para jugar");
            router.push('/Formulario');
        }
    }
    async function loginUser(email, password) {
          try {
            const { user: user } = await signInWithEmailAndPassword (auth, email, password);
            console.log(user);
            user.value = { email: user.email, uid: user.uid }
            console.log("user.email es: ", user.email);
            console.log ("user.uid es: ", user.uid);
            return true;
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            return false;
        }
    }
    async function logoutUser () {
            try{
                await signOut(auth);
                this.user = null;
                console.log("Al salir user vale: ", this.user);

            } catch (error) {
                console.log("error al hacer logout: ", error);

            }
    }

    function updateEmail(){
      this.$emit('update: email', this.email)
    }
     

    return {
      nombre,
      email,
      password,
      handleSubmit,
      logoutUser,
      router,
      user,
      updateEmail,
      URLServer
    };
  },
};

    
    
</script>
<style>

#generalLogin {
  margin: 0px auto;/*centrar el contenido*/
}
  #tituloLogin{
    /*display: flex;
    align-self: center;
    margin: 2% auto;*/
    color: green;
  }

</style>