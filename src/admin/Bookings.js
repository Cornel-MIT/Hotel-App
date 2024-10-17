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
        if (room.status !== 'approved') return room;

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

  const approveBooking = async (bookingId) => {
    try {
      const bookingRef = doc(db, 'bookedRooms', bookingId);
      await updateDoc(bookingRef, { status: 'approved' });
      
      setBookedRooms(bookedRooms.map(room => 
        room.id === bookingId ? { ...room, status: 'approved' } : room
      ));
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const declineBooking = async (bookingId, roomId, numberOfDays) => {
    try {
      await deleteDoc(doc(db, 'bookedRooms', bookingId));

      const roomRef = doc(db, 'rooms', roomId);
      await updateDoc(roomRef, {
        availableDays: increment(numberOfDays)
      });

      setBookedRooms(bookedRooms.filter(room => room.id !== bookingId));
    } catch (error) {
      console.error('Error declining booking:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-booked-rooms">
      <h2>Room Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Days Remaining</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookedRooms.map((room) => (
            <tr key={room.id}>
              <td>{room.roomName}</td>
              <td>{room.checkIn}</td>
              <td>{room.checkOut}</td>
              <td>{room.daysRemaining}</td>
              <td>{room.status || 'pending'}</td>
              <td>
                {room.status !== 'approved' && (
                  <>
                    <button onClick={() => approveBooking(room.id)}>Approve</button>
                    <button onClick={() => declineBooking(room.id, room.roomId, room.numberOfDays)}>Decline</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;