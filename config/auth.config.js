const keycloak = {
  issuerUri: process.env.KEYCLOAK_ISSUER_URI || 'http://localhost:8180/realms/ahssane-voyage',
  jwksUri: process.env.KEYCLOAK_JWKS_URI || 'http://localhost:8180/realms/ahssane-voyage/protocol/openid-connect/certs',
  clientId: process.env.KEYCLOAK_CLIENT_ID || 'travel-agency-client',
  clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'your-client-secret'
};

module.exports = keycloak;

module.exports = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  issuer: process.env.JWT_ISSUER || 'http://localhost:8180/realms/ahssane-voyage',
  audience: process.env.JWT_AUDIENCE || 'my-webapp-client',
  expiresIn: process.env.JWT_EXPIRATION || 3600 // 1 hour
};