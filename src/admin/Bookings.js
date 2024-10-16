import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import './AdminBookedRooms.css';

const Bookings = () => {
  const [bookedRooms, setBookedRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookedRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookedRooms'));
        const roomData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBookedRooms(roomData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booked rooms:', error);
        setLoading(false);
      }
    };

    fetchBookedRooms();

    const intervalId = setInterval(updateCountdown, 86400000);

    return () => clearInterval(intervalId);
  }, []);

  const updateCountdown = async () => {
    const updatedRooms = await Promise.all(
      bookedRooms.map(async (room) => {
        const newDaysRemaining = room.daysRemaining - 1;
        if (newDaysRemaining <= 0) {
          await deleteDoc(doc(db, 'bookedRooms', room.id));
          const roomRef = doc(db, 'rooms', room.roomId);
          await updateDoc(roomRef, {
            availableDays: increment(room.numberOfDays)
          });
          return null;
        } else {
          const roomRef = doc(db, 'bookedRooms', room.id);
          await updateDoc(roomRef, { daysRemaining: newDaysRemaining });
          return { ...room, daysRemaining: newDaysRemaining };
        }
      })
    );

    setBookedRooms(updatedRooms.filter(room => room !== null));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-booked-rooms">
      <h2>Currently Booked Rooms</h2>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Days Remaining</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomName}</td>
              <td>{room.checkIn}</td>
              <td>{room.checkOut}</td>
              <td>{room.daysRemaining}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
