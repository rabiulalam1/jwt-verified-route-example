const Joi = require('joi')

//Register Validation
const validation = (data) => {
    const schema = Joi.object({

        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

   return schema.validate(data)
}

module.exports.validation = validation;

