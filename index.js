// express
const express = require('express');
// port
const port = 7000;
// database
const db = require('./config/mongoose');
// Task
const Task = require('./models/task');
const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');

// this is for render in home
app.get('/', function(req, res){

    Task.find().then((task) => {
        return res.render('home',{
            tittle: "Home",
            task: task
        });
      }).catch((err) => {
        console.log(err);
    });
});

// this is for adding task
app.post('/create-task', function(req, res){

    Task.create({
        description: req.body.description,
        category: req.body.category,
        date: req.body.date
    }).then((newtask)=>{
        console.log('*********', newtask);
        return res.redirect('back');
    }).catch((err) => {
        console.log(err);
        return;
    });
});

// this is for deleting the task
app.get('/delete-task', async function(req, res){

    let id = req.query;
    var count = Object.keys(id).length;
    console.log(id);
    for(let i=0; i < count ; i++){
    try {
    //  find the contact in the database using id and delete
    
    await Task.findByIdAndDelete(Object.keys(id)[i]);
        console.log('deleted');
        return res.redirect('back'); 
    } catch (err) {
        console.log(err);
        return;
    }} 
    

});
// to connect with express
app.listen(port, (err)=>{
    if(err){
        console.log('Error in running the server:', err);
    }
    console.log('server is running on the port:', port);
});