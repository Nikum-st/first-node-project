import * as http from "http";
import * as fs from "fs";
import * as path from "path";
import chalk from "chalk";
const {addNote} = require("./notes.controller")

const pathToHTML = path.join(__dirname, './pages')

const server = http.createServer(async (req,res)=>  {
    if (req.method === 'GET'){

        const content = await fs.readFile(path.join(pathToHTML, 'index.ejs'))
        res.writeHead(200, {
            "Content-Type": "text/html"
        })
        res.end(content)
    } else if (req.method === "POST") {
        const body = [];

        req.on('data', data=>{
            body.push(Buffer.from(data))
        })

        req.on('end', ()=> {
            const title = body.toString().split('=' )[1].replaceAll("+"," ")
            addNote(title)
        } )

        res.end("Success!");
    }
})

server.listen(2000, ()=> {
    console.log(chalk.green(`Server was started on port: ${2000}`))
})