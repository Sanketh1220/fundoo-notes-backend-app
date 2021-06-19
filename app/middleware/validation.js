/*********************************************************************
 * Execution    : 1. Default node with npm   cmd> node server.js
 *                2. If nodemon installed    cmd> npm start
 *
 * Purpose      : User input data validation
 *
 * @description
 *
 * @file        : middleware/validation.js
 * @overview    : validates user input data
 * @module      : this is necessary to validate user input data
 * @author      : Sanketh Chigurupalli <sanketh.chigurupalli@gmail.com>
 * @version     : - - -
 * @since       : 13-06-2021
 *********************************************************************/

const joi = require('@hapi/joi');

const userDataValidation = joi.object({
    firstName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    lastName: joi.string().min(3).max(20).pattern(new RegExp('^[a-zA-Z ]{2,30}$')).required(),
    email: joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")),
    password: joi.string().min(8).max(28).required()
});

const userLoginData = joi.object({
    email: joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")),
    password: joi.string().required()
});

const userForgotPasswordData = joi.object({
    email: joi.string().email().required().pattern(new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")),
});

const notesCreationValidation = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
});

const notesDeletionValidation = joi.object({
    isDeleted: joi.boolean().required()
});

//exporting object
module.exports = {userDataValidation, userLoginData, userForgotPasswordData, notesCreationValidation, notesDeletionValidation};