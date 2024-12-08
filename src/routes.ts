import { Router } from 'express'
import UserController from './users/controllers/user-controller'
import AuthenticationController from './authentication/controllers/authentication-controller'
import UrlController from './urls/controllers/url-controller'

const routes = Router()
const userController = new UserController()
const authenticationController = new AuthenticationController()
const urlController = new UrlController()

routes.post('/users', userController.create)
routes.get('/users', userController.index)
routes.get('/users/:id', userController.show)
routes.put('/users/:id', userController.update)
routes.delete('/users/:id', userController.delete)

routes.post('/authentication', authenticationController.index)

// Pode ou não ter autenticação
routes.post('/urls', urlController.create)

// Necessitam autenticação
routes.get('/urls', urlController.indexByUser)
routes.patch('/urls/:id', urlController.changeOriginalUrl)
routes.delete('/urls/:id', urlController.delete)

// Não necessita de autenticação
routes.get('/:shortUrl', urlController.clickShortUrl)

export default routes;
