const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config/config");

module.exports = function auth(req, res, next) {
  const token = req.headers["authorization"];
  // const token = authHeader.split(" ")[1];

  if (!token) return res.status(401).send("access-denied");

  try {
    const verified = jwt.verify(token, TOKEN_SECRET);
    res.user = verified;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).send("Invalid token");
  }
};
