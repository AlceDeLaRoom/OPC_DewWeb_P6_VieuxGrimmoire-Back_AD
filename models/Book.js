const mongoose = require('mongoose')

const ratingSchema = mongoose.Schema({
    _id : false,
    userId: { type: String, required: true},
    grade: { type: Number, required: true, min: 1 }
})

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true},
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: {ratingSchema},
   /*
    ratings : [ 
        {
            userId: { type: String, required: true},
            grade: { type: Number, required: true }
        }
    ],
    */
    averageRating: { type: Number }
})


module.exports = mongoose.model('Book', bookSchema)