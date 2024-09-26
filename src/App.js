// import React from 'react';
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import BestHotels from './components/BestHotels';
// import Footer from './components/Footer';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <HeroSection />
//       <BestHotels />
//       <Footer />
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Nav from './admin/Nav';
import Home from './admin/Home';
import Bookings from './admin/Bookings';
import AddRooms from './admin/AddRooms';
import Hotels from './admin/Hotels';
import Profile from './admin/Profile';
import Settings from './admin/Settings';
import AuthForm from './admin/AuthForm';
import PrivateRoute from './auth/PrivateRoute';
import { useAuth } from './auth/useAuth'; 
import './App.css'; 

const App = () => {
    const { user } = useAuth(); 

    return (
        <>
            {user && <Nav />} 
            <Routes>
                <Route path="/authform" element={<AuthForm />} />

                <Route path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />
                <Route path="/bookings" element={
                    <PrivateRoute>
                        <Bookings />
                    </PrivateRoute>
                } />
                <Route path="/add-rooms" element={
                    <PrivateRoute>
                        <AddRooms />
                    </PrivateRoute>
                } />
                <Route path="/hotels" element={
                    <PrivateRoute>
                        <Hotels />
                    </PrivateRoute>
                } />
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                } />
                <Route path="/settings" element={
                    <PrivateRoute>
                        <Settings />
                    </PrivateRoute>
                } />

                <Route path="*" element={<Navigate to={user ? "/" : "/authform"} replace />} />
            </Routes>
        </>
    );
};

export default App;