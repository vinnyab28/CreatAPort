const AWS = require("aws-sdk");
const Handlebars = require("handlebars");
const s3 = new AWS.S3();

// Helper function to format dates
Handlebars.registerHelper("formatDate", (dateString) => {
	const options = { year: "numeric", month: "long", day: "numeric" };
	return new Date(dateString).toLocaleDateString(undefined, options);
});

exports.handler = async (event) => {
	// Load the HTML template
	const template = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{profile.title}}</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: "Arial", sans-serif; line-height: 1.6; background-color: #f0f4f8; color: #333; }
            .container { max-width: 800px; margin: 40px auto; padding: 20px; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); }
            header { text-align: center; margin-bottom: 30px; }
            h1 { font-size: 2.5em; color: #333; }
            h2 { font-size: 1.5em; color: #007bff; margin-bottom: 10px; }
            h3 { font-size: 1.8em; margin: 20px 0 10px; border-bottom: 2px solid #007bff; padding-bottom: 5px; }
            .edu-item, .exp-item, .cert-item { margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-left: 5px solid #007bff; border-radius: 5px; transition: transform 0.2s; }
            .edu-item:hover, .exp-item:hover, .cert-item:hover { transform: translateY(-2px); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); }
            p { margin: 5px 0; }
            ul { list-style-type: none; padding: 0; }
            li { background: #e7f1ff; margin: 5px 0; padding: 10px; border-radius: 5px; transition: background 0.3s; }
            li:hover { background: #d0e7ff; }
            a { color: #007bff; text-decoration: none; transition: color 0.3s; }
            a:hover { color: #0056b3; text-decoration: underline; }
            footer { text-align: center; margin-top: 20px; font-size: 0.9em; color: #777; }
        </style>
    </head>
    <body>
        <div class="container">
            <header>
                <h1>{{profile.firstName}} {{profile.lastName}}</h1>
                <h2>{{profile.title}}</h2>
                <p>{{profile.summary}}</p>
                {{#if profile.profilePic}}
                    <img src="{{profile.profilePic}}" alt="Profile Picture" />
                {{/if}}
                <p>Email: <a href="mailto:{{profile.email}}">{{profile.email}}</a></p>
                {{#each profile.links}}
                <p>LinkedIn: <a href="{{this}}" target="_blank">{{this}}</a></p>
                {{/each}}
            </header>

            <section class="education">
                <h3>Education</h3>
                {{#each education}}
                    <div class="edu-item">
                        <h4>{{this.name}}</h4>
                        <p>Degree: {{this.degree}}</p>
                        <p>Location: {{this.location}}</p>
                        <p>Duration: {{formatDate this.startYear}} - {{formatDate this.endYear}}</p>
                        <p>Summary: {{this.description}}</p>
                    </div>
                {{/each}}
            </section>

            <section class="experience">
                <h3>Experience</h3>
                {{#each experience}}
                    {{#each this}} <!-- Nested array -->
                        <div class="exp-item">
                            <h4>{{this.companyName}}</h4>
                            <p>Position: {{this.jobTitle}}</p>
                            <p>Location: {{this.location}}</p>
                            <p>Duration: {{formatDate this.startYear}} - {{formatDate this.endYear}}</p>
                            <p>Summary: {{this.description}}</p>
                        </div>
                    {{/each}}
                {{/each}}
            </section>

            <section class="skills">
                <h3>Skills</h3>
                <ul>
                    {{#each skills}}
                        <li>{{this}}</li>
                    {{/each}}
                </ul>
            </section>

            <section class="certifications">
                <h3>Certifications</h3>
                {{#each certifications}}
                    <div class="cert-item">
                        <p>Certificate: {{this.name}}</p>
                        <p>URL: <a href="{{this.url}}" target="_blank">{{this.url}}</a></p>
                    </div>
                {{/each}}
            </section>
        </div>
    </body>
</html>
`;
	// Compile the template
	const compiledTemplate = Handlebars.compile(template);

	const data = JSON.stringify(event, null, 2);
	const { userID, body } = JSON.parse(data);
	// Render the HTML
	const renderedHtml = compiledTemplate(body);

	// Define S3 bucket and object key
	const bucketName = "cloud-computing-ta"; // Replace with your S3 bucket name
	const objectKey = "portfolio.html";

	// Upload the rendered HTML to S3
	const params = {
		Bucket: bucketName,
		Key: `${userID}/${objectKey}`,
		Body: renderedHtml,
		ContentType: "text/html",
	};

	try {
		await s3.putObject(params).promise();
		const objectUrl = `https://${bucketName}.s3.us-east-1.amazonaws.com/${params.Key}`;
		return {
			statusCode: 200,
			body: JSON.stringify({ message: "HTML rendered and uploaded to S3 successfully!", url: objectUrl }),
		};
	} catch (error) {
		console.error("Error uploading to S3:", error);
		return {
			statusCode: 500,
			body: JSON.stringify("Error uploading to S3"),
		};
	}
};
