const Joi = require('joi'); 
// const {number} = require('joi'); 

module.exports.workstationSchema = Joi.object({
    workstation: Joi.object({
        title: Joi.string().required(),
        tasks: Joi.string().required()
    }).required()
});

module.exports.taskSchema = Joi.object({
    task: Joi.object({
        title: Joi.string().required(), 
        time: Joi.number().required(), 
        types: Joi.string().required()
    }).required()

})

// defects: Joi.number().min(0).required(), 
// availableTime :Joi.number().min(0).required(),
// rework: Joi.number().min(0).required(), 
// throughput:Joi.number().min(0).required(), 
// demand: Joi.number().min(0).required(), 
// predecessor: Joi.string().min(0).required(),
// successor: Joi.string().min(0).required(), 
// cycleTime: Joi.number().min(0).required(),
// totalProcessTime: Joi.number().min(0).required(),
// taktTime: Joi.number().min(0).required()