const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const { DynamoDBClient, ResourceNotFoundException } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand } = require("@aws-sdk/lib-dynamodb");
const { generateAccessJWT } = require("./utils");

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = 3000;

const client = new DynamoDBClient({
	accessKeyId: "ASIA3N4ZS5ZSSFPS7USS",
	secretAccessKey: "ac9u6R9GUsLczuxc01Apdiot/ioj9hSnw6aAwvIt",
	region: "us-east-2", // You can set any region
	endpoint: "http://localhost:8000", // Local DynamoDB endpoint
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

app.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email) {
			return res.status(400).json({ message: "Invalid email address!" });
		}
		const user = await getUserByEmail(email);
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({
				message: "Invalid email or password. Please try again with the correct credentials.",
			});
		}

		let options = {
			maxAge: 20 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: "None",
		};

		const token = generateAccessJWT();
		res.cookie("SessionID", token, options);
		res.status(200).json({
			status: "success",
			message: "You have successfully logged in.",
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
