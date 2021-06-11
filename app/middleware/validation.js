const joi = require('@hapi/joi');

const userDataValidation = joi.object({
    firstName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    lastName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    email: joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")),
    password: joi.string().min(8).max(28).required()
});

//exporting object
module.exports = {userDataValidation};