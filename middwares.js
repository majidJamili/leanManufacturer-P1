const {taskSchema,workstationSchema} = require('./schemas.js') 
const catchAsync = require('./utils/catchAsync'); 
const ExpressError = require('./utils/ExpressError'); 

const Workstation = require('./models/workstation'); 
const Task = require('./models/task');


module.exports.validateTask = (req,res,next) =>{
    const {title, time, types, precedence} = req.body.task;
    const {error} = taskSchema.validate({task:{title, time, types}}); 
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next(); 
    }

}


module.exports.validateWorkstation = (req, res, next) => {
    const { error } = workstationSchema.validate(req.body);
    //console.log(error); 
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.graphDataMaker = function(workstation, types){
    var graphList = [];
    for(let type of types){
        var graphData = (workstation.taskList.filter(item => item.types===type)).length; 
        graphList.push(graphData); 
    } 
    return graphList; 
}
