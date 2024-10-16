// import React, { useState } from 'react';
// import { auth, db } from '../firebase';  
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { collection, addDoc } from 'firebase/firestore'; 
// import { useNavigate } from 'react-router-dom';
// import './SignInForm.css';

// const AuthForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       if (isLogin) {
//         await signInWithEmailAndPassword(auth, email, password);
//         navigate('/'); 
//       } else {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);

//         await updateProfile(userCredential.user, { displayName: fullName });

//         await addDoc(collection(db, 'users'), {
//           uid: userCredential.user.uid, 
//           fullName: fullName,
//           email: email,
//           createdAt: new Date(),
//         });

//         navigate('/');  
//       }
//     } catch (error) {
//       console.error("Authentication error:", error);
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-form-container">
//       <p className="form-title">
//         {isLogin ? "Please Log In As Admin" : "Please Register as Admin"}
//       </p>
//       <form className="form" onSubmit={handleSubmit}>
//         {!isLogin && (
//           <div className="input-container">
//             <input 
//               placeholder="Full Name" 
//               type="text" 
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required 
//             />
//             <span>
//               <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-5.523 0-10 4.477-10 10h20c0-5.523-4.477-10-10-10z" />
//               </svg>
//             </span>
//           </div>
//         )}
//         <div className="input-container">
//           <input 
//             placeholder="Email" 
//             type="email" 
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required 
//           />
//           <span>
//             <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0 8 8 0 00-8-8m4.5 6A9 9 0 0012 21" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
//             </svg>
//           </span>
//         </div>
//         <div className="input-container">
//           <input 
//             placeholder="Password" 
//             type="password" 
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required 
//           />
//           <span>
//             <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
//               <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round"></path>
//             </svg>
//           </span>
//         </div>
//         <button className="submit" type="submit" disabled={loading}>
//           {loading ? "Processing..." : isLogin ? 'Sign in' : 'Register'}
//         </button>
//         <p className="toggle-link">
//           {isLogin ? "No account?" : "Already have an account?"}
//           <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(!isLogin); }}>
//             {isLogin ? 'Sign up' : 'Sign in'}
//           </a>
//         </p>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//     </div>
//   );
// };

// export default AuthForm;




import React, { useState } from 'react';
import { auth, db } from '../firebase';  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; 
import { useNavigate } from 'react-router-dom';
import './SignInForm.css';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/'); 
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: fullName });
        await addDoc(collection(db, 'users'), {
          uid: userCredential.user.uid, 
          fullName: fullName,
          email: email,
          createdAt: new Date(),
        });
        navigate('/');  
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <p className="form-title">{isLogin ? "Please Log In As Admin" : "Please Register as Admin"}</p>
      
      {!isLogin && (
        <div className="input-container">
          <label>Full Name</label>
          <div className="inputForm">
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your Full Name"
              required 
            />
            <svg className="icon-right" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 12c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4 1.791 4 4 4zm0 2c-5.523 0-10 4.477-10 10h20c0-5.523-4.477-10-10-10z" />
            </svg>
          </div>
        </div>
      )}
      
      <div className="input-container">
        <label>Email</label>
        <div className="inputForm">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
            required 
          />
          <svg className="icon-right" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0 8 8 0 00-8-8m4.5 6A9 9 0 0012 21" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
          </svg>
        </div>
      </div>
      
      <div className="input-container">
        <label>Password</label>
        <div className="inputForm">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
            required 
          />
          <svg className="icon-right" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round"></path>
          </svg>
        </div>
      </div>
      
      <div className="flex-row">
        <div className="checkbox-container">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <span className="span">Forgot password?</span>
      </div>
      
      <button className="button-submit" type="submit" disabled={loading}>
        {loading ? "Processing..." : isLogin ? 'Sign In' : 'Register'}
      </button>
      
      <p className="sign-up">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span className="span" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
      
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AuthForm;
