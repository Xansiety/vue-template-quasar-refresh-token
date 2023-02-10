import { defineStore } from 'pinia'
import {  ref } from 'vue';
import { Usuario, Credentials , AuthorizeStatus } from '../auth/interfaces'; 
import router from '../router/index';
  
export const useUserStore = defineStore('user', () => {
    
    const userData = ref<Usuario | null>(null);
    const userToken = ref<string | undefined>(undefined); 
    const loadingUser = ref<boolean>(false);
    
    const setCurrentUserData = ( { usuario, rol, accessToken } : Usuario) => {
        userData.value = {
            usuario,
            rol
        } 
        userToken.value = accessToken 
        localStorage.setItem("user", AuthorizeStatus.authorize) 
        setTimeRefresh();
    } 
 
   const userLogin = async (payload: Credentials) =>
   { 
       try {
            loadingUser.value = true;
            await setCurrentUserData({
                usuario: 'admin',
                rol: 'admin',
                accessToken: 'Token JWT inicial'
            } as Usuario )
            router.push({ name: 'home'})
        } catch (error) {
            console.error(error)
        } 
        finally {
            loadingUser.value = false
        }
   }

   const setTimeRefresh = () => {
        setTimeout(() => {
        console.log("Se solicita automático refresh");
        refreshToken()
        }, 40000)
    }
 
   const refreshToken = async () => {
       try { 
           console.log("onRefresh ⚡");
           setCurrentUserData({
            usuario: 'admin',
            rol: 'admin',
            accessToken: 'TokenSuperSeguroRefresh'
        } as Usuario )
    } catch (error) {
        localStorage.removeItem("user")
        console.error(error);
    }
   }

   const logoutUser = () => { 
     userData.value = null; 
     userToken.value = undefined;
     localStorage.removeItem("user")
     router.push({ name: 'login'})
   }  
    return { 
        userData, 
        userToken, 
        loadingUser,  
        userLogin,
        logoutUser,
        refreshToken
    }
})