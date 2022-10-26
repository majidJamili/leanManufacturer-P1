const express = require('express'); 
const router = express.Router(); 
const Workstation = require('../models/workstation'); 
const lines = require('../controllers/lines'); 



router.get('/', lines.renderLines); 
router.get('/line', lines.renderLineWorkstations); 

module.exports = router; 