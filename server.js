//Budget API 

const express = require('express')
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose')
const budgetModel = require('./models/personal_budget_schema')

let url = 'mongodb://127.0.0.1:27017/personal_budget';

app.get("/budget", (req, res) => {
    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            budgetModel.find({})
                .then((data) => {
                    res.send(data);
                    mongoose.connection.close();
                })
                .catch((connectionError) => {
                    console.log(connectionError);
                })
        })
        .catch((connectionError) => {
            console.log(connectionError);
        })
})

app.post("/addBudget", (req, res) => {

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            let newData = new budgetModel(req.body);
            budgetModel.insertMany(newData)
            .then((data)=>{
                res.send("Data added to database")
                mongoose.connection.close();
            })
            .catch((connectionError)=>{
                res.send(connectionError.message)
            })
        })
        .catch((connectionError) => {
            res.send(connectionError);
        })
})


app.listen(port, () => {
    console.log("Api Served at http://localhost:" + port);
})