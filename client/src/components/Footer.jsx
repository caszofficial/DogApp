import React from 'react'
import styles from './Footer.module.css'


function Footer() {
    return (
        <div className={styles.mainFooter}>
            <div className={styles.about}>
                <p>
                    DogApp
                    <br />
                    Santiago Cañas Zapata
                    <br />
                    2021
                    <br />
                    santiagozapata07@gmail.com
                </p>
            </div>

            <div className={styles.social}>

                <a href="https://github.com/caszofficial" target="blank">
                    <i class="fab fa-github" ></i>
                </a>

                <a href="https://www.instagram.com/caszofficial/" target="blank">
                    <i class="fab fa-instagram"></i>
                </a>

                <a href="https://www.linkedin.com/in/santiago-ca%C3%B1as-zapata-b45b101bb/" target="blank">
                    <i class="fab fa-linkedin"></i>
                </a>

            </div>
        </div>
    )
}

export default Footer
