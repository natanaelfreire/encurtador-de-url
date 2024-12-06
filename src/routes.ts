import { Router } from 'express'
import UserController from './users/controllers/user-controller'
import AuthenticationController from './authentication/controllers/authentication-controller'

const routes = Router()
const userController = new UserController()
const authenticationController = new AuthenticationController()

routes.post('/users', userController.create)
routes.get('/users', userController.index)
routes.get('/users/:id', userController.show)
routes.put('/users/:id', userController.update)
routes.delete('/users/:id', userController.delete)

routes.post('/authentication', authenticationController.index)

export default routes;