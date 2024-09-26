// import { useState, useEffect } from 'react';
// import { auth, db } from '../firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';

// export const useAuth = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user ? user : null);
//     });

//     return () => unsubscribe();
//   }, []);

//   const register = async (email, password) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       await setDoc(doc(db, 'users', user.uid), {
//         email: user.email,
//         role: 'admin' 
//       });

//       setUser(user);
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const login = async (email, password) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       setUser(user);
//       return user;
//     } catch (error) {
//       throw error;
//     }
//   };


//   const logout = async () => {
//     try {
//       await signOut(auth);
//       setUser(null);
//     } catch (error) {
//       throw error;
//     }
//   };

//   return { user, register, login, logout };
// };


import { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
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

  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: 'admin' 
      });

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

  return { user, register, login, logout };
};
