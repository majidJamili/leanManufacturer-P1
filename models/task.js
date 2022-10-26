const mongoose = require('mongoose'); 
const Schema = mongoose.Schema; 
const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 



const taskSchema = new Schema({
    title:{
        type: String,
        require:true
    },
    time:{
        type: Number,
        require:true
    },
    types:{
        type:String
    }, 
    precedence:[{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    workstations:{
        type: Schema.Types.ObjectId,
        ref: 'Workstation'
    }

    
})

const Task = mongoose.model('Task', taskSchema );
module.exports = Task; 