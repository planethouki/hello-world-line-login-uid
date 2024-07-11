const { app } = require('@azure/functions');

app.http('client', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  route: 'line/callback',
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);

    const code = request.query.get('code')

    if (!code) {
      return { status: 400, body: 'Missing code' };
    }

    try {
      const data = new URLSearchParams();
      data.append('grant_type', 'authorization_code');
      data.append('code', code);
      data.append('redirect_uri', `${process.env.LINE_CALLBACK_URL}/api/line/callback`);
      data.append('client_id', process.env.LINE_CHANNEL_ID);
      data.append('client_secret', process.env.LINE_CHANNEL_SECRET);

      const tokenResponse = await fetch('https://api.line.me/oauth2/v2.1/token', {
        method: 'POST',
        body: data
      }).then(res => res.json());

      // const accessToken = tokenResponse.data.access_token;

      // const profileResponse = await fetch('https://api.line.me/v2/profile', {
      //   headers: { Authorization: `Bearer ${accessToken}` }
      // }).then(res => res.json());

      return {
        body: tokenResponse
      }

    } catch (error) {
      return {
        status: 500,
        body: error.message
      }
    }
  }
});
