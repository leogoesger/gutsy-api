const jwt = require('jsonwebtoken');

export default function getToken() {
  return jwt.sign({email: 'leo@fsl.co'}, process.env.CRYPTO_KEY);
}
