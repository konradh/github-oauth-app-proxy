# GitHub OAuth App Proxy

This is a simple proxy for GitHub's Oauth API endpoints.
It enables browser apps to use the GitHub OAuth provider without including the OAuth client secret in the application.

As this is a simple wrapper around [`auth-app.js`](https://github.com/octokit/auth-app.js), look there for more documentation. It can be used with [`octokit-auth-oauth-user-client.js`](https://github.com/baoshan/octokit-auth-oauth-user-client.js), if you want an integration with GitHub's Octokit.

## Why is this necessary?

The GitHub OAuth provider does not support fully public clients without client secret. The appropriate flow for fully public clients would be the Authorization code flow with PKCE.

From [GitHub Docs](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps):

> The PKCE (Proof Key for Code Exchange) parameters code_challenge and code_challenge_method are not supported at this time. CORS pre-flight requests (OPTIONS) are not supported at this time.

As you shouldn't expose client secrets, you can use this proxy to add the client secret to requests without revealing it to applications.

## Installation

```shell
npm install
```

## Local node server: `server.js`

If you want to host this proxy yourself, or for a local deployment, use [`server.js`](server.js).

```shell
npm run server
```

## Worker: `worker.js`

For use with Cloudflare workers, there is [`worker.js`](worker.js). Don't forget to set the `CLIENT_ID` and `CLIENT_SECRET` environment variables for the worker.

Deploy the worker using [`wrangler`](https://developers.cloudflare.com/workers/wrangler/):

```shell
npm run worker-deploy -- --name '<choose a name>'
```

## Configuration with environment variables

**Required**

- `CLIENT_ID`: Oauth App client id
- `CLIENT_SECRET`: Oauth App client secret

**Optional**

- `CORS` (worker only): sets the value of the CORS header in the responses
- `HOST` (server only): address to bind the server to
- `PORT` (server only): port to listen on
