const authenticate = require('../middlewares/authenticate').authenticate;

const regionsController = require('../controllers').regions;
const routesController = require('../controllers').routes;
const usersController = require('../controllers').users;
const areasController = require('../controllers').areas;
const authorsController = require('../controllers').authors;
const booksController = require('../controllers').books;
const userRoutesController = require('../controllers').userRoutes;
const userBooksController = require('../controllers').userBooks;
const authorBooksController = require('../controllers').authorBooks;
const bookRoutesController = require('../controllers').bookRoutes;

module.exports = app => {
  app.get('/api', (req, res) =>
    res.status(200).send({
      message: 'region api',
    })
  );

  app.post('/api/regions', regionsController.create);
  app.get('/api/regions', regionsController.list);
  app.get('/api/regions/:regionId', regionsController.show);
  app.put('/api/regions/:regionId', regionsController.update);
  app.delete('/api/regions/:regionId', regionsController.delete);

  app.post('/api/areas', areasController.create);
  app.get('/api/areas', areasController.list);
  app.get('/api/areas/:areaId', areasController.show);
  app.put('/api/areas/:areaId', areasController.update);
  app.delete('/api/areas/:areaId', areasController.delete);

  app.post('/api/routes', routesController.create);
  app.get('/api/routes/:routeId', routesController.show);
  app.put('/api/routes/:routeId', routesController.update);
  app.delete('/api/routes/:routeId', routesController.delete);

  app.post('/api/authors', authorsController.create);
  app.get('/api/authors', authorsController.list);
  app.get('/api/authors/:authorId', authorsController.show);
  app.put('/api/authors/:authorId', authorsController.update);
  app.delete('/api/authors/:authorId', authorsController.delete);

  app.post('/api/books', booksController.create);
  app.get('/api/books', booksController.list);
  app.get('/api/books/:bookId', booksController.show);
  app.put('/api/books/:bookId', booksController.update);
  app.delete('/api/books/:bookId', booksController.delete);

  app.post('/api/userRoutes', userRoutesController.create);

  app.post('/api/userBooks', userBooksController.create);

  app.post('/api/authorBooks', authorBooksController.create);

  app.post('/api/bookRoutes', bookRoutesController.create);

  app.post('/signup', usersController.signUp);
  app.post('/login', usersController.login);
  app.get('/users/me', authenticate, usersController.getMe);
};
