const express = require('express')
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose")
const {addNote, getNotes, removeNote,editNote} = require("./notes.controller")

const port = 2000;

const app = express();

app.use(express.urlencoded({
    extended:true
}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.json())

app.set('view engine', 'ejs')
app.set("views", "pages")

app.get("/",async (req,res)=> {
    res.render("index",{
        notes: await getNotes(),
        created:false,
        error: false
    })
})
app.post("/",async (req,res)=> {
    try {
        await addNote(req.body.title)
        res.render("index",{
            notes: await getNotes(),
            created:true,
            error: false
        })

    } catch (e) {
        console.log('Created error',e)
        res.render("index",{
            notes: await getNotes(),
            created:false,
            error: true
        })
    }
})
app.delete('/:id',async (req,res)=> {
    await removeNote(req.params.id)
    res.render("index",{
        notes: await getNotes(),
        created:false,
        error: false
    })
})
app.put('/:id' , async (req,res) => {
    await editNote(req.params.id,req.body.title)
    res.render("index",{
        notes: await getNotes(),
        created:false,
        error: false
    })
})

mongoose.connect('mongodb+srv://your_connection_string_here')
    .then( ()=> {
        app.listen(port, ()=> {
            console.log(chalk.green(`Server was started on port: ${port}`))
        })
    }
   )
