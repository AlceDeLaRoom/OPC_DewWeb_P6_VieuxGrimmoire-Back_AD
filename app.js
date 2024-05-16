const express = require("express")
const mongoose = require("mongoose")
const path = require('path');

//const stuffRoutes = require('./routes/stuff')

async function main() {
    await mongoose.connect('mongodb+srv://user1:QZEelzqiejli@cluster0.jzsellu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
}

main()
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(err => console.log(err));

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
    }
)


//app.use("/api/auth", userRoutes)
//app.use("/images", express.static(path.join(__dirname, 'images')))

module.exports = app