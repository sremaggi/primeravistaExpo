import React,{useState,useEffect} from 'react'
import AppFirebase from '../firebase/config'; 
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";


const auth = getAuth(AppFirebase);

export function useAuthentication() {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('AUNTENTICADO! '+user.email)
        setUser(user);
      } else {
        setUser(undefined);
      }
    });
    return unsubscribeFromAuthStatuChanged;
  }, []);
  return {
    user
  };
}