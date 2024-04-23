import React, { useState } from 'react';

function DropdownMenu({ changeUserHandler }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(1);

  const toggleDropdown = () => setIsOpen(isOpen =>!isOpen);
  

  const handleClick = (userId) => {
    // console.log(userId + ' clicked');
    setIsOpen(false);
    changeUserHandler(userId);
    setCurrentUserId(userId);
  }

  return (
    <div className="navbar">
      {isOpen && (
        <ul className="dropdown-content">
          <li 
            onClick={() => handleClick(1)} 
            className="dropdown-item"
            >User 1</li>
          <li 
           onClick={() => handleClick(2)} 
           className="dropdown-item">User 2</li>
          <li onClick={() => handleClick(3)}  className="dropdown-item">User 3</li>
        </ul>
      )}
      <button onClick={toggleDropdown} className="dropdown-button">
        user {currentUserId}
      </button>
      
    </div>
  );
}

export { DropdownMenu };
