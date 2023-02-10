const bodyParser = require("body-parser")
const express=require("express")

const app=express()
var arr=[]
var id=0
app.use(bodyParser.json())
const port=8080
app.post("/v1/tasks",(req,res)=>{
    let arr1=[]
    if(req.body.tasks){
        for(let i of req.body.tasks){
            id++
            arr.push({id,...i})
            arr1.push(id)
        }
        return res.status(201).json({
            tasks:arr1
        })

    }else{
    id++
    console.log(req.body)
    arr.push({id, title: req.body.title,is_completed: false})
    return res.status(201).json(
        {id}
    )}
})

app.get("/v1/tasks",(req,res)=>{
  
   return res.status(200).json(
        {task:arr}  
    )
})
app.get("/v1/tasks/:id",(req,res)=>{
   
    for(let i of arr){
        if(i==req.params.id){
            console.log(i)
           return res.status(200).json(i)

        }
    }
    return res.status(404).json({ 
        error: "There is no task at that id"
    }
    )
  
})
app.delete("/v1/tasks/:id",(req,res)=>{
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==req.params.id){
            arr=arr.slice(0,i).concat(arr.slice(i+1,arr.length))
            console.log(arr)
            return res.status(204).json({
                status:"deleted data"
            })
        }
    }
    return res.status(404).json({
        status:"data not found"
    })
})
app.put("/v1/tasks/:id",(req,res)=>{
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==req.params.id){
            if(req.body.title){
                arr[i].title=req.body.title
            }if(req.body. is_completed){
                arr[i].is_completed=req.body. is_completed
            }
            return res.status(204).json({
                status:"data updated"
            })
        }
    }return res.status(404).json({
        error: "There is no task at that id"
    })
})
app.delete("/v1/tasks",(req,res)=>{
    for(let j of req.body.tasks){
    for(let i=0;i<arr.length;i++){
        if(arr[i].id==j.id){
            arr=arr.slice(0,i).concat(arr.slice(i+1,arr.length))
            console.log(arr)
            
        }
    }}
    return res.status(204).json({
        status:"deleted data"
    })
   
})

app.listen(port,()=>console.log(`app is listening at${port}`))