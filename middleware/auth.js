const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("access denied!");
  try {
    const decode = jwt.verify(token, "jwtPrivateKey");
    req.user = decode;
    next();
  } catch (ex) {
    res.status(400).send("invalid token" + ex);
  }
}

module.exports = auth;
