const { string } = require('joi');
const mongoose = require('mongoose'); 
const Task = require('./task'); 
const Schema = mongoose.Schema; 

const efficiencyCalculator = function(){
    
}

const workstationSchema = new Schema({
    title:{
        type: String,
        require:true
    },
    tasks:{
        type: String},
    taskList:[{
                type: Schema.Types.ObjectId,
                ref: 'Task'
            }],
    defects:{
        type:Number
    },
    availableTime:{
        type:Number
    },
    rework:{
        type:Number

    },
    throughput:{
        type:Number
    }, 
    demand:{
        type:Number
    }, 
    predecessor:{
        type:String
    }, 
    successor:{
        type:String
    },
    cycleTime:{
        type:Number
    },
    totalProcessTime:{
        type:Number
    }, 
    taktTime:{
        type:Number
    }, 
    chartData:{
        type:Array
    }
});

workstationSchema.post('findOneAndDelete', async function (workstation) {
    if (workstation.taskList.length) {
        const res = await Task.deleteMany({ _id: { $in: workstation.taskList } })
        console.log(res);
    }
})



const Workstation = mongoose.model('Workstation',workstationSchema );
module.exports = Workstation; 