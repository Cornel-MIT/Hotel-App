// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import PaymentForm from './services/PaymentForm';

// const stripePromise = loadStripe('your_publishable_key');

// function App() {
//   return (
//     <Elements stripe={stripePromise}>
//       <PaymentForm />
//     </Elements>
//   );
// }

// export default App;


// import React from 'react';
// import { Route, Routes, Navigate } from 'react-router-dom';
// import AdminNav from './admin/Nav';
// import UserNav from './user/Nav'; 
// import AdminHome from './admin/Home';
// import UserHome from './user/Home'; 
// import Bookings from './admin/Bookings';
// import AddRooms from './admin/AddRooms';
// import Hotels from './admin/Hotels';
// import Profile from './admin/Profile';
// import Settings from './admin/Settings';
// import AuthForm from './admin/AuthForm';
// import RoomDetails from './user/RoomDetails'; 
// import PrivateRoute from './auth/PrivateRoute';
// import { useAuth } from './auth/useAuth';
// import Header from './components/Header';
// import HeroSection from './components/HeroSection';
// import BestHotels from './components/BestHotels';
// import Footer from './components/Footer';
// import BookingForm from './user/BookingForm';
// import './App.css';
// import BookingPage from './components/BookingPage';
// import BookingSuccess from './components/BookingSuccess';

// const App = () => {
//     const { user } = useAuth();

//     return (
//         <Routes>
//             <Route path="/admin/*" element={
//                 <PrivateRoute>
//                     <div>
//                         <AdminNav />
//                         <Routes>
//                             <Route index element={<AdminHome />} />
//                             <Route path="bookings" element={<Bookings />} />
//                             <Route path="add-rooms" element={<AddRooms />} />
//                             <Route path="hotels" element={<Hotels />} />
//                             <Route path="profile" element={<Profile />} />
//                             <Route path="settings" element={<Settings />} />
//                         </Routes>
//                     </div>
//                 </PrivateRoute>
//             } />

//             <Route path="/user/*" element={
//                 <div>
//                     <UserNav />
//                     <Routes>
//                         <Route index element={
//                             <div className="App">
//                                 <Header />
//                                 <HeroSection />
//                                 <p className='availability'>Browse available rooms and make a booking for your next stay.</p>
//                                 <BookingForm />
//                                 <BestHotels />
//                                 <Footer />
//                             </div>
//                         } />
//                         <Route path="rooms/:roomId" element={<RoomDetails />} />
//                         <Route path="/booking" element={<BookingPage />} />
//                         <Route path="/BookingSuccess" element={<BookingSuccess />} />
//                     </Routes>
//                 </div>
//             } />

//             <Route path="/authform" element={<AuthForm />} />
//             <Route path="/" element={<Navigate to={user ? "/admin" : "/user"} replace />} />
//             <Route path="*" element={<Navigate to={user ? "/admin" : "/user"} replace />} />
//         </Routes>
//     );
// };

// export default App;


import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminNav from './admin/Nav';
import UserNav from './user/Nav'; 
import AdminHome from './admin/Home';
import Bookings from './admin/Bookings';
import AddRooms from './admin/AddRooms';
import Hotels from './admin/Hotels';
import Profile from './admin/Profile';
import Settings from './admin/Settings';
import AuthForm from './admin/AuthForm';
import RoomDetails from './user/RoomDetails'; 
import PrivateRoute from './auth/PrivateRoute';
import { useAuth } from './auth/useAuth';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BestHotels from './components/BestHotels';
import Footer from './components/Footer';
import BookingForm from './user/BookingForm';
import './App.css';
import BookingPage from './components/BookingPage';
import BookingSuccess from './components/BookingSuccess';
import PaymentPage from './components/PaymentPage';

const App = () => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route path="/admin/*" element={
                <PrivateRoute>
                    <div>
                        <AdminNav />
                        <Routes>
                            <Route index element={<AdminHome />} />
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="add-rooms" element={<AddRooms />} />
                            <Route path="hotels" element={<Hotels />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="settings" element={<Settings />} />
                        </Routes>
                    </div>
                </PrivateRoute>
            } />

            <Route path="/user/*" element={
                <div>
                    <UserNav />
                    <Routes>
                        <Route index element={
                            <div className="App">
                                <Header />
                                <HeroSection />
                                <p className='availability'>Browse available rooms and make a booking for your next stay.</p>
                                <BookingForm />
                                <BestHotels />
                                <Footer />
                            </div>
                        } />
                        <Route path="rooms/:roomId" element={<RoomDetails />} />
                        <Route path="booking" element={<BookingPage />} />
                        <Route path="booking-success" element={<BookingSuccess />} />
                        <Route path="booking/payment" element={<PaymentPage />} />
                    </Routes>
                </div>
            } />

            <Route path="/authform" element={<AuthForm />} />
            <Route path="/" element={<Navigate to={user ? "/admin" : "/user"} replace />} />
            <Route path="*" element={<Navigate to={user ? "/admin" : "/user"} replace />} />
        </Routes>
    );
};

export default App;