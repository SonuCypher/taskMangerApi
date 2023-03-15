require('dotenv').config()
const bodyParser = require('body-parser');
const express = require('express')
const { default: mongoose }=require('mongoose')
const TaskList = require("./models/tasks")
const SubTasks = require("./models/subtasks")


const dbUrl = process.env.DBURL
mongoose.connect(dbUrl)

const app = express();

app.set('view engine','ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/api',async(req,res)=>{
    const lists = await TaskList.find({})
    res.render('index',{lists:lists})
})

///  creating taskList

app.get('/api/createtasklist',(req,res)=>{
    res.render('createTList')
})

app.post('/api/createtasklist',async(req,res)=>{
   try{ 
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
}catch (error) {
console.error(error)
}
})

/////  CREATING TASKS

app.get('/api/list/:id',(req,res)=>{
    console.log(req.params.id)
    res.render('tasks',{id:req.params.id})
})

app.post('/api/createtask', async(req, res) => {
    try {
        const { taskname, taskdescription, duedate, period, periodType, tasklistId } = req.body
        const objdate = new Date(duedate)
        const tasklistname = await TaskList.findById(tasklistId, 'listname').exec()
 const task = new SubTasks({
         taskname:taskname,
         description:taskdescription,
         periodType:periodType,
         period:period,
         dueDate:objdate.toISOString(),
         taskListName:tasklistname.listname,
     })
       await task.save() 
        
        console.log(tasklistname.listname)
        console.log(objdate.toISOString())
        console.log(req.body)
        res.redirect('/api');
    } catch (error) {
        console.error(error)
    }
})

///  getting tasks
app.get('/api/tasklist',async(req,res)=>{
    try {
        const tasklist = await SubTasks.find({})
        console.log(tasklist)
        tasklist.forEach((list)=>{
            console.log(list.dueDate)
        })
        res.redirect('/api')
    } catch (error) {
        console.error(error)
    }

})

app.listen(5000,()=>{
    console.log("server started on 5000 ")
})