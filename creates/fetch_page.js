'use strict';

const perform = async (z, bundle) => {
  const d = bundle.inputData;
  const params = { url: d.url };
  if (d.max_chars) params.max_chars = Number(d.max_chars);
  if (d.live) params.live = 'true';
  if (d.prompt) params.prompt = d.prompt;
  const response = await z.request({ url: 'https://api.keenable.ai/v1/fetch', method: 'GET', params });
  const { usage, description, ...page } = response.data;
  return page;
};

module.exports = {
  key: 'fetch_page',
  noun: 'Page',
  display: {
    label: 'Fetch Page',
    description: 'Fetches a web page and returns its content as clean Markdown, with title, author and publish date.',
  },
  operation: {
    perform,
    inputFields: [
      { key: 'url', label: 'URL', required: true, helpText: 'The page to fetch, e.g. `https://example.com/article`.' },
      { key: 'max_chars', label: 'Max Characters', type: 'integer', helpText: 'Defaults to 50000.' },
      { key: 'live', label: 'Fetch Live Page', type: 'boolean', default: 'false', helpText: 'Fetch the live page instead of the indexed copy.' },
      {
        key: 'prompt',
        label: 'Extraction Instruction',
        helpText: 'Optional. When set, only the answer to this instruction is returned instead of the full page, e.g. `List all pricing tiers`.',
      },
    ],
    sample: {
      url: 'https://example.com/',
      title: 'Example Domain',
      content: 'This domain is for use in documentation examples.',
      truncated: false,
      total_chars: 50,
    },
    outputFields: [
      { key: 'url', label: 'URL' },
      { key: 'title', label: 'Title' },
      { key: 'content', label: 'Content (Markdown)' },
      { key: 'author', label: 'Author' },
      { key: 'published_at', label: 'Published At' },
      { key: 'truncated', label: 'Truncated', type: 'boolean' },
      { key: 'total_chars', label: 'Total Characters', type: 'integer' },
    ],
  },
};
