const Joi = require('@hapi/joi');

module.exports.loginBodySchema = Joi.object().keys({
    username: Joi.string().required().label('Invalid username'),
    password: Joi.string().required().label('Invalid password')
});