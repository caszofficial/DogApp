// import axios from 'axios';
import React, { useEffect } from 'react'
// import { useSelector } from 'react-redux';
import { useSelector, useDispatch } from 'react-redux'
import {  getById } from '../actions/actions'
import Nav from './Nav'
import styles from './DogDetail.module.css'
import LazyLoad from 'react-lazyload'

function DogDetail({ match }) {


    const { id } = match.params
    console.log("12", id)


    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getById(id))
    }, [])

    const breed = useSelector(state => state.breedsDetail)

    if (typeof breed?.id === 'string') {
        return (
            <div className={styles.main}>
                <div>
                    <Nav />
                </div>
                <br />
                <br />
                <br />
    
                <LazyLoad>
                <div className={styles.dogDetail}>
                    <br />
                    <p className={styles.dogName}><br />{breed?.name}</p>
    
                    <br />
                    <br />

                    <img src="https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg" alt="Not Found" width="550px" height="300px" />

                    <br />
                    <br />

                    <p className={styles.dogTemp}>Temperament:</p>
                    {console.log(breed)}
                    {breed?.temperaments.map(t=> {
                        return (
                            <p className={styles.tempBD}>{t.name}</p>
                        )
                    })}

                    <br />

                    <p className={styles.dogWeight}>Peso: <br /> {breed?.weight} Kg.</p>
    
                    <br />
    
                    <p className={styles.dogHeight}>Altura: <br />{breed?.height} cm.</p>
    
                    <br />
    
                    <p className={styles.dogLife}>Años de vida: <br /> {breed?.age}</p>
    
                </div>
                </LazyLoad>
            </div>
    
        )
    } else {
        return (
            <div className={styles.main}>
                <div>
                    <Nav />
                </div>
                <br />
                <br />
                <br />
    
                <LazyLoad>
                <div className={styles.dogDetail}>
                    <br />
                    <p className={styles.dogName}><br />{breed?.name}</p>
    
                    <br />
                    <br />
    
                    {(breed?.id === 15 || breed?.id === 125 || breed?.id === 212) ? 
                        <img src={'https://cdn2.thedogapi.com/images/' + breed?.reference_image_id + '.png'} alt="Not Found" className={styles.dogImage} />
                     : 
                        <img src={'https://cdn2.thedogapi.com/images/' + breed?.reference_image_id + '.jpg'} alt="Not Found" className={styles.dogImage} />
                    }
    
                    <br />
                    <br />
    
                    <p className={styles.dogTemp}>Temperament: <br /> {breed?.temperament}</p>
    
                    <br />
    
                    <p className={styles.dogWeight}>Peso: <br /> {breed?.weight.metric} Kg.</p>
    
                    <br />
    
                    <p className={styles.dogHeight}>Altura: <br />{breed?.height.metric} cm.</p>
    
                    <br />
    
                    <p className={styles.dogLife}>Años de vida: <br /> {breed?.life_span}</p>
    
                </div>
                </LazyLoad>
            </div>
    
        )
    }

    
}
// const mapStateToProps = state => {
//     return {
//         breedsDetail: state.breedsDetail,

//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         getById: id => {
//             dispatch(getById(id))
//         }
//     }
// }

export default DogDetail
// export default connect (mapStateToProps, mapDispatchToProps)(DogDetail)
