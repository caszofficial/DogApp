import React from 'react'
import styles from './Nav.module.css'
import Buscador from './Buscador'

function Nav() {
    return (
        <div className={styles.navBar}>
            <div className={styles.logo}>
                <p>Dog App</p>
                <i class="fas fa-paw"></i>
            </div>
            <ul className={styles.navigation}>
                <li><a href="/">Home</a></li>
                <li><a href="/home">Dogs</a></li>
                <li><a href="/createBreed">Create A Dog</a></li>
            </ul>
            <div className={styles.buscador}>
                <Buscador />
            </div>
        </div>
    )
}

export default Nav
