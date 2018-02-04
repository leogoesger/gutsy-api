const authenticate = require('../middlewares/authenticate').authenticate;

const regionsController = require('../controllers').regions;
const subregionsController = require('../controllers').subregions;
const climbsController = require('../controllers').climbs;
const usersController = require('../controllers').users;
const areasController = require('../controllers').areas;
const subareasController = require('../controllers').subareas;
const authorsController = require('../controllers').authors;
const booksController = require('../controllers').books;
const userClimbsController = require('../controllers').userClimbs;
const userBooksController = require('../controllers').userBooks;
const authorBooksController = require('../controllers').authorBooks;
const bookClimbsController = require('../controllers').bookClimbs;

module.exports = app => {
  app.get('/', () => {
    console.log('hello');
  });
  app.post('/api/regions', regionsController.create);
  app.get('/api/regions', regionsController.list);
  app.get('/api/regions/:regionId', regionsController.show);
  app.put('/api/regions/:regionId', regionsController.update);
  app.delete('/api/regions/:regionId', regionsController.delete);
  app.post('/api/search-regions', regionsController.search);
  app.post('/api/search-region-climbs', regionsController.fetchClimb);

  app.post('/api/subregions', subregionsController.create);
  app.get('/api/subregions', subregionsController.list);
  app.get('/api/subregions/:subregionId', subregionsController.show);
  app.put('/api/subregions/:subregionId', subregionsController.update);
  app.delete('/api/subregions/:subregionId', subregionsController.delete);
  app.post('/api/search-subregions', subregionsController.search);
  app.post('/api/search-subregion-climbs', subregionsController.fetchClimb);

  app.post('/api/areas', areasController.create);
  app.get('/api/areas', areasController.list);
  app.get('/api/areas/:areaId', areasController.show);
  app.put('/api/areas/:areaId', areasController.update);
  app.delete('/api/areas/:areaId', areasController.delete);
  app.post('/api/search-areas', areasController.search);
  app.post('/api/search-area-climbs', areasController.fetchClimb);

  app.post('/api/subareas', subareasController.create);
  app.get('/api/subareas', subareasController.list);
  app.get('/api/subareas/:subareaId', subareasController.show);
  app.put('/api/subareas/:subareaId', subareasController.update);
  app.delete('/api/subareas/:subareaId', subareasController.delete);
  app.post('/api/search-subareas', subareasController.search);
  app.post('/api/search-subarea-climbs', subareasController.fetchClimb);

  app.post('/api/climbs', climbsController.create);
  app.get('/api/climbs/:climbId', climbsController.show);
  app.put('/api/climbs/:climbId', climbsController.update);
  app.delete('/api/climbs/:climbId', climbsController.delete);
  app.post('/api/search-climbs', climbsController.search);

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
  app.post('/api/search-books', booksController.search);

  app.post('/api/userClimbs', userClimbsController.findOrCreate);

  app.post('/api/userBooks', userBooksController.findOrCreate);

  app.post('/api/authorBooks', authorBooksController.create);

  app.post('/api/bookClimbs', bookClimbsController.create);

  app.post('/signup', usersController.signUp);
  app.post('/login', usersController.login);
  app.get('/users/me', authenticate, usersController.getMe);
  // app.put('/update', authenticate, usersController.update);
};
