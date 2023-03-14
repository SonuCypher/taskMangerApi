const bodyParser = require('body-parser');
const express = require('express')
const { default: mongoose }=require('mongoose')
const TaskList = require("./models/tasks")


mongoose.connect("mongodb://localhost:27017/taskManage")

const app = express();

app.set('view engine','ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api',async(req,res)=>{
    const lists = await TaskList.find({})
    console.log(lists[0]._id)
    res.render('index',{lists:lists})
})

app.get('/api/createtasklist',(req,res)=>{
    res.render('createTList')
})

app.post('/api/createtasklist',async(req,res)=>{
    const{listname,listdescription,active}=req.body
    const list = new TaskList({
        listname,
        description:listdescription,
        active,
    })
    await list.save();
    if(active){

        console.log(active)
    }
    // console.log(active)
    console.log(listdescription)
    console.log(listname)
   res.redirect('/api');
    
})
app.get('/api/list/:id',(req,res)=>{
    console.log(req.params.id)
})


app.listen(5000,()=>{
    console.log("server started on 5000 ")
})