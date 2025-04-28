module.exports = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  issuer: process.env.JWT_ISSUER || 'http://localhost:8180/realms/ahssane-voyage',
  audience: process.env.JWT_AUDIENCE || 'my-webapp-client',
  expiresIn: process.env.JWT_EXPIRATION || 3600 // 1 hour
};