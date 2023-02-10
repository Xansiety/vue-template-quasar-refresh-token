import { Credentials } from '../auth/interfaces/index';
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/useUserStore"


export const useUserAuth = () => {
    const userStore = useUserStore();
    const { userData, loadingUser } = storeToRefs(userStore);  

    const singInUser = async (payload: Credentials) => { 
        const response = await userStore.userLogin(payload)
        return response;
    }

    const logoutUser = () => {
        userStore.logoutUser()
    }
    
    return {
        userData,
        loadingUser, 
        singInUser,
        logoutUser
    }

}