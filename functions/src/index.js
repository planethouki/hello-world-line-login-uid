const { app } = require('@azure/functions');

app.http('httpTrigger1', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'line/callback',
  handler: async (request, context) => {

    const name = (request.query.name || (request.body && request.body.name));
    const responseMessage = name
      ? "Hello, " + name + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


    return { body: responseMessage };
  },
});


app.http('httpTrigger1', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'health',
  handler: async (request, context) => {

    const name = (request.query.name || (request.body && request.body.name));
    const responseMessage = name
      ? "Hello, " + name + ". This HTTP triggered function executed successfully."
      : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";


    return { body: responseMessage };
  },
});
