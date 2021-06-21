
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTemp } from '../actions/actions';
import axios from 'axios';
import styles from './CreateBreed.module.css'
import Nav from './Nav'

function validateForm(input) {
    let errors = {};
    if (!input.name) {
        errors.name = "You must type a name";
    } else {
        errors.name = "";
    }
    if (!input.weight) {
        errors.weight = "Type a valid weight range";
    } else if (!/\d{1,2} - \d{1,2}/g.test(input.weight)) {
        errors.weight =
            "Weight must have min-max values. Example: '25-30'";
    } else {
        errors.weight = "";
    }

    if (!input.height) {
        errors.height = "Type a valid height range";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.height)) {
        errors.height =
            "Height must have min-max values. Example: '25-30'";
    } else {
        errors.height = "";
    }
    if (!input.age) {
        errors.age = "Type a valid life span";
    } else if (!/\d{1,2}-\d{1,2}/g.test(input.age)) {
        errors.age =
            "Life span must have min-max values. Example: '25-30'";
    } else {
        errors.age = "";
    }
    return errors;
};


function CreateBreed() {

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [input, setInput] = useState({
        name: '',
        height: '',
        weight: '',
        age: '',
        temperament: []
    })

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTemp())
    }, [])

    const temperaments = useSelector(state => state.temps)

    function handleInput(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validateForm({
                ...input,
                [e.target.name]: e.target.value,
            })
        );
    }

    function onFocus(ev) {
        setTouched({
            ...touched,
            [ev.target.name]: true,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (
            !errors.name &&
            !errors.weight &&
            !errors.height &&
            !errors.age
        ) {
            axios.post('http://localhost:3001/dog', input)
            setInput({
                name: '',
                height: '',
                weight: '',
                age: '',
                temperament: []
            })
            alert("Your breed has been created successfully")
        } else {
            alert('Something went wrong. Please try again.')
        }
    }

    function handleSelect(e) {
        if (input.temperament.includes(parseInt(e.target.value))) {
            alert('You already selected this temperament. Try again.')
        } else if (input.temperament.length >= 3) {
            alert('You can select up to 3 temperaments.')
        } else {
            setInput((prev) => ({ ...prev, temperament: [...prev.temperament, parseInt(e.target.value)] }))
        }
    }

    function deleteTemp(e, t) {
        setInput((prev) => ({ ...prev, temperament: prev.temperament.filter(temp => temp !== parseInt(t)) }))
    }


    function getNames(arr) {
        let names = [];
        temperaments?.forEach((t) => {
            arr.forEach((id) => {
                if (parseInt(id) === t.id) {
                    names.push(t.name)
                }
            })

        })
        return names;
    }

    return (
        <div className={styles.main}>
            <div className={styles.nav}>
                <Nav />
            </div>
            <br />

            <form onSubmit={handleSubmit}>

                <div className={styles.cards}>
                    <div>
                        <p className={styles.inputNames}>Name</p>

                        <input
                            type="text"
                            name="name"
                            placeholder="Breed name"
                            onChange={handleInput}
                            required='required'
                            onFocus={onFocus}
                            value={input.name}

                        ></input>
                        <br />
                        {errors.name && touched.name && (
                            <p className={styles.errorMsg}>{errors.name}</p>
                        )}
                    </div>
                    <br />

                    <div >
                        <p className={styles.inputNames}>Weight</p>
                        <input
                            type="text"
                            name="weight"
                            placeholder="Breed weight"
                            onChange={handleInput}
                            required='required'
                            onFocus={onFocus}
                            value={input.weight}

                        ></input>
                        {errors.weight && touched.weight && (
                            <p className={styles.errorMsg}>{errors.weight}</p>
                        )}
                    </div>
                    <br />

                    <div >
                        <p className={styles.inputNames}>Height</p>
                        <input
                            type="text"
                            name="height"
                            placeholder="Breed height"
                            onChange={handleInput}
                            required='required'
                            onFocus={onFocus}
                            value={input.height}

                        ></input>
                        {errors.height && touched.height && (
                            <p className={styles.errorMsg}>{errors.height}</p>
                        )}
                    </div>
                    <br />
                    <div >
                        <p className={styles.inputNames}>Life Span</p>
                        <input
                            type="text"
                            name="age"
                            placeholder="Breed life span"
                            onChange={handleInput}
                            required='required'
                            onFocus={onFocus}
                            value={input.age}

                        ></input>
                        {errors.age && touched.age && (
                            <p className={styles.errorMsg}>{errors.age}</p>
                        )}
                    </div>

                    <br />

                    <div >
                        <p className={styles.inputNames}>Temperaments</p>
                        <select name="temperaments" onChange={(e) => handleSelect(e)} required value={input.temperament} className={styles.dropdown}>
                            <option>
                                Select
                            </option>

                            {temperaments?.map((e) => (
                                <option value={e.id} key={e.id}>{e.name}</option>)
                            )}
                        </select>
                    </div>
                    <div className={styles.tempContainer}>
                        {
                            input.temperament.map(t => (
                                <p id={t} className={styles.temp}>
                                    {getNames([t])}
                                    <button onClick={(e) => deleteTemp(e, t)} className={styles.closeBtn}>x</button>
                                </p>
                            ))
                        }
                    </div>
                    <br />
                    <br />
                    <button type='submit' className={styles.btnSubmit}>
                        Create breed
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateBreed