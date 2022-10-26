const express = require('express'); 
const router = express.Router(); 

const catchAsync = require('../utils/catchAsync'); 
const ExpressError = require('../utils/ExpressError'); 
const {workstationSchema} = require('../schemas');  
const Workstation = require('../models/workstation'); 
const {validateWorkstation} = require('../middwares');

const workstations = require('../controllers/workstations'); 



const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste'];

router.post('/new',validateWorkstation, catchAsync(workstations.createWorkstation));
router.get('/:id', workstations.renderWorkstation); 
router.get('/:id/edit',workstations.editWorkstation);    
router.put('/:id',validateWorkstation, catchAsync(workstations.postEditedWorkstation)); 
router.delete('/:id', workstations.deleteWorkstation); 


module.exports = router; 