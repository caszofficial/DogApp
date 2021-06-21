
import styles from './DogCards.module.css'
import LazyLoad from 'react-lazyload'

import React from 'react';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBreeds } from '../actions/actions';
import image from '../perrito_panzon.jpg'


import { Link } from 'react-router-dom';




function DogCards() {


    const breed = useSelector((state) => state.breeds);

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setitemsPerPage] = useState(8)
    const [pageNumberLimit, setpageNumberLimit] = useState(5)
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0)


    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id))


    }

    const pages = [];

    for (let i = 1; i <= Math.ceil(breed?.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = breed?.slice(indexOfFirstItem, indexOfLastItem);

    const renderPageNumbers = pages.map(number => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? styles.active : null}
                >

                    {number}

                </li>
            )
        } else {
            return null;
        }

    })


    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getBreeds());
    }, []);



    const handleNext = () => {
        setCurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }

    const handlePrev = () => {
        setCurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    }


    const filteredBreeds = useSelector((state) => state.filter);


    function displayBreeds(array) {

        const breedsToDisplay = array
        console.log('holaaaa', breedsToDisplay)


        // if (!Array.isArray(breedsToDisplay)) {
        //     return (
        //     <div>
        //         <p className={styles.msgError}>We coul askjdlsadkjdaldlskdjlad</p>
        //         <img src={image} alt="Not Found"  height="400px" width="350px"/>
        //     </div>

        //     )
        // } else {
        //     return breedsToDisplay?.length ? (
        //         breedsToDisplay.map(d => {
        //             return (
        //                 <div>

        //                     <LazyLoad>
        //                         <Link to={`/dogs/${d.id}`} style={{ color: "black", textDecoration: "none" }}>

        //                             <br />
        //                             <div className={styles.cardContainer}>
        //                                 <div className={styles.cardName}>{d.name}</div>
        //                                 <br />

        //                                 {d.id.length ?

        //                                     <LazyLoad><img src='https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg' /></LazyLoad>

        //                                     :

        //                                     (d.id === 15 || d.id === 125 || d.id === 212) ?
        //                                         <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.png'} alt="Not Found" />
        //                                         :
        //                                         <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.jpg'} alt="Not Found" />



        //                                 }



        //                                 {d.id.length ? <div className={styles.cardTemperament} ><b>Temperaments:</b> <br />{d.temperaments.map(t => {
        //                                     return (
        //                                         <p>{t.name}</p>
        //                                     )
        //                                 })}</div> : <div className={styles.cardTemperament} ><b>Temperaments:</b> <br />{d.temperament}</div>}
        //                             </div></Link>
        //                     </LazyLoad>




        //                 </div >
        //             )
        //         })
        //     ) : null
        // }

        if (typeof breedsToDisplay === "string") {
            return (
                <div className={styles.cardError}>

                    <p className={styles.msgError}>We could not find the breed </p>
                    <br />
                    <img src={image} alt="Not Found" height="400px" width="350px" />
                </div>

            )
        } else {
            return breedsToDisplay?.length ? (
                breedsToDisplay.map(d => {
                    return (
                        <div>

                            <LazyLoad>
                                <Link to={`/dogs/${d.id}`} style={{ color: "black", textDecoration: "none" }}>

                                    <br />
                                    <div className={styles.cardContainer}>
                                        <div className={styles.cardName}>{d.name}</div>
                                        <br />

                                        {d.id.length ?

                                            <LazyLoad><img src='https://phantom-marca.unidadeditorial.es/252acdd64f48851f815c16049a789f23/resize/1320/f/jpg/assets/multimedia/imagenes/2021/04/19/16188479459744.jpg' /></LazyLoad>

                                            :

                                            (d.id === 15 || d.id === 125 || d.id === 212) ?
                                                <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.png'} alt="Not Found" />
                                                :
                                                <img src={'https://cdn2.thedogapi.com/images/' + d.reference_image_id + '.jpg'} alt="Not Found" />



                                        }



                                        {d.id.length ? <div className={styles.cardTemperament} ><b>Temperaments:</b> <br />{d.temperaments.map(t => {
                                            return (
                                                <p>{t.name}</p>
                                            )
                                        })}</div> : <div className={styles.cardTemperament} ><b>Temperaments:</b> <br />{d.temperament}</div>}
                                    </div></Link>
                            </LazyLoad>




                        </div >
                    )
                })

            ) :
                <div className={styles.containerLoading}>
                    <p className={styles.msgCharge}>Loading...</p>
                </div>
        }

    }

    return (
        <div>
            <br />
            <br />
            <br />
            <div>
                <ul className={styles.pagination}>
                    <li>
                        <button onClick={handlePrev}
                            disabled={currentPage === pages[0] ? true : false}>
                            Prev
                        </button>
                    </li>
                    {renderPageNumbers}
                    <li>
                        <button onClick={handleNext}
                            disabled={currentPage === pages[pages.length - 1] ? true : false}>
                            Next
                        </button>
                    </li>
                </ul>
            </div>

            
            
            <br />

            <div className={styles.main}>
                {filteredBreeds?.length > 0 ?
                    displayBreeds(filteredBreeds)
                    :
                    displayBreeds(currentItems)
                }
                {/* <Pagination breedsPerPage={breedsPerPage} totalBreeds={breeds.length} paginate={paginate} /> */}
            </div>

        </div>
    );
}
export default DogCards;
