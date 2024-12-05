const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
	const { name, email, password } = JSON.parse(event.body);
	const isVerified = false;
	try {
		const hashedPassword = await bcrypt.hash(password, 12);

		const params = {
			TableName: "Users",
			Item: {
				userID: uuidv4(),
				email: email,
				name: name,
				password: hashedPassword,
				isVerified: isVerified,
			},
		};

		await dynamoDB.put(params).promise();
		return {
			statusCode: 201,
			body: JSON.stringify({ message: "User created successfully" }),
		};
	} catch (error) {
		console.error("Error creating user:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ message: "Error creating user", error: error.message }),
		};
	}
};
