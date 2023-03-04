const jwt = require("jsonwebtoken");
const jwtsecret = "hehe";

const generateToken = (data) => {
  return jwt.sign(data, jwtsecret, {
    expiresIn: "1d",
  });
};

module.exports = generateToken;
