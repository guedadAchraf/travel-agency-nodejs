const { expressjwt: jwt } = require('express-jwt');
const authConfig = require('../config/auth.config');

const verifyToken = jwt({
  secret: authConfig.secret,
  algorithms: ['HS256'],
  issuer: authConfig.issuer,
  audience: authConfig.audience
});

const isAdministrateur = (req, res, next) => {
  // After JWT verification, check if the user has the administrateur role
  if (req.auth && req.auth.roles && req.auth.roles.includes('administrateur')) {
    next();
  } else {
    res.status(403).send({
      message: 'Require administrateur role!'
    });
  }
};

module.exports = {
  verifyToken,
  isAdministrateur
};