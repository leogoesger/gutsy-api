/* eslint-disable */
import factory, {SequelizeAdapter} from 'factory-girl';
factory.setAdapter(new SequelizeAdapter());

const areas = require('./area')(factory);
const regions = require('./region')(factory);

export default factory;
