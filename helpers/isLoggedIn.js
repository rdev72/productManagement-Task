const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.jwtSecretKey);
    req.userData = decoded;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Auth failed' });
  }
};
