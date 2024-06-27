const express = require("express");
const db = require("./db")

const app = express();
app.use(express.text())
app.use(express.json())

app.get("/books", (req, res)=>{
    res.json(db)
})

app.get("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const getBook = db.find((title)=> title.id === id)

    res.json(getBook)
})

app.post("/books", (req, res)=>{
    const {id, title, author, year} = req.body
    const newBook = db.push({id: id, title: title, author: author, year: year})
    res.json({message: "Se agrego un nuevo libro"})
})

app.put("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const {title, author, year} = req.body
    const getBook = db.find((title)=> title.id === id)
    getBook.title = title
    getBook.author = author
    getBook.year = year

    res.json({message: "Se actualizo un libro"})
})

app.delete("/books/:id", (req, res)=>{
    const id = parseInt(req.params.id)
    const getBook = db.find((title)=> title.id === id)
    const IndiceLibro = db.indexOf(getBook)
    const borrarLibro = db.splice(IndiceLibro, 1)
    res.json({message: "Se elimino un libro"})
})

app.listen(3000,()=>console.log("El servidor esta corriendo en el puerto 3000"))