import {create} from 'zustand';

import {registeruser,loginuser,meuser} from '../service/authservice'

interface AuthState {
    isAuthenticated : boolean;
    user : any;
    loading : boolean;
    token : string | null;
    error : string | null;
    register : (userData : any) => Promise<void>;
    login : (userData : any) => Promise<void>;
    logout : () => void;
    me : () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set)=>({
    isAuthenticated : false,
    user : null,
    loading : false,
    token : null,
    error : null,

    register : async (userData) => {
        try {
            set({loading : true});
            const response = await registeruser(userData);
            set({user : response, loading : false});
        }
        catch (error) {
            set({error : "Registration failed"});
        }
        finally {
            set({loading : false});
        }
    },
    login : async (userData) => {
        try{
            set({loading : true});
            const response = await loginuser(userData);
            set({user : response.user, isAuthenticated : true, token : response.token, loading : false});
        }
        catch (error) {
            set({error : "Login failed"});
        }
        finally {
            set({loading : false});
        }
    },

    me : async () => {
        try {
            set({loading : true});
            const user = await meuser();
            set({user, isAuthenticated : true, loading : false});
        }
        catch (error) {
            set({error : "Failed to fetch user data"});
        }
        finally {
            set({loading : false});
        }
    },
    logout : () => {
        set({isAuthenticated : false, user : null, token : null, error : null})
    }
}))