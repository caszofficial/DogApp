import React, { useEffect, useState } from 'react'
import {filter, getHeavy, getLight, getTemp, getZA, getSource, getAZ } from '../actions/actions';
import { useDispatch, useSelector } from 'react-redux'
import styles from './Order.module.css'

function Order() {

    const [selectedTemp, setSelectedTemp] = useState('')
    const [tempToFilterBy, setTempToFilterBy] = useState([])

    const dispatch = useDispatch()




    function orderDes(e) {
        e.preventDefault();
        dispatch(getZA())
    }

    function orderAsc(e) {
        e.preventDefault();
        dispatch(getAZ())
    }

    function orderLight(e) {
        e.preventDefault();
        dispatch(getLight())
    }

    function orderHeavy(e) {
        e.preventDefault();
        dispatch(getHeavy())
    }

    useEffect(() => {
        dispatch(getTemp())
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setTempToFilterBy([...tempToFilterBy, selectedTemp]);
        handleClick()
    }

    function handleChange(e) {
        setSelectedTemp(e.target.value)
    }

    function handleClick() {
        let filtered = []
        breed?.forEach((b) => {
            if (b.id.length) {
                b.temperaments.map(t =>
                    t.name === selectedTemp ? filtered.push(b) : null
                )
            } else {
                console.log('holaaaa', b.temperament)
                if (b.temperament?.includes(selectedTemp)) {
                    filtered.push(b)
                } else {
                    console.log('nada')
                }

                
             

            
        }})

        dispatch(filter(filtered))
    }

    function handleSelect(e){
        dispatch(getSource(e.target.value))
    }


    const temp = useSelector(state => state.temps)
    const breed = useSelector(state => state.breeds)



    return (
        <div  className={styles.mainDiv}>
            <div className={styles.alphabetical}>
                <label>Order by: name</label>
                <br />

                <button className={styles.btn} onClick={(e) => orderAsc(e)}>A-Z</button>
                <button className={styles.btn} onClick={(e) => orderDes(e)}>Z-A</button>

            </div>



            <div  className={styles.weight}>
                <label>Order by: weight</label>
                <br />

                <button className={styles.btn} onClick={(e) => orderLight(e)}>Weight - to +</button>
                <button className={styles.btn} onClick={(e) => orderHeavy(e)}>Weight + to -</button>

            </div>


            <div  className={styles.temperaments}>
                <form onSubmit={handleSubmit} >
                    <label>Filter by temps </label><br />
                    <select onChange={handleChange} name="temperaments" value={selectedTemp} className={styles.dropdown}>
                        {temp?.map(t => {
                            return (
                                <option value={t.name}>{t.name}</option>
                            )
                        })}
                    </select>
                    
                    <button type="submit" className={styles.btn}> Filter</button>
                </form>
            </div>

            

           <div className={styles.source}>
               <form>
                   <label>Source</label>
                   <br />
                   <select onChange={handleSelect} className={styles.dropdown}>
                       <option value="''">Select</option>
                       <option value="DB">DB</option>
                       <option value="API">API</option>
                       <option value="ALL">ALL</option>
                   </select>
               </form>
           </div>

        </div>
    )
}

export default Order
