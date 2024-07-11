const { app } = require('@azure/functions');

app.http('client', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: 'line/callback',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const name = request.query.get('name') || await request.text() || 'world';

        return { body: `Hello, ${name}!` };
    }
});
