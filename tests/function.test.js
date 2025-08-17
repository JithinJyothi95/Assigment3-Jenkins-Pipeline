const { handler } = require('../src/functions/HttpTrigger');

describe('HttpTrigger function', () => {
  it('should return greeting with name from query', async () => {
    const context = {};
    const request = {
      query: {
        name: 'JithinJyothi'
      }
    };

    await handler(context, request);

    expect(context.res.status).toBe(200);
    expect(context.res.body).toBe('Welcome from Jithin!!');
  });

  it('should ask for name if not provided', async () => {
    const context = {};
    const request = {
      query: {}
    };

    await handler(context, request);

    expect(context.res.status).toBe(400);
    expect(context.res.body).toBe('Could you please include a name to the query string?');
  });
});