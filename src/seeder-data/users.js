const bcrypt = require('bcrypt');
module.exports = [
  {
    firstName: 'Leo',
    lastName: 'Qiu',
    email: 'leoq91@gmail.com',
    password: bcrypt.hashSync('pass', 10),
    role: 'ADMIN',
    address1: '321 I st',
    city: 'Davis',
    zip: '95616',
    isVerified: false,
    createdAt: '2017-11-12 19:35:54.972-08',
    updatedAt: '2017-11-12 19:35:54.972-08',
  },
  {
    firstName: 'Noelle',
    lastName: 'Patterson',
    email: 'noellekpatterson@gmail.com',
    password: bcrypt.hashSync('pass', 10),
    role: 'CUSTOMER',
    address1: '321 I st',
    city: 'Davis',
    zip: '95616',
    isVerified: false,
    createdAt: '2017-11-12 19:35:54.972-08',
    updatedAt: '2017-11-12 19:35:54.972-08',
  },
];
