import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = () => {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [rooms, setRooms] = useState(2);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ checkIn, checkOut, rooms, adults, children });
    };

    return (
        <div className="booking-form">
            <form onSubmit={handleSubmit} className="booking-form-container">
                <div className="form-group">
                    <label className='labels'>Check In</label>
                    <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder="yyyy/mm/dd"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className='labels'>Check Out</label>
                    <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        placeholder="yyyy/mm/dd"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className='labels'>Rooms</label>
                    <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
                        <option value={1}>1 Room</option>
                        <option value={2}>2 Rooms</option>
                        <option value={3}>3 Rooms</option>
                        <option value={4}>4 Rooms</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className='labels'>Guests</label>
                    <div className="guests">
                        <select value={adults} onChange={(e) => setAdults(e.target.value)}>
                            <option value={1}>1 Adult</option>
                            <option value={2}>2 Adults</option>
                            <option value={3}>3 Adults</option>
                        </select>

                        <select value={children} onChange={(e) => setChildren(e.target.value)}>
                            <option value={0}>0 Children</option>
                            <option value={1}>1 Child</option>
                            <option value={2}>2 Children</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="checkout-btn">Check Availability</button>
            </form>
        </div>
    );
};

export default BookingForm;
