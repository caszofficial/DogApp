import React from 'react'
import { useDispatch } from 'react-redux'
import {  useState } from 'react'
import { getBreedsRace } from '../actions/actions';
import styles from './Buscador.module.css'

function Buscador() {
    const [busqueda, setBusqueda] = useState('');

    const handleChange = (b) => {
        setBusqueda(b)
    }

    // function buscar(busqueda) {
    //     getBreedsRace(busqueda)
    // }

    const dispatch = useDispatch()


   

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getBreedsRace(busqueda))
    }

    // const breed = useSelector((state) => state.breeds)

    return (
        <div className={styles.main}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <input
                        type='text'
                        // value={busqueda}
                        placeholder='Search Breed'
                        onChange={(e) => handleChange(e.target.value)}
                    />
                </div>
            </form>
        </div>
    );
}

export default Buscador
