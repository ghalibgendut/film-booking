const express = require('express')
const app = new express.Router()
const upload = require('../../middleware/uploadPicture')
const filmController = require('./filmController')



app.post('/add-film', upload.uploadSingle, filmController.addFilm)
app.post('/book-film', filmController.bookFilm)
app.get('/list-film', filmController.showFilms)
app.get('/detail-film/:id', filmController.detailFilm)
app.patch('/edit-film/:id', upload.uploadSingle, filmController.editFilm)
app.delete('/delete-film/:id', filmController.deleteFilm)


module.exports = app