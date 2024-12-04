const { DynamoDBClient, ResourceNotFoundException } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const client = new DynamoDBClient({
	region: "us-east-1",
	// endpoint: "http://localhost:8000",
});
const docClient = DynamoDBDocumentClient.from(client);

const getUserByEmail = async (email) => {
	const params = {
		TableName: "Users",
		FilterExpression: "email = :email",
		ExpressionAttributeValues: {
			":email": email,
		},
		Limit: 1,
	};
	try {
		const data = await docClient.send(new ScanCommand(params));
		return data.Items.length > 0 ? data.Items[0] : null;
	} catch (error) {
		if (error instanceof ResourceNotFoundException) {
			console.error("Resource not found!");
		}
		console.error(error);
		return null;
	}
};

exports.handler = async (event) => {
	const { email, password } = JSON.parse(event.body);

	if (!email) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Invalid email address!" }),
		};
	}

	const user = await getUserByEmail(email);
	if (!user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: "User not found!" }),
		};
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);
	if (!isPasswordValid) {
		return {
			statusCode: 401,
			body: JSON.stringify({
				message: "Invalid email or password. Please try again with the correct credentials.",
			}),
		};
	}

	const tokenPayload = { email: user.email, userID: user.userID, name: user.name };
	const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "20m" });

	return {
		statusCode: 200,
		body: JSON.stringify({
			status: "success",
			message: "You have successfully logged in.",
			body: {
				token,
			},
		}),
	};
};
