const jwt = require('jsonwebtoken');
const config = require('config');
const secret = config.get('JWT_SECRET');

module.exports = (req, res, next) => {
  try {
    const { token } = req.cookies;
    console.log(`Token gotten successfully ${token}`);
    const decoded = jwt.verify(token, secret);
    console.log(`Token decoded user data is ${decoded.email}`);
    req.userData = decoded;
    next();
  }catch(error){
    return res.status(401).json({
        message: 'Auth failed'
    })
  }
}