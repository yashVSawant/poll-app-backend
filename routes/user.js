const express = require('express');

const controller = require('../controllers/user');
const multer = require('multer');

const upload = multer()

const routes = express.Router();

routes.post('/data/photo',upload.single('file') ,controller.uploadPhoto)
routes.get('/',controller.getUser);


module.exports = routes;