const Workstation = require('../models/workstation'); 

module.exports.renderLines = (req,res) => {
    res.render('home')
}
module.exports.renderLineWorkstations = async(req,res) =>{
    const workstations = await Workstation.find({});
    res.render('line', {workstations})
}