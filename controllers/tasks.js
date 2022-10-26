const Task = require('../models/task'); 
const Workstation = require('../models/workstation'); 


const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 


module.exports.renderTasks = async(req,res) =>{
    const tasks = await Task.find({});
    res.render('tasks', {tasks})
}; 

module.exports.createIdpTasks= async(req,res) => {
    const id = 1371; 
    var tasks = await Task.find(); 
    res.render('tasks/new', {id, types, tasks})
}; 
module.exports.postNewTasks = async(req,res)=>{

    const {title, time,types, precedence} = req.body.task; 
    const task = new Task({
        title, 
        time, 
        types
    })
    await task.save(); 
    req.flash('success', `Successfully create ${task.title}!`);
    res.redirect('/tasks');    
}; 


module.exports.renderTask = async(req,res) =>{
    const {id} = req.params;
    const task = await Task.findById(id).populate('workstations').populate('precedence'); 
    res.render('tasks/show', {task}); 
};

module.exports.editTask = async(req,res) => {
    const {id} = req.params;
    const task = await Task.findById(id); 
    if(!task){
        req.flash('error', 'Task not found...'); 
    }
    res.render('tasks/edit', {types, task});
}; 
module.exports.postEditedTasks = async(req,res) =>{
    const {id} = req.params;
    const {title, time,types, precedence} = req.body.task; 

    const task = await Task.findByIdAndUpdate(id,{title, time,types}, {
        runValidators:true,
        new:true
    });
    if(!task){
        req.flash('error', 'Task not found')
    }
    req.flash('success', 'Successfully update task!');
    res.redirect(`/tasks/${task._id}`)
};

module.exports.deleteTasks = async(req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id); 
    console.log(task); 
    const deletedTask = await Task.findByIdAndDelete(id); 
    console.log(deletedTask.title)
    if (deletedTask){
        req.flash('success', `Successfully removed ${deletedTask.title}`);
    } 

    res.redirect('/tasks')

}; 