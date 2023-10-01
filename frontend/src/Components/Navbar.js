import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.navbar}>
      <div className={styles.leftSection}>
        <button onClick={() => navigate("/")}> 
        REAL ESTATE
        </button>
      </div>
      <div className={styles.middleSection}>
        <button onClick={() => navigate("/listings")}>
          Listings
        </button>
        <button onClick={() => navigate("/agencies")}>
          Agencies
        </button>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.addBtn} onClick={() => navigate("/addproperty")}>
          Add Property
        </button>
        <button className={styles.loginBtn} onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Navbar;
