const Task = require('../models/task'); 
const Workstation = require('../models/workstation'); 
const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 

module.exports.createTask = async (req,res)=>{
    const {id} = req.params; 
    const tasks = await Task.find({}); 
    res.render('tasks/new', {id, tasks, types});
}; 

module.exports.createRelatedTask = async(req,res) => {
    const {id} = req.params; 
    const workstation = await Workstation.findById(id);
    const {title, time, precedence, types} = req.body.task; 
    console.log('change request received...')
    
    var name = precedence; 
    if(!Array.isArray(name)){
        var name = Array(precedence); 
    }

    console.log(`name ${name} with type of ${typeof(name)}`)
    const task = new Task({title, time, types}); 

  
    if(Array.isArray(precedence)){
        for (let preID of precedence){
            const taskToAdd = await Task.findById(preID); 
            task.precedence.push(taskToAdd); 
        }
    }else{
        const taskToAdd = await Task.findById(precedence); 
        task.precedence.push(taskToAdd); 
    }
    
    workstation.taskList.push(task); 
    task.workstations = workstation; 
    await task.save(); 
    await workstation.save();  
    req.flash('success', 'Successfully added precedence!!')
    res.redirect(`/workstations/${id}`)
    
     
}
