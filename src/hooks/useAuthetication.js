import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
    signOut,
    signInWithEmailAndPassword
} from 'firebase/auth'

import { useState, UseEffect, useEffect } from 'react'

export const useAuthentication=() => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    //cleanup
    //deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth()

    function checkIfIsCancelled() {
        if (cancelled) {
            return
        }
    }

    //register
    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);

        setError(false);
     
        try {       
            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )
                await updateProfile(user, {
                    displayName: data.displayName
                })
                setLoading(false);             
                return user

        } catch (error) {

            console.log(error.message)
            console.log(typeof error.message)
            
            let systemErrorMessage;

            if(error.message.includes("Password should be at least 6 characters")) {
                systemErrorMessage = 'A senha precisa conter pelo menos 6 caracteres.';           
            }else if (error.message.includes("auth/invalid-email")){
                systemErrorMessage = 'Email inválido.'
            }else if (error.message.includes("auth/email-already-in-use")){
                systemErrorMessage = 'Email já cadastrado'
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }
                 setError(systemErrorMessage)  
        }
          setLoading(false);
    };

    //logout
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    //login
    const login = async(data) => {
        checkIfIsCancelled()
        setLoading(true)
        setError(false)

        try {
          await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)
       
        } catch (error) {
           
            console.log(error.message)
            console.log(typeof error.message)

            let systemErrorMessage;
            
           if(error.message.includes('auth/user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado.';           
            }else if(error.message.includes("auth/wrong-password")) {
                systemErrorMessage = 'Senha incorreta.'; 
            }else if(error.message.includes('auth/too-many-requests')) {
                systemErrorMessage = 'Usuário temporariamente desablitado por causa de muitas tentativas de login.'; 
            }else{
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }
           
            setError(systemErrorMessage) 
           
        }
        setLoading(false)
    }
    
    useEffect(() => {
      return () => setCancelled(true); 
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };

};

