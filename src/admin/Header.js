import React from 'react';
import logo from '../media/Logo2.png';

const Header = () => {
    return (
        <header>
            <div class="logosec">
              <img src={logo} alt="Hotel Logo" />
            </div>

            <div class="searchbar">
                <input type="text"
                    placeholder="Search" />
                <div class="searchbtn">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                        class="icn srchicn"
                        alt="search-icon" />
                </div>
            </div>

            <div class="message">
                <div class="circle"></div>
                <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
                    class="icn"
                    alt="" />
                <div class="dp">
                    <img src=
"https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                        class="dpicn"
                        alt="dp" />
                </div>
            </div>

        </header>
    );
};

export default Header;