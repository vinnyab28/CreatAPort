const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const { DynamoDBClient, ResourceNotFoundException } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");
const { generateAccessJWT } = require("./utils");

const app = express();
app.use(express.json());
app.use(cookieParser());
// CORS configuration
const corsOptions = {
	origin: "http://localhost:3000", // Replace with your frontend URL
	credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8000;

const client = new DynamoDBClient({
	accessKeyId: "ASIA3N4ZS5ZSSFPS7USS",
	secretAccessKey: "ac9u6R9GUsLczuxc01Apdiot/ioj9hSnw6aAwvIt",
	region: "us-east-1", // You can set any region
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

const getUserByUserID = async (userID) => {
	const params = {
		TableName: "Users",
		FilterExpression: "userID = :userID",
		ExpressionAttributeValues: {
			":userID": userID,
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

		// if (!user.isVerified) {
		// 	return res.status(403).json({ message: "Please verify your account to login." });
		// }

		let options = {
			maxAge: 20 * 60 * 1000,
			httpOnly: true,
			secure: true,
			sameSite: "None",
		};
		const tokenPayload = { email: user.email, userID: user.userID, name: user.name };
		const token = generateAccessJWT(tokenPayload);
		res.cookie("SessionID", token, options);
		res.status(200).json({
			status: "success",
			message: "You have successfully logged in.",
			body: {
				token,
			},
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: "Internal Server Error",
		});
	}
});

app.post("/save", async (req, res) => {
	const { userID, data } = req.body;
	if (!userID) {
		return res.status(403).json({ message: "Invalid request!" });
	}

	const user = await getUserByUserID(userID);
	if (!user) {
		return res.status(404).json({ message: "User not found!" });
	}
	const params = {
		TableName: "Users",
		Key: {
			userID: userID,
			email: user.email,
		},
		UpdateExpression: "set #data = :data",
		ExpressionAttributeNames: {
			"#data": "data", // Use a placeholder for the attribute name
		},
		ExpressionAttributeValues: {
			":data": { ...data }, // The new data to be set
		},
		ReturnValues: "UPDATED_NEW", // Return the updated attributes
	};

	try {
		const result = await docClient.send(new UpdateCommand(params));
		res.status(200).json({ message: "Data updated successfully!", body: result.Attributes });
	} catch (error) {
		console.error("Error updating data:", error);
		res.status(500).json({ error: "Could not update data" });
	}
});

app.get("/data", async (req, res) => {
	try {
		const userID = req.query.userID;
		if (!userID) {
			return res.status(403).json({ message: "Invalid request!" });
		}

		const user = await getUserByUserID(userID);
		if (!user) {
			return res.status(404).json({ message: "User not found!" });
		}

		return res.status(200).json({ body: user.data });
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
