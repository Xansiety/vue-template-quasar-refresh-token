import { createRouter, createWebHistory } from "vue-router"
import { routesApp } from "./routesApp";
import { AuthorizeStatus } from "../auth/interfaces";
import { useUserStore } from "../store/useUserStore";
import { IsDevMode, VITE_PATH_BUILD } from "../config/environment";


const buildPath: string = IsDevMode ? "/" : VITE_PATH_BUILD;

const router = createRouter({
  history: createWebHistory(buildPath),
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  routes: routesApp,
});

router.beforeEach(async (to, from, next) => {
    // estatus del usuario
    const isAuthenticated = sessionStorage.getItem("user") === AuthorizeStatus.authorize;    
    // si la ruta requiere estar autenticado para visualizarla
    const requiredAuth = to.meta.requiresAuth;
    //User store para obtener el token
    const userStore = useUserStore();
    console.log("Initial:", {requiredAuth, isAuthenticated, token: userStore.userToken});
     // si existe el token en memoria y esta autenticado el usuario
     if (requiredAuth && userStore.userToken !== undefined) {
        console.log("existe token y requiere autentificación", { JWT:  userStore.userToken })
        return next();
     }
     // si no existe el token (se refrescó el sitio web), y esta autenticado el usuario
     else if ( requiredAuth && isAuthenticated  && userStore.userToken === undefined) {
        console.log(
          "Se recargo sitio -> No existe token pero esta autenticado el usuario :: onRefreshToken ⚡",
          { requiredAuth, isAuthenticated, token: userStore.userToken }
        );
        await userStore.refreshToken(); // llamamos nuevamente al refresh
        if (userStore.userToken !== undefined && isAuthenticated && requiredAuth) {
            //el usuario se coloco correctamente en el store
          console.log('se obtuvo un usuario y refresh valido', { refreshJWT:  userStore.userToken })
          return next();
        }
        //ocurrió un error y no se pudo colocar el usuario en el store
        console.error('no se pudo obtener un refresh y usuario valido');
        userStore.logoutUser(); // sacamos al usuario
        return next({ name: "login" })
      }
      // el usuario esta autenticado y quiere ingresar al login
      else if(!requiredAuth && isAuthenticated && to.name === 'login'){
        console.log('No se requiere autenticación, pero el usuario esta logueado y quiere ingresar al login')
        return next({name: 'home'})
      }
      // se intenta ingresa a una ruta protegida y el usuario no esta autenticado
      else if( requiredAuth && !isAuthenticated){
        userStore.logoutUser(); // sacamos al usuario
        return next({ name: "login" })
      }
      else {
        console.log('No hay datos para validar')
            //dejamos pasar a la vista
          return next(); 
      }
}); 
export default router