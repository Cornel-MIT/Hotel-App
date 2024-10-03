import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => {
    return (
        <nav>
            <Link to="/user">Home</Link>
            <Link to="/user/rooms">Browse Rooms</Link>

        </nav>
    );
};

export default UserNav;