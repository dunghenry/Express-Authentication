const Joi = require('joi');
const userValidation = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().lowercase().min(5).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        //email: Joi.string().pattern(new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$')).email().required(),
        //email: Joi.string().pattern(new RegExp('@gmail.com$')).email().required(),
    })
    return userSchema.validate(data);
}
module.exports = { userValidation };