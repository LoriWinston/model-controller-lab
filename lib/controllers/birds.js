const { Router } = require("express");
const Bird = require("../models/Bird");
const pool = require('../utils/pool');

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const newBird = await Bird.insert(req.body);

            res.send(newBird);

        } catch (err) {
            
            next(err)
        }
    })

    .get('/', async (req, res, next) => {
        try {
            const birds = await Bird.find();
            res.send(birds);
        } catch (err) {

            next(err);
        }
    })

    .get('/:id', async (req, res, next) => {
        try {
            const bird = await Bird.findById(req.params.id);
            res.send(bird);
        } catch (err) {

            next(err);
        }
    })

    .put('/:id', async (req, res, next) => {
        try {
            const bird = await Bird.update(req.params.id, req.body);
            res.send(bird);

        } catch(err) {
            next(err)
        }
    })
    .delete('/:id', async (req, res, next) => {
        try {
            const bird = await Bird.delete(req.params.id);
            res.send(bird);
        } catch(err) {
            next(err)
        }
    })