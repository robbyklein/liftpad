// Dependencies
import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import usersController from './controllers/usersController'
import errorHandler from './middleware/errorHandler'
import authController from './controllers/authController'
import requireAuth from './middleware/requireAuth'
import workoutsController from './controllers/workoutsController'
import pagesController from './controllers/pagesController'
import exercisesController from './controllers/exercisesController'

export const app = express()

// Before middleware
app.use(express.static('src/public'))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))

// Routing
app.post('/api/signup', usersController.create)
app.post('/api/login', authController.login)
app.get('/api/validate', requireAuth, authController.validate)
app.get('/api/confirm/:emailToken', usersController.confirm)
app.get('/api/workouts', requireAuth, workoutsController.index)
app.get('/api/workouts/:id', workoutsController.show)
app.post('/api/workouts', requireAuth, workoutsController.create)
app.put('/api/workouts/:id', requireAuth, workoutsController.update)
app.delete('/api/workouts/:id', requireAuth, workoutsController.destroy)
app.get('/api/exercises', requireAuth, exercisesController.index)

app.get('*', pagesController.index)

// After middleware
app.use(errorHandler)

// Start server
app.listen(process.env.PORT)
