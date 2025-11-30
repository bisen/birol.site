import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, locals, request }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;
		const id = params.id;

		if (!bucket) {
			return new Response('R2 bucket not configured', { status: 500 });
		}

		if (!id) {
			return new Response('Missing image ID', { status: 400 });
		}

		// Anti-scraping: Check referer header
		const referer = request.headers.get('referer');
		const host = request.headers.get('host');

		// Allow requests from same origin or no referer (direct browser requests)
		// Block requests from other domains
		if (referer) {
			const refererUrl = new URL(referer);
			const allowedHosts = [host, 'localhost', '127.0.0.1'].filter(Boolean);
			const isAllowed = allowedHosts.some(h => refererUrl.host.includes(h as string));

			if (!isAllowed) {
				return new Response('Forbidden', { status: 403 });
			}
		}

		// First, get the metadata to find the filename
		const metadataObj = await bucket.get(`${id}/metadata.json`);
		if (!metadataObj) {
			return new Response('Image not found', { status: 404 });
		}

		const metadata = JSON.parse(await metadataObj.text());
		const filename = metadata.filename;

		if (!filename) {
			return new Response('Image filename not found', { status: 404 });
		}

		// Get the actual image
		const imageObj = await bucket.get(`${id}/${filename}`);
		if (!imageObj) {
			return new Response('Image file not found', { status: 404 });
		}

		const headers = new Headers();

		// Set content type
		const contentType = imageObj.httpMetadata?.contentType || getContentType(filename);
		headers.set('Content-Type', contentType);

		// Prevent caching to make scraping harder
		headers.set('Cache-Control', 'private, no-store, max-age=0');

		// Prevent embedding in iframes on other sites
		headers.set('X-Frame-Options', 'SAMEORIGIN');

		// Content Security Policy
		headers.set('Content-Security-Policy', "frame-ancestors 'self'");

		// Return image as blob
		return new Response(imageObj.body, { headers });
	} catch (error) {
		console.error('Error fetching image:', error);
		return new Response('Failed to fetch image', { status: 500 });
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
