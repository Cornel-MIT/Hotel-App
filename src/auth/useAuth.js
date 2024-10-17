import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification as firebaseSendEmailVerification
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        setUser(null);
        localStorage.removeItem('user'); 
      }
    });

    return () => unsubscribe();
  }, []);

  const register = async (email, password, firstName, lastName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        firstName,
        lastName,
        role: 'user',
        emailVerified: false
      });

      await sendEmailVerification(user);

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); 
      return user;
    } catch (error) {
      throw error; 
    }
  };

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        throw new Error('Please verify your email before logging in.');
      }

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); 

      return user;
    } catch (error) {
      throw error; 
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem('user'); 
    } catch (error) {
      throw error; 
    }
  };

  const sendEmailVerification = async (user) => {
    try {
      await firebaseSendEmailVerification(user);
    } catch (error) {
      throw error;
    }
  };

  const checkEmailVerification = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      return auth.currentUser.emailVerified;
    }
    return false;
  };

  return { 
    user, 
    register, 
    login, 
    logout, 
    sendEmailVerification,
    checkEmailVerification
  };
};