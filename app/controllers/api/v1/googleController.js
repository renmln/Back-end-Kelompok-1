const jwt = require("jsonwebtoken");
const userService = require('../../../services/userService')
const { OAuth2Client } = require("google-auth-library");
const { JWT_SECRET_KEY = "Rahasia" } = process.env;
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

function createToken(user) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  return jwt.sign(payload, JWT_SECRET_KEY);
}

module.exports = {
    async handleGoogle(req, res) {
        const { token } = req.body;
      
        try {
      
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.REACT_APP_GOOGLE_CLIENT_ID
          })
          const { email,name } = ticket.getPayload();
          console.log(ticket.getPayload())
      
      
          let user = await userService.findId(email);
          if (!user) user = await userService.create({ email, name });
      
          const accessToken = createToken(user);
      
          res.status(201).json({ accessToken });
        } catch (err) {
          res.status(401).json({ error: { name: err.name, message: err.message } });
        }
      }
}
