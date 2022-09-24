import express from 'express';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

const app = express();
const JSONparser = bodyParser.json()
const PORT = 4000

app.use(cors())
app.use(JSONparser)


let user = [{
    name: "Vardan",
    surname: "Gasparyan",
    age: 24,
    salary: 100000,
    id: uuidv4()
},
{
    name: "Artak",
    surname: "Karapetyan",
    age: 32,
    salary: 200000,
    id: uuidv4()
}
]

// Our user

app.get('/users', (req, res) => {
    res.send(JSON.stringify(user))
});

// FIND user details

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

    res.send("User Added")  //res.send(`User Added: ${new_user.name}`)
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

export default app