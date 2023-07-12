import { ref } from 'vue';
import { defineStore } from 'pinia';
import router from '../router/index';
import { Usuario, Credentials, AuthorizeStatus } from '../auth/interfaces';

export const useUserStore = defineStore('user', () => {
  const userData = ref<Usuario | null>(null);
  const userToken = ref<string | undefined>(undefined); 
  const loadingUser = ref<boolean>(false);
  const timerForRefreshToken = ref<number | undefined>(undefined);

  const callRefreshToken = (durationTokenInMinutes: number) => {
    timerForRefreshToken.value = setTimeout(async () => {
      await refreshToken();
    }, durationTokenInMinutes * 60 * 1000);
  };

  const clearRefreshToken = () => {
    clearTimeout(timerForRefreshToken.value);
  };

  const setCurrentUserData = ({ usuario, rol, accessToken, durationTokenInMinutes }: Usuario) => {
    userData.value = {
      usuario,
      rol
    };
    userToken.value = accessToken; 
    sessionStorage.setItem('user', AuthorizeStatus.authorize); 
    callRefreshToken(durationTokenInMinutes!);
  };

  const userLogin = async (payload: Credentials) => {
    try {
      loadingUser.value = true;
      await setCurrentUserData({
        usuario: 'admin',
        rol: 'admin',
        accessToken: 'Token JWT inicial',
        durationTokenInMinutes: 1
      } as Usuario);
      router.push({ name: 'home' });
    } catch (error) {
      console.error(error);
    } finally {
      loadingUser.value = false;
    }
  };

  const refreshToken = async () => {
    try {
      console.log('onRefresh ⚡');
      setCurrentUserData({
        usuario: 'admin',
        rol: 'admin',
        accessToken: 'TokenSuperSeguroRefresh',
        durationTokenInMinutes: 1
      } as Usuario);
    } catch (error) {
      sessionStorage.removeItem('user');
      console.error(error);
      logoutUser();
    }
  };

  const logoutUser = () => {
    userData.value = null;
    userToken.value = undefined;
    sessionStorage.removeItem('user');
    clearRefreshToken();
    router.push({ name: 'login' });
  };
  return {
    userData,
    userToken,
    loadingUser,
    userLogin,
    logoutUser,
    refreshToken
  };
});
