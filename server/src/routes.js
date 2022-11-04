const express = require('express');
const routes = express.Router()
const DepartmentController = require('./controllers/DepartmentController');
const UserController = require('./controllers/UserController')
const CollaboratorController = require('./controllers/CollaboratorController');
const DepartmentHeadController = require('./controllers/DepartmentHeadController');
const ProductTypeController = require('./controllers/ProductTypeController');
const ProductServiceController = require('./controllers/ProductServiceController');
const ProductController = require('./controllers/ProductController');
const InputController = require('./controllers/InputController');
const OutputController = require('./controllers/OutputController');
const ReturnController = require('./controllers/ReturnController');

routes.get('/user', UserController.index);
routes.post('/user/create', UserController.store);
routes.post('/user/login', UserController.login);
routes.post('/user/validate', UserController.validateToken);
routes.post('/user/logout', UserController.logout);

routes.get('/department', DepartmentController.index);
routes.post('/department/create', DepartmentController.store);

routes.get('/departmenthead', DepartmentHeadController.index);
routes.post('/departmenthead/create', DepartmentHeadController.store);

routes.get('/collaborator', CollaboratorController.index);
routes.get('/collaborator/debit', CollaboratorController.debit)
routes.get('/collaborator/:department', CollaboratorController.department)
routes.post('/collaborator/create', CollaboratorController.store)
routes.get('/fingerprint/:fingerId', CollaboratorController.fingerPrintFind)

routes.get('/producttype', ProductTypeController.index);
routes.post('/producttype/create', ProductTypeController.store);
routes.delete('/producttype/:id', ProductTypeController.delete);

routes.get('/productservice', ProductServiceController.index);
routes.post('/productservice/create', ProductServiceController.store);

routes.get('/product', ProductController.index);
routes.post('/product/create', ProductController.store);

routes.get('/input', InputController.index);
routes.post('/input/create', InputController.store);
routes.post('/input/update', InputController.update);
routes.delete('/input/:id', InputController.delete);

routes.get('/output', OutputController.index);
routes.post('/output/create', OutputController.store);
routes.post('/output/update', OutputController.update);
routes.delete('/output/:id', OutputController.delete);
routes.post('/output/retreat', OutputController.retreat);
routes.post('/output/retreatfinger', OutputController.retreatFinger);

routes.get('/return', ReturnController.index);
routes.post('/return', ReturnController.store);
routes.post('/return/fingerprint', ReturnController.fingerPrintReturn);


module.exports = routes;