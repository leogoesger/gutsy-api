/* eslint-disable */
import factory, {SequelizeAdapter} from 'factory-girl';
factory.setAdapter(new SequelizeAdapter());

const areas = require('./area')(factory);
const subareas = require('./subarea')(factory);
const regions = require('./region')(factory);
const subregions = require('./subregion')(factory);
const authors = require('./author')(factory);
const books = require('./book')(factory);
const routes = require('./route')(factory);
const users = require('./user')(factory);
const userRoutes = require('./userRoute')(factory);
const userBooks = require('./userBook')(factory);
const bookRoutes = require('./bookRoute')(factory);
const authorBooks = require('./authorBook')(factory);

export default factory;
