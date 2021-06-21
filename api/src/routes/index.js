require('dotenv').config();
const { Router } = require('express');
const { APIURL, APIURL2, APIKEY } = process.env
const axios = require('axios')
const { Dog, Temperament } = require('../db');
const { v4: uuidv4 } = require('uuid');
const { Sequelize, Op } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();



router.get('/dogs',

    async (req, res, next) => {
        const { q } = req.query

        if (!q) {
            try {
                const database = Dog.findAll({
                    include: {
                        model: Temperament
                    }
                })
                const api = await axios.get(`${APIURL}?apikey=${APIKEY}`)



                Promise.all([database, api])
                    .then(results => {
                        const [dataDB, dataApi] = results
                        const response = dataDB.concat(dataApi.data)
                        res.send(response)
                    })

            } catch (error) {
                next(error)
            }
        } else {
            try {

                const database = Dog.findAll({
                    where: {
                        name: q
                    }
                })
                const api = await axios.get(`${APIURL2}?q=${q}&apikey=${APIKEY}`)



                Promise.all([database, api])
                    .then(results => {
                        const [dataDB, dataApi] = results
                        const response = dataDB.concat(dataApi.data)
                        if (response.length === 0) {
                            res.send("Cannot find breed")
                        }
                        else {
                            res.send(response)
                            console.log(response)
                        }
                    })

            } catch (error) {
                next(error)
            }
        }

    })


router.get('/dogs/:id', async (req, res, next) => {
    //I request the id from Params
    const { id } = req.params
    //I do a request of the dog with the id passed by params
    //if id.lengt is less than 4 it would return de id from the api
    if (id.length < 4) {

        await axios.get(`${APIURL}/${id}?apikey=${APIKEY}`)
            .then(dogs => res.send(dogs.data))
            //i catch and handle any error y could have
            .catch(error => next(error))

        //if id y larger than 4 it would be lookin for the id in my db which is uuid
    } else {
        Dog.findOne({
            where: {
                id: id
            },
            include: {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
            // then i send my request with the response(resp) from DB
            .then(resp => res.send(resp))
            //i catch and handle any error y could have
            .catch(err => next(err))
    }
})

router.get('/temperaments', async (req, res, next) => {
    try {
        const dog = await axios.get(`${APIURL}?apikey=${APIKEY}`)
        const doggy = dog.data.map(t => {
            return t.temperament
        })
        const otr = doggy.map(str => {
            return str && str.split(', ')
        })

        const concat = otr.flat()

        const filtrao = concat.filter((str, i) => {
            return concat.indexOf(str) === i
        }).sort((a, b) => {
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })

        const temp = filtrao.map(c => {
            return {
                name: c || 'Could not get name'
            }
        })


        const datos = await Temperament.bulkCreate(temp)

        res.send(datos)

    } catch (error) {
        next(error)
    }

})

router.post('/dog', async (req, res, next) => {
    let { name, height, age, weight, temperament } = req.body
    try {
        await Dog.create({
            id: uuidv4(),
            name,
            height,
            age,
            weight,

        })


            .then(breed => breed.addTemperament(temperament))



    } catch (error) {
        next(error)
    }
})




module.exports = router;
