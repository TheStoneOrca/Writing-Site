import express from "express"
import bodyParser from "body-parser"

let app = express()
let port = 3000;

let documents = [];

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.set("views", "views")

app.get("/", (req, res) => {
    res.render("Main.ejs")
})

app.post("/create", (req, res) => {
    if (req.body.Name != "") {
        documents.push(req.body.Name)
        res.render("Main.ejs", {Documents: documents})
    } else {
        throw Error("NO TEXT INPUTTED!")
        res.render("Main.ejs", {Documents: documents})
    }
    
})
app.get("/create", (req, res) => {
    res.render("Main.ejs", {Documents: documents})
})

app.get("/documents/ID=:i", (req, res) => {
    const id = req.params.i;
    if (id <= documents.length) {
        res.render("Edit.ejs", {DocID: id})
    } else {
        res.sendStatus(404)
    }
})

app.post("/documents/ID=:i/delete", (req, res) => {
    const id = req.params.i;
    const indexToRemove = id; 
    if (indexToRemove >= 0 && documents[indexToRemove] != undefined) {
        documents.splice(indexToRemove, 1);
        res.redirect("/create")
    } else {
        throw Error("UNEXPECTED ERROR: ID DOES NOT EXIST!")
    }
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})