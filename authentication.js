'use strict';

const test = (z) =>
  z.request({ url: 'https://api.keenable.ai/v1/auth/user' }).then((r) => r.data);

module.exports = {
  type: 'custom',
  fields: [
    {
      key: 'api_key',
      label: 'API Key',
      required: true,
      type: 'password',
      helpText: 'Create an API key in the [Keenable dashboard](https://keenable.ai).',
    },
  ],
  test,
  connectionLabel: (z, bundle) =>
    bundle.inputData.org_name || bundle.inputData.email || bundle.inputData.display_name || '',
};
