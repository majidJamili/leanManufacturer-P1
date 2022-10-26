const mongoose = require('mongoose');
const {activities, descriptors} = require('./seedHelpers'); 
const Workstation = require('../models/workstation'); 


mongoose.connect('mongodb://localhost:27017/prodcutionLineRev1', 
    { useNewUrlParser: true, 
    useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

const db = mongoose.connection; 
db.on('error', console.error.bind(console, "connection error:")); 
db.once('open', () => {
    console.log('Database Connceted');
})

const sample = array => array[Math.floor(Math.random()*array.length)]; 

const seedDB = async()=>{
    await Workstation.deleteMany({}); 
    for (let i = 0; i < 5; i++){
        const randomNum = Math.floor(Math.random()*1000); 
        const defects = Math.floor(Math.random()*5) + 0.2;
        const availableTime = 460; 
        const rework = Math.floor(Math.random()*75) + 0.2;
        const throughput = Math.floor(Math.random()*50) + 5; 
        const demand = Math.floor(Math.random()*70)+2; 
        const taktTime = Math.floor(availableTime / demand) + 1; 
        const workstation = new Workstation({
            title: `${sample(activities).toUpperCase()} WORKSTATION`,
            tasks: `${sample(activities).toUpperCase()} STATIONS`,
            defects, 
            availableTime, 
            rework, 
            throughput, 
            demand, 
            taktTime
        })
      await workstation.save();   
    }  
}
seedDB().then(()=>{
    mongoose.connection.close(); 
}) 