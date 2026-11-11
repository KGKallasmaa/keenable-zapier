'use strict';

const authentication = require('./authentication');
const search = require('./creates/search');
const fetchPage = require('./creates/fetch_page');

const addApiKey = (request, z, bundle) => {
  if (bundle.authData.api_key) {
    request.headers['X-API-Key'] = bundle.authData.api_key;
  }
  request.headers['X-Keenable-Title'] = 'Zapier';
  return request;
};

const handleErrors = (response, z) => {
  if (response.status === 401 || response.status === 403) {
    throw new z.errors.Error('Your Keenable API key is invalid or missing.', 'AuthenticationError', response.status);
  }
  if (response.status >= 400) {
    let message = response.content;
    try {
      const body = JSON.parse(response.content);
      message = body.message || body.error || message;
    } catch (e) {}
    throw new z.errors.Error(`Keenable error: ${message}`, 'ApiError', response.status);
  }
  return response;
};

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addApiKey],
  afterResponse: [handleErrors],
  creates: {
    [search.key]: search,
    [fetchPage.key]: fetchPage,
  },
};
