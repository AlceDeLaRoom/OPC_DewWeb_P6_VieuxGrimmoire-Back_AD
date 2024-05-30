const Book = require('../models/Book')
const fs = require('fs')


exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }))
}

exports.getBestRating = (req, res, next) => { 
    Book.find()
        .sort({averageRating : -1})
        .limit(3)
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }))       
}

exports.addBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject._userId
    const book = new Book({
        ...bookObject,
        ratings: [],
        averageRating: 0,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    })
    book.save()
        .then(() => res.status(201).json({ message: 'Livre enregistré!'}))
        .catch(error => res.status(400).json({ error }))
}

function updateBook (req, res, bookObject){
    Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Livre modifié!'}))
        .catch(error => res.status(401).json({ error }))
}

exports.modifyBook = (req, res, next) => {
    const filePresent = req.file ? true : false
    const bookObject = filePresent ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }:{...req.body}
    delete bookObject._userId
    Book.findOne({_id: req.params.id})
        .then(book => {
            if(book.userId != req.auth.userId){
                res.status(403).json({ message : 'Not authorized!' })
            }else{
                if (filePresent){
                    const filename = book.imageUrl.split('/images/')[1]
                    fs.unlink(`images/${filename}`, () => updateBook(req, res, bookObject))
                } else {
                    updateBook(req, res, bookObject)
                }
            }
        })
        .catch(error => res.status(400).json({ error }))
}



exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then( book => {
            if (book.userId != req.auth.userId){
                res.status(403).json({ message:'Not authorized!' })  
            } else {
                const filename = book.imageUrl.split('/images/')[1]
                fs.unlink(`images/${filename}`, ()=>{
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Livre supprimé!'}))
                        .catch(error => res.status(401).json({ error }))
                    }
                )
            }
        })
        .catch(error => res.status(500).json({ error }))
}

exports.addGrade = (req, res, next) => {
    const ratingObject = req.body
    if (ratingObject.rating < 0 || ratingObject.rating > 5)[
        res.status(401).json({ message: 'Note hors limite!' })
    ]
    Book.findOne({_id: req.params.id})
        .then(book => {
            if(ratingObject.userId != req.auth.userId){
                res.status(403).json({ message : 'Not authorized!' })
            } else if (book.ratings.find((elt) => elt.userId === req.auth.userId)) {
                res.status(401).json({ message:'Livre déja noté!' })
            }else{
                book.ratings.push({userId: ratingObject.userId, grade: ratingObject.rating})
                book.averageRating = book.ratings.reduce((a, b) => a + b.grade, 0) / book.ratings.length
                Book.updateOne({ _id: req.params.id }, { ratings: book.ratings, averageRating: book.averageRating , _id: req.params.id })
                    .then(() => res.status(200).json(book))
                    .catch(error => res.status(401).json({ error }))
            }
        })
        .catch(error => res.status(400).json({ error }))
}