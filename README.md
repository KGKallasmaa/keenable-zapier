# Keenable for Zapier

A [Zapier Platform CLI](https://docs.zapier.com/platform/build-cli/overview) integration for [Keenable](https://keenable.ai), a web search API built for AI agents.

Actions:

- **Search the Web**: `POST https://api.keenable.ai/v1/search`. Takes a query, plus optional mode (`pro`/`realtime`), max results, site, excluded domains and published-date filters.
- **Fetch Page**: `GET https://api.keenable.ai/v1/fetch`. Returns a URL's content as clean Markdown. Optional max characters, live fetch and an extraction instruction.

Auth: a Keenable API key, sent in the `X-API-Key` header. It's tested against `GET /v1/auth/user`.

## Develop

```bash
npm install
KEENABLE_API_KEY=... npx jest      # live tests run only when a key is set
npm i -g zapier-platform-cli
zapier login                        # or ZAPIER_DEPLOY_KEY
zapier register "Keenable"          # first time only
zapier push
```

Spec: https://api.keenable.ai/openapi.json · Docs: https://docs.keenable.ai
