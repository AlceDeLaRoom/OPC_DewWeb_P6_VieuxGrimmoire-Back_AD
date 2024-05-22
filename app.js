const express = require("express")
const mongoose = require("mongoose")
const accessMongoDB = require("./accessMongoDB")
const path = require('path');


const userRoutes = require('./routes/user')
const bookRoutes = require('./routes/book')

async function main() {
    await mongoose.connect(accessMongoDB);
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

app.use("/api/books", bookRoutes)
app.use("/api/auth", userRoutes)
app.use("/images", express.static(path.join(__dirname, 'images')))

module.exports = app


// Packge dotenv .env .env.prod .env.dev 
// ${process.env.MAVARIABLE}

/*
mongoose.connect(`mongodb+srv://user1:JPUUZfIPqHurbAFC@cluster0.jzsellu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(err => console.log(err));
*/

// Password validator https://www.npmjs.com/package/password-validator

// SHARP 

