import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals }) => {
	try {
		const bucket = locals.runtime.env.ASSETS_BUCKET;
		const path = params.path;

		if (!bucket) {
			return new Response('R2 bucket not configured', { status: 500 });
		}

		if (!path) {
			return new Response('Missing path', { status: 400 });
		}

		const object = await bucket.get(path);
		if (!object) {
			return new Response('Not found', { status: 404 });
		}

		const headers = new Headers();
		const contentType = object.httpMetadata?.contentType || getContentType(path);
		headers.set('Content-Type', contentType);
		headers.set('Cache-Control', 'public, max-age=31536000, immutable');

		return new Response(object.body, { headers });
	} catch (error) {
		console.error('Error fetching asset:', error);
		return new Response('Failed to fetch asset', { status: 500 });
	}
};

function getContentType(filename: string): string {
	const ext = filename.split('.').pop()?.toLowerCase();
	const types: Record<string, string> = {
		'jpg': 'image/jpeg',
		'jpeg': 'image/jpeg',
		'png': 'image/png',
		'gif': 'image/gif',
		'webp': 'image/webp',
		'avif': 'image/avif',
		'svg': 'image/svg+xml'
	};
	return types[ext || ''] || 'application/octet-stream';
}
