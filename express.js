const express = require('express')
const bodyParser = require('body-parser')
const JSONparser = bodyParser.json()
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const app = express();
const PORT = 4000;
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database("./echo.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err.message);
    console.log("Database Opened Successfully");
});
db.run('CREATE TABLE IF NOT EXISTS echo (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name "TEXT VARCHAR(255) NOT NULL", Surname "TEXT", Age INTEGER,Salary NOT NULL)')

app.use(cors())
app.use(JSONparser)

// Our user

let user = []

app.get('/users', (req, res) => {
    res.send(JSON.stringify(user))
});

// FIND user details with Id

app.get('/users/:id', (req, res) => {
    const userNum = req.params.id
    const myUser = user.find(param => {
        return param.id + "" === userNum
    })
    res.json(myUser)
});

// Create 

app.post('/users', JSONparser, (req, res) => {
    const body = req.body
    const new_user = {
        name: body["name"],
        surname: body["surname"],
        age: body["age"],
        salary: body["salary"],
        id: uuidv4()
    }
    user.push(new_user)
    db.run("INSERT INTO echo(name, surname, age, salary, id) VALUES (?, ?, ?, ?, ?)", body["name"], body["surname"], body["age"], body["salary"], body["id"])
    res.send("User Added In Database")    // res.send(`User Added: ${new_user.name}`)
});

// Update

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, age, salary } = req.body;
    const myUser = user.find((param) =>
        param.id === id
    )
    if (name) myUser.name = name
    if (surname) myUser.surname = surname
    if (age) myUser.age = age
    if (salary) myUser.salary = salary

    res.send("User Updated")
})

// Delete

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id

    user = user.filter((param) => {
        return param.id !== userId
    })

    res.send("User Deleted")
})

app.listen(PORT, () => {
    console.log(`Server is Started on http://localhost:${PORT}`)
})
