'use strict';

const perform = async (z, bundle) => {
  const d = bundle.inputData;
  const body = { query: d.query };
  if (d.mode) body.mode = d.mode;
  if (d.max_results) body.max_results = Number(d.max_results);
  if (d.site) body.site = d.site;
  if (d.exclude_domains && d.exclude_domains.length) body.exclude_domains = d.exclude_domains;
  if (d.published_after) body.published_after = d.published_after;
  if (d.published_before) body.published_before = d.published_before;

  const response = await z.request({
    url: 'https://api.keenable.ai/v1/search',
    method: 'POST',
    body,
  });
  const data = response.data;
  const results = data.results || [];
  return {
    query: data.query,
    mode: data.mode,
    result_count: results.length,
    results,
    top_result_title: results[0] ? results[0].title : null,
    top_result_url: results[0] ? results[0].url : null,
  };
};

module.exports = {
  key: 'search',
  noun: 'Search',
  display: {
    label: 'Search the Web',
    description: 'Searches the web with Keenable and returns ranked results with title, URL, snippet and dates.',
  },
  operation: {
    perform,
    inputFields: [
      { key: 'query', label: 'Query', required: true, helpText: 'What to search for.' },
      {
        key: 'mode',
        label: 'Mode',
        choices: { pro: 'Pro (higher quality)', realtime: 'Realtime (fastest)' },
        helpText: 'Defaults to Pro.',
      },
      { key: 'max_results', label: 'Max Results', type: 'integer', helpText: '1-50. Defaults to 10.' },
      { key: 'site', label: 'Site', helpText: 'Only return results from this domain, e.g. `github.com`.' },
      { key: 'exclude_domains', label: 'Exclude Domains', list: true, helpText: 'Never return results from these domains.' },
      { key: 'published_after', label: 'Published After', helpText: '`YYYY-MM-DD`, ISO 8601, or relative like `7d`.' },
      { key: 'published_before', label: 'Published Before', helpText: '`YYYY-MM-DD` or ISO 8601.' },
    ],
    sample: {
      query: 'keenable',
      mode: 'pro',
      result_count: 1,
      results: [
        {
          title: 'Keenable',
          url: 'https://keenable.ai/',
          snippet: 'Web search built for AI agents.',
          published_at: '2026-10-30T00:00:00Z',
        },
      ],
      top_result_title: 'Keenable',
      top_result_url: 'https://keenable.ai/',
    },
    outputFields: [
      { key: 'query', label: 'Query' },
      { key: 'mode', label: 'Mode' },
      { key: 'result_count', label: 'Result Count', type: 'integer' },
      { key: 'results[]title', label: 'Result Title' },
      { key: 'results[]url', label: 'Result URL' },
      { key: 'results[]snippet', label: 'Result Snippet' },
      { key: 'top_result_title', label: 'Top Result Title' },
      { key: 'top_result_url', label: 'Top Result URL' },
    ],
  },
};
