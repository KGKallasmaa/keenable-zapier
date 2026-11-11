const zapier = require('zapier-platform-core');
const App = require('../index');

const appTester = zapier.createAppTester(App);
const apiKey = process.env.KEENABLE_API_KEY;
const maybe = apiKey ? it : it.skip;

describe('keenable', () => {
  it('registers Search and Fetch Page actions', () => {
    expect(Object.keys(App.creates)).toEqual(['search', 'fetch_page']);
  });

  maybe('searches', async () => {
    const r = await appTester(App.creates.search.operation.perform, {
      authData: { api_key: apiKey },
      inputData: { query: 'keenable web search', max_results: 3 },
    });
    expect(r.results.length).toBeGreaterThan(0);
  });

  maybe('fetches a page', async () => {
    const r = await appTester(App.creates.fetch_page.operation.perform, {
      authData: { api_key: apiKey },
      inputData: { url: 'https://example.com' },
    });
    expect(r.content).toContain('Example');
  });
});
