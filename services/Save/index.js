const { DynamoDBClient, ResourceNotFoundException } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, ScanCommand, UpdateCommand } = require("@aws-sdk/lib-dynamodb");

const client = new DynamoDBClient({
	region: "us-east-1",
	// endpoint: "http://localhost:8000",
});
const docClient = DynamoDBDocumentClient.from(client);

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

exports.handler = async (event) => {
	const { userID, data } = JSON.parse(event.body);

	if (!userID) {
		return {
			statusCode: 403,
			body: JSON.stringify({ message: "Invalid request!" }),
		};
	}

	const user = await getUserByUserID(userID);
	if (!user) {
		return {
			statusCode: 404,
			body: JSON.stringify({ message: "User not found!" }),
		};
	}

	const params = {
		TableName: "Users",
		Key: {
			userID: userID,
			email: user.email,
		},
		UpdateExpression: "set #data = :data",
		ExpressionAttributeNames: {
			"#data": "data",
		},
		ExpressionAttributeValues: {
			":data": { ...data },
		},
		ReturnValues: "UPDATED_NEW",
	};

	try {
		const result = await docClient.send(new UpdateCommand(params));
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "Data updated successfully!", body: result.Attributes }),
		};
	} catch (error) {
		console.error("Error updating data:", error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: "Could not update data" }),
		};
	}
};
