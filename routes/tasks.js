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

const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 

router.get('/', tasks.renderTasks);
router.get('/new', tasks.createIdpTasks);
router.post('/new',validateTask, catchAsync(tasks.postNewTasks));
router.get('/:id', tasks.renderTask);
router.get('/:id/edit',tasks.editTask);
router.put('/:id',validateTask, catchAsync(tasks.postEditedTasks));
router.delete('/:id', tasks.deleteTasks);

module.exports = router; 

