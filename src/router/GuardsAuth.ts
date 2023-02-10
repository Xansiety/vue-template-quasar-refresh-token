import { AuthorizeStatus } from "../auth/interfaces";
import { useUserStore } from "../store/useUserStore";
  
export const requiereAuthGuard =  async (to: any, from: any, next: Function ) => {
    const useStore = useUserStore(); 
    const userStatus = localStorage.getItem("user") === AuthorizeStatus.authorize;  
    useStore.loadingUser = true;
    // si existe el token en memoria 
    if (useStore.userToken !== undefined && userStatus ) {
        console.log("No se realiza petición refresh token", useStore.userData)
        useStore.loadingUser = false;
        return next()
    } 
    // se refresco y se perdió el token
    if ( useStore.userToken === undefined && userStatus ) {
        console.log("onRefreshToken ⚡", { userStatus })
        await useStore.refreshToken(); // volvemos a pedir una actualización
        // validar al usuario o token ya debimos de obtener un token con el refresh
        if (useStore.userToken !== null) {
          // existe un usuario refrescado
          useStore.loadingUser = false
          return next()
        } 
        // No existen datos para validar, no se seteo el nuevo usuario en el refresh token
        console.log('No existen datos para validar')
        useStore.loadingUser = false
        useStore.logoutUser();
        return next({ name: "login" })
    } 
    console.log('No pasa por ninguna validación, no se cuenta con un local storage valido')
    useStore.logoutUser();
    useStore.loadingUser = false
    return next();
} 