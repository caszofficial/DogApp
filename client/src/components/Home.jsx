import React from 'react'
import DogCards from './DogCards'
import Footer from './Footer'
import Order from './Order'
import Nav from './Nav'
import styles from './Home.module.css'


function Home() {



    return (

        <div className={styles.main}>
            <div>
                <Nav />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div>
                <Order />
            </div>
            <div>
                <DogCards />
            </div>
            <br />
            <br />
            <br />
            <br />
            <Footer/>
        </div>


    )
}

export default Home

