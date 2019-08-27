const express = require('express');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const bodySchema = require('../restSchema/loginBodySchema').loginBodySchema;
const Joi = require('@hapi/joi');

const app = express();

app.post('/login', (req, res) => {
    let body = req.body;

    const result = Joi.validate(body, bodySchema);
    if (result.error) {
        return res.status(400).json({ ok: false, err: { message: 'Invalid schema' } });
    }

    User.findOne({ username: body.username, password: body.password }, (err, userDB) => {
        if (err) return res.status(500).json({ ok: false, err });
        if (!userDB) return res.status(404).json({ ok: false, err: { message: 'Username or password invalid' } });
        if (bcrypt.compareSync(body.password, userDB.password)) return res.status(404).json({ ok: false, err: { message: 'Username or password invalid' } });

        let token = jwt.sign({ User: userDB }, process.env.SEED, { expiresIn: process.env.TOKEN_EXPIRATION_TIME });
        res.json({ ok: true, User: userDB, token });
    });
});

module.exports = app;