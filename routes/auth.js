const router = require('express').Router()
const User = require('../models/User')

//Validation with JOI
const Joi = require('joi')
const e = require('express')

const schema = Joi.object({

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

router.post('/register',(req, res) => {
    const { error,value } = schema.validate(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    const user = new User(req.body)
    try {
        user.save()
        res.send({message: 'User saved successfully'})
    }
    catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;
