//Definir rutas para Principal y Formulario
import { createRouter, createWebHistory } from 'vue-router'
import Principal from '../components/Principal.vue'
import Formulario from '../components/Formulario.vue'
import FormularioLogin from '../components/FormularioLogin.vue'
import Instrucciones from '../components/Instrucciones.vue'

const routes = [
  {
    path: '/Principal',
    name: 'Principal',
    component: Principal
  },
  {
    path: '/Formulario',
    name: 'Formulario',
    component: Formulario
  },
  {
    path: '/',
    name: 'FormularioLogin',
    component: FormularioLogin
  },
  {
    path: '/Instrucciones',
    name: 'Instrucciones',
    component: Instrucciones
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router