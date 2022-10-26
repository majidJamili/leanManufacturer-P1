const express = require('express'); 
const router = express.Router({mergeParams:true}); 

const Task = require('../models/task'); 
const Workstation = require('../models/workstation'); 

const {taskSchema} = require('../schemas');  
const ExpressError = require('../utils/ExpressError'); 
const catchAsync = require('../utils/catchAsync'); 
const flash = require('connect-flash'); 
const { validateTask} = require('../middwares');
const { render } = require('ejs');
const tasks = require('../controllers/tasks'); 
const { count } = require('../models/task');
const { json } = require('express');
const {graphDataMaker} = require('../middwares');






const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 

router.get('/', async(req,res)=>{
    const tasks = await Task.find({}); 
    const workstations = await Workstation.find({}).populate('taskList'); 
    res.render('linebalance/balanceHull', {tasks, workstations, types}); 
})

router.post('/balance', async(req,res)=>{ 
    const body = req.body; 
    var containersID = body.containers; 

    if(Array.isArray(containersID)){
        for (let containerID of containersID) {
            const foundWorkstation = await Workstation.findById(containerID).populate({path:'taskList'}); 
            foundWorkstation.taskList =[];            
            var tasksID = body[containerID]; 
            if(Array.isArray(tasksID)) {
                for(let taskID of tasksID){
                    var foundTask = await Task.findById(taskID); 
                    foundWorkstation.taskList.push(foundTask);
                    foundTask.workstations =[]; 
                    foundTask.workstations = foundWorkstation; 
                    await foundWorkstation.save(); 
                    await foundTask.save();              
                }            
            }else{
                var foundTask = await Task.findById(tasksID); 
                foundWorkstation.taskList.push(foundTask);
                foundTask.workstations =[]; 
                foundTask.workstations = foundWorkstation; 
                await foundWorkstation.save(); 
                await foundTask.save();   

            }
            foundWorkstation.chartData = []; 
            foundWorkstation.chartData = graphDataMaker(foundWorkstation, types); 
            await foundWorkstation.save(); 
        }
    }




    res.redirect('/linebalance')

})

module.exports = router; 