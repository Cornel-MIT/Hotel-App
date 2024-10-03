import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import RoomCard from './RoomCard';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './RoomsList.css'; 

const RoomsList = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(db, 'rooms');
        const roomSnapshot = await getDocs(roomsCollection);
        const roomList = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRooms(roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="rooms-list">
      <h1>Royella's Rooms & Suites</h1>
      <p>Proactively morph optimal infomediaries rather than accurate expertise. Intrinsically progressive resources rather than resource-leveling.</p>

      <Row xs={1} md={3} className="g-4">
        {rooms.map(room => (
          <Col key={room.id}>
            <RoomCard room={room} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RoomsList;
