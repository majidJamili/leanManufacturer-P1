const express = require('express');
const path = require('path'); 
const app = express(); 
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi'); 



const flash = require('connect-flash'); 
const session = require('express-session'); 

const {taskSchema,workstationSchema} = require('./schemas.js') 
const catchAsync = require('./utils/catchAsync'); 
const ExpressError = require('./utils/ExpressError'); 
const methodOverride = require('method-override'); 

const Workstation = require('./models/workstation'); 
const Task = require('./models/task');

const taskRoutes = require('./routes/tasks'); 
const workstationRoutes = require('./routes/workstations'); 
const relationsRoute = require('./routes/relations'); 
const lineRoutes = require('./routes/line'); 
const balancingRoutes = require('./routes/balancing'); 

const Chart = require('chart.js');
const {CanvasRenderService} = require('chartjs-node-canvas');





const { render } = require('ejs');
const types = ['Value-adding', 'Non-value-adding', 'Essential', 'Allowed Wait', 
'Transport','Waste']; 
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
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use('/pdf', express.static(__dirname + '/pathToPDF'));
app.use(express.json());

const sessionConfig = {
    secret: 'changesecretinproduction', 
    resave:false, 
    saveUninitialized:false, 
    cookie:{
        httpOnly:true, 
        expires: Date.now() + 604800000
    }
};
app.use(session(sessionConfig)); 
app.use(flash()); 

app.use((req,res, next)=>{
    res.locals.success = req.flash('success'); 
    res.locals.error = req.flash('error'); 
    res.locals.info = req.flash('info'); 
    next(); 
})

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

app.use('/tasks', taskRoutes);  
app.use('/workstations', workstationRoutes); 
app.use('/workstations/:id/tasks',relationsRoute ); 
app.use('/', lineRoutes); 
app.use('/linebalance', balancingRoutes); 




app.all('*', (req,res,next)=>{
    next(new ExpressError('Page Not Found', 404))
})

app.listen(3000, () => {
    console.log('SERVING THIS APP ON PORT 3000')
})
