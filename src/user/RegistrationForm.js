// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from '../firebase';  
// import './Styles/RegistrationForm.css'; 

// const RegistrationForm = () => {
//     const [formData, setFormData] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         password: '',
//         confirmPassword: ''
//     });

//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const auth = getAuth();

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const { firstName, lastName, email, password, confirmPassword } = formData;

//         if (password !== confirmPassword) {
//             setError("Passwords do not match");
//             return;
//         }

//         try {
 
//             const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//             const user = userCredential.user;

//             await setDoc(doc(db, "users", user.uid), {
//                 firstName,
//                 lastName,
//                 email,
//                 createdAt: new Date().toISOString(),
//             });

//             navigate('/user/profile');
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <form className="form" onSubmit={handleSubmit}>
//             <p className="title">Register</p>
//             <p className="message">Signup now and get full access to our app.</p>
//             {error && <p className="error">{error}</p>}
//             <div className="flex">
//                 <label>
//                     <input
//                         required
//                         placeholder=""
//                         type="text"
//                         className="input"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleInputChange}
//                     />
//                     <span>Firstname</span>
//                 </label>
//                 <label>
//                     <input
//                         required
//                         placeholder=""
//                         type="text"
//                         className="input"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleInputChange}
//                     />
//                     <span>Lastname</span>
//                 </label>
//             </div>
//             <label>
//                 <input
//                     required
//                     placeholder=""
//                     type="email"
//                     className="input"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                 />
//                 <span>Email</span>
//             </label>
//             <label>
//                 <input
//                     required
//                     placeholder=""
//                     type="password"
//                     className="input"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleInputChange}
//                 />
//                 <span>Password</span>
//             </label>
//             <label>
//                 <input
//                     required
//                     placeholder=""
//                     type="password"
//                     className="input"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                 />
//                 <span>Confirm password</span>
//             </label>
//             <button type="submit" className="submit">Submit</button>
//             <p className="signin">
//                 Already have an account? <Link to="/login">Sign In</Link>
//             </p>
//         </form>
//     );
// };

// export default RegistrationForm;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';  // Ensure your Firebase is correctly imported
import './Styles/RegistrationForm.css';

const RegistrationForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const storage = getStorage();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Upload the profile picture to Firebase Storage
            const imageRef = ref(storage, `profilePictures/${user.uid}`);
            await uploadBytes(imageRef, profilePicture);
            const photoURL = await getDownloadURL(imageRef);

            // Save user data to Firestore
            await setDoc(doc(db, 'users', user.uid), {
                firstName,
                lastName,
                email,
                photoURL
            });

            navigate('/user/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <p className="title">Register</p>
            <p className="message">Signup now and get full access to our app.</p>
            {error && <p className="error">{error}</p>}
            <div className="flex">
                <label>
                    <input 
                        required 
                        type="text" 
                        className="input" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <span>Firstname</span>
                </label>
                <label>
                    <input 
                        required 
                        type="text" 
                        className="input" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <span>Lastname</span>
                </label>
            </div>
            <label>
                <input 
                    required 
                    type="email" 
                    className="input" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <span>Email</span>
            </label>
            <label>
                <input 
                    required 
                    type="password" 
                    className="input" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <span>Password</span>
            </label>
            <label>
                <input 
                    required 
                    type="password" 
                    className="input" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span>Confirm password</span>
            </label>
            <label>
                <input 
                    type="file" 
                    className="input" 
                    accept="image/*"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                />
                <span>Profile Picture</span>
            </label>
            <button type="submit" className="submit">Submit</button>
            <p className="signin">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
};

export default RegistrationForm;

