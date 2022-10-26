const express = require('express'); 
const router = express.Router({mergeParams:true}); 

const Task = require('../models/task'); 
const Workstation = require('../models/workstation'); 

const {taskSchema, workstationSchema} = require('../schemas');  
const ExpressError = require('../utils/ExpressError'); 
const catchAsync = require('../utils/catchAsync'); 
//const Product = require('../../../Downloads/relationshipsCheck/models/product');
const { validateTask} = require('../middwares');
const relations = require('../controllers/relations'); 


const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 

router.get('/new', relations.createTask); 
router.post('/',validateTask,catchAsync(relations.createRelatedTask)); 

module.exports = router; 
