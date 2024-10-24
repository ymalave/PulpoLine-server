const jwt = require('jsonwebtoken');

function isTokenExpired(token) {

  const decodedToken = jwt.decode(token);
  
  const currentTime = Math.floor(Date.now() / 1000);

  if (decodedToken.exp < currentTime) {
    console.log('El token ha expirado');
    return true;
  } else {
    console.log('El token aún es válido');
    return false;
  }
}

module.exports = isTokenExpired;