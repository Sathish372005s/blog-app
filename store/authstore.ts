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
            console.log('register response:', response);
            set({user : response.user, loading : false, error : null , isAuthenticated : true});
        }
        catch (error) {
            set({error : "Registration failed", loading : false});
        }
      
    },
    login : async (userData) => {
        try{
            console.log('login function called with server:', userData);
            set({loading : true});
            const response = await loginuser(userData);
            console.log('login response:', response);

            set({user : response.user, isAuthenticated : true, token : response.token, loading : false});
            return response.user;
        }
        catch (error) {
            set({error : "Login failed", loading : false});
        }
       
    },

    me : async () => {
        try {
            set({loading : true});
            const user = await meuser();
            set({user, isAuthenticated : true, loading : false});
        }
        catch (error) {
            set({error : "Failed to fetch user data", loading : false});
        }
    },
    logout : () => {
        set({isAuthenticated : false, user : null, token : null, error : null})
    }
}))