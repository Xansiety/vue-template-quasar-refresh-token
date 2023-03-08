import {  ref } from 'vue';
import { defineStore } from 'pinia'
import { useTimeoutFn } from '@vueuse/core'
import router from '../router/index';
import { Usuario, Credentials , AuthorizeStatus } from '../auth/interfaces'; 
  
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
        sessionStorage.setItem("user", AuthorizeStatus.authorize) 
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
        const { isPending, start, stop} = useTimeoutFn(() => {
            console.log("Se solicita automático refresh");
            refreshToken()
        }, 9000)
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
        sessionStorage.removeItem("user")
        console.error(error);
    }
   }

   const logoutUser = () => { 
     userData.value = null; 
     userToken.value = undefined;
     sessionStorage.removeItem("user")
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