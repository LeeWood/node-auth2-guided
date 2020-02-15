const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const { username, password } = req.headers;

  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Give me cookies!!' });
  }
};
