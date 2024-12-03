const jwt = require("jsonwebtoken");
const { SECRET_ACCESS_TOKEN } = require("./config");

const generateAccessJWT = function (email) {
	let payload = {
		email: email,
	};
	return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
		expiresIn: "20m",
	});
};

module.exports = { generateAccessJWT };
