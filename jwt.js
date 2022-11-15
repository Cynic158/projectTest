const jsonwebtoken = require("jsonwebtoken");
const secretKey = "dfasfgsda";

function generateToken(obj) {
  let token = jsonwebtoken.sign(obj, secretKey, { expiresIn: "10h" });
  return token;
}

module.exports = {
  generateToken,
  secretKey,
};
