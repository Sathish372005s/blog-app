import {create} from 'zustand';

import {registeruser,loginuser,meuser} from '../service/authservice'

interface AuthState {
    isAuthenticated : boolean;
    user : any;
    loadings : boolean;
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
    loadings : false,
    token : null,
    register : async (userData : any) => {
        console.log('authstore.register called with:', userData);
        set({loading : true});
        try {
            console.log('authstore.register payload:', userData);
            const {name,email,password} = userData;
            const res = await fetch('/api/register',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    name,email,password
                })
            });
            const data  = await res.json()
            console.log('authstore.register response:', res.status, data);
            
        } catch (err) {
            console.error('authstore.register error:', err);
            throw err;
        } finally {
            set({loading : false});
        }
    },
    login : async (userData : any) => {
        set({loading : true});
        try {
            console.log('authstore.login payload:', userData);
            const {email,password} = userData;
            const res = await fetch('/api/login',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email,password
                })
            });
            const data = await res.json().catch(()=>({}));
            console.log('authstore.login response:', res.status, data);
            if (res.ok) {
                set({isAuthenticated : true, user : data.user, token : data.token});
            }
            return;
        } catch (err) {
            console.error('authstore.login error:', err);
            throw err;
        } finally {
            set({loading : false});
        }
    },
    logout : () => {
        set({isAuthenticated : false, user : null, token : null, error : null})
    }
}))