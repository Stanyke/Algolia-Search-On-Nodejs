const Joi = require('joi');

exports.addBookSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string().required()
})

