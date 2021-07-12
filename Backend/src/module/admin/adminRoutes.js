const express = require('express')
const app = new express.Router()
const adminRoutes = require('./adminController')
const upload = require('../../middleware/uploadPicture')

app.post('/new-admin', adminRoutes.adminRegistration)
app.post('/login-admin', adminRoutes.adminLogin)



module.exports = app