const express = require('express');
const port = 7000;
const db = require('./config/mongoose');
const Task = require('./models/task');
const app = express();
app.use(express.urlencoded());
app.set('view engine', 'ejs');
app.set('views', './views');

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

app.listen(port, (err)=>{
    if(err){
        console.log('Error in running the server:', err);
    }

    console.log('server is running on the port:', port);
});