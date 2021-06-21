import React from 'react'
import Buscador from './Buscador'
import DogCards from './DogCards'
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
                <div>
                    <Buscador />
                    <br />
                    <br />
                    <Order/>
                </div>
                <div>
                    <DogCards />
                </div>
            </div>
         

    )
}

export default Home

