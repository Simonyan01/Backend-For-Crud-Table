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
db.run('CREATE TABLE IF NOT EXISTS echo (id INTEGER PRIMARY KEY AUTOINCREMENT, name "TEXT VARCHAR(255) NOT NULL", surname "TEXT", age INTEGER,salary NOT NULL)')

app.use(cors()) 
app.use(JSONparser)

// Our user

app.get('/users', (req, res) => {
    db.all("SELECT * FROM echo", (err, rows) => {
        console.log(rows)
        res.send(rows);
    })

});

// FIND user details with Id

app.get('/users/:id', (req, res) => {
    const userNum = req.params.id
    db.all("SELECT * FROM echo WHERE id = ?", [userNum], (err, rows) => {
        console.log(rows);
        res.send(rows);
    })
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
    db.run("INSERT INTO echo(name, surname, age, salary, id) VALUES (?, ?, ?, ?, ?)", new_user)
    res.send(JSON.stringify({ message: 'User Added In Database ' }))      // res.send(`User Added: ${new_user.name}`)
});

// Update

app.patch('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, surname, age, salary } = req.body;
    // const myUser = user.find((param) =>
    //     param.id === id
    // )
    // if (name) myUser.name = name
    // if (surname) myUser.surname = surname
    // if (age) myUser.age = age
    // if (salary) myUser.salary = salary
    let sqlite = `UPDATE users SET name = ?, surname = ?, age = ?, salary = ? WHERE id = ${id}`
    db.run(sqlite, name, surname, age, salary)
    res.send(`User with the ${id} has been Updated`);  
});

// Delete

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id

    db.run("DELETE FROM echo WHERE id = ?", [userId], (err) => {
        db.all("SELECT * FROM echo WHERE id = ?", [userId], (err, rows) => {
            console.log(rows);
            res.send(rows);
        })
    })
});

app.listen(PORT, () => {
    console.log(`Server is Started on http://localhost:${PORT}`)
});


