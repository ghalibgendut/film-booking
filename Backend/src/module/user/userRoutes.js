const express = require('express')
const app = new express.Router()
const userController = require('./userController')

app.post('/new-user', userController.userRegister)
app.post('/login', userController.userLogin)


module.exports = app