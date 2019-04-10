const bcrypt = require('bcryptjs');
const jsonWT = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jsonWT.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({message: "Your token is Garbage"})
      } else {
        req.decodedJWT = decodedToken
        console.log('decoded token', req.decodedJWT)
        next()
      }
    })
  } else {
    res.status(401).json({message: "Get a web token first"})
  }
}







// ============= OLD VERSION =================

// module.exports = (req, res, next) => {
//   const { username, password } = req.headers;

//   if (username && password) {
//     Users.findBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' });
//         }
//       })
//       .catch(error => {
//         res.status(500).json({ message: 'Ran into an unexpected error' });
//       });
//   } else {
//     res.status(400).json({ message: 'No credentials provided' });
//   }
// };
