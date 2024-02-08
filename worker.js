import { OAuthApp, createWebWorkerHandler } from '@octokit/oauth-app';

export default {
    async fetch(request, env, ctx) {
        const app = new OAuthApp({
			clientType: 'oauth-app',
            clientId: env.CLIENT_ID,
            clientSecret: env.CLIENT_SECRET,
        });
		const handleRequest = createWebWorkerHandler(app);

		const octoResponse = await handleRequest(request);
        const response = octoResponse ?? new Response('not found', { status: 404 });

        response.headers.set('access-control-allow-origin', env.CORS ?? '*');
        return response;
    }
}