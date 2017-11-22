const User = require('../../src/models').User;

module.exports = factory => {
  const user = factory.define('user', User, () => {
    return {
      firstName: factory.chance('first'),
      middleName: factory.chance('first'),
      lastName: factory.chance('last'),
      email: 'leo@fsl.co',
      password: 'pass',
      address1: '123 I st',
      city: 'Davis',
      zip: '95616',
      isVerified: true,
    };
  });
  return user;
};
