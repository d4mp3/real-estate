import React from 'react';
import styles from './Home.module.css';

import city from '../Assets/city.jpg';

function Home() {
	return (
		<>
			<img src={city} className={styles.image} alt="City" />
			<div className={styles.wrapper}>
				<h1 class={styles.heading}>
					FIND YOUR <span style={{ color: 'brown' }}>PROPERTY</span> ON
					<br />THE REAL ESTATE
				</h1>
				<button class={styles.btn}>SEE ALL PROPERTIES</button>
			</div>
		</>
	);
}

export default Home;