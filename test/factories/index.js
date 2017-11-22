/* eslint-disable */
import factory, {SequelizeAdapter} from 'factory-girl';
factory.setAdapter(new SequelizeAdapter());

const areas = require('./area')(factory);
const regions = require('./region')(factory);
const authors = require('./author')(factory);
const books = require('./book')(factory);
const routes = require('./route')(factory);
const users = require('./user')(factory);
const userRoutes = require('./userRoute')(factory);

export default factory;
