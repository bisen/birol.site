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

		// Get the thumbnail
		const thumbObj = await bucket.get(`${id}/thumbnail.webp`);

		// Fall back to main image if no thumbnail exists
		if (!thumbObj) {
			const metadataObj = await bucket.get(`${id}/metadata.json`);
			if (!metadataObj) {
				return new Response('Image not found', { status: 404 });
			}

			const metadata = JSON.parse(await metadataObj.text());
			const filename = metadata.filename;

			if (!filename) {
				return new Response('Image filename not found', { status: 404 });
			}

			const imageObj = await bucket.get(`${id}/${filename}`);
			if (!imageObj) {
				return new Response('Image file not found', { status: 404 });
			}

			const headers = new Headers();
			const contentType = imageObj.httpMetadata?.contentType || 'image/webp';
			headers.set('Content-Type', contentType);
			headers.set('Cache-Control', 'public, max-age=31536000');

			return new Response(imageObj.body, { headers });
		}

		const headers = new Headers();
		headers.set('Content-Type', 'image/webp');
		headers.set('Cache-Control', 'public, max-age=31536000');

		return new Response(thumbObj.body, { headers });
	} catch (error) {
		console.error('Error fetching thumbnail:', error);
		return new Response('Failed to fetch thumbnail', { status: 500 });
	}
};
