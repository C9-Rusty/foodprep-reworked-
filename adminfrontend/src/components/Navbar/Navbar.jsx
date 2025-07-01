import React, { useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setAdmin, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
    setAdmin(false);
    navigate('/login');
  };

  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt='Logo' />
      <div className='navbar-right'>
        <button className='logout-btn' onClick={handleLogout}>
          Logout
        </button>
        <img className='profile' src={assets.profile_image} alt='Profile' />
      </div>
    </div>
  );
};

export default Navbar;
