const Workstation = require('../models/workstation'); 

const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 

module.exports.createWorkstation = async(req,res, next)=>{
    const workstation  = new Workstation(req.body.workstation); 
    if(!workstation){
        req.flash('error', 'Workstation not found !!!');
    }
    await workstation.save(); 
    req.flash('success', 'Successfully made a new Workstation!');
    res.redirect('/line');
}; 

module.exports.renderWorkstation = async(req,res)=>{
    const id = req.params.id; 
    const workstation = await Workstation.findById(id).populate('taskList'); 
    res.render('workstations/show', {workstation});

}; 
module.exports.editWorkstation = async(req,res)=>{
    const id = req.params.id; 
    const workstation = await Workstation.findById(id); 
    res.render('workstations/edit', {workstation});
}
module.exports.postEditedWorkstation = async(req,res) =>{
    const id = req.params.id; 
 
    const workstation = await Workstation.findByIdAndUpdate(id, req.body.workstation, {
        runValidators:true,
        new:true
    }); 
    if(!workstation){
        req.flash('error', 'Workstation not found !!!');
    }
    req.flash('success', 'Successfully update Workstation!');
    res.redirect(`/workstations/${workstation._id}`); 

}
module.exports.deleteWorkstation = async(req,res) => {
    const id = req.params.id; 
    const deletedWorkstation = await Workstation.findByIdAndDelete(id); 
    req.flash('success', `Successfully removed ${deletedWorkstation.title}`);
    res.redirect('/line');
}