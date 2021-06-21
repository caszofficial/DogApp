import React from 'react'
import styles from './Nav.module.css'

function Nav() {
    return (
        <div>
            <ul className={styles.navigation}>
                <li><a href="/">Home</a></li>
                <li><a href="/home">Dogs</a></li>
                <li><a href="/createBreed">Create A Dog</a></li>
            </ul>
        </div>
    )
}

export default Nav
