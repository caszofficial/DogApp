import React from 'react'
import styles from './Landing.module.css'
import LazyLoad from 'react-lazyload'
import {Link} from 'react-router-dom'

function Landing() {
    return (
        <LazyLoad>
            <div className={styles.divMain}>


                <div className={styles.card}>

                        <label><h1>Dog App</h1></label>
                    <Link to='/home' style={{ color: "black", textDecoration: "none" }}>
                        <button className={styles.btnStart}>
                            Start
                        </button>
                    </Link>
                </div>

            </div>
        </LazyLoad>
    )
}

export default Landing
