const express = require('express')
const router = express.Router()
const ProfileController = require('./controllers/ProfileController')
const JobController = require('./controllers/JobController')
const DashboardController = require('./controllers/DashboardController')

/* const basePath = __dirname + '/views'

router.get('/', (request, response) => response.sendFile(basePath + "/index.html"))
router.get('/index.html', (request, response) => response.redirect("/"))
router.get('/job', (request, response) => response.sendFile(basePath + "/job.html"))
router.get('/job/edit', (request, response) => response.sendFile(basePath + "/job-edit.html"))
router.get('/profile', (request, response) => response.sendFile(basePath + "/profile.html")) */

// const views = __dirname + "/views/"



router.get('/', DashboardController.index )
router.get('/index.html', (request, response) => response.redirect("/"))
router.get('/job', JobController.create  )
router.post('/job', JobController.save )
router.get('/job/:id', JobController.edit )
router.post('/job/:id', JobController.update )
router.post('/job/delete/:id', JobController.delete )
router.get('/profile', ProfileController.index )
router.post('/profile', ProfileController.update )


module.exports = router;