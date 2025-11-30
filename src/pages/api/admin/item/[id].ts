import type { APIRoute } from 'astro';
import { verifyToken } from '../auth';

// Get single item details
export const GET: APIRoute = async ({ params, request, locals }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;
		const adminPassword = locals.runtime.env.ADMIN_PASSWORD;
		const id = params.id;

		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		if (!verifyToken(token, adminPassword)) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (!bucket || !id) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const metadataObj = await bucket.get(`${id}/metadata.json`);
		if (!metadataObj) {
			return new Response(JSON.stringify({ error: 'Item not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const metadata = JSON.parse(await metadataObj.text());

		return new Response(JSON.stringify({ id, ...metadata }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to get item' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

// Update item metadata
export const PUT: APIRoute = async ({ params, request, locals }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;
		const adminPassword = locals.runtime.env.ADMIN_PASSWORD;
		const id = params.id;

		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		if (!verifyToken(token, adminPassword)) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (!bucket || !id) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Get existing metadata
		const metadataObj = await bucket.get(`${id}/metadata.json`);
		if (!metadataObj) {
			return new Response(JSON.stringify({ error: 'Item not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const existingMetadata = JSON.parse(await metadataObj.text());
		const updates = await request.json();

		// Merge updates with existing metadata
		const newMetadata = {
			...existingMetadata,
			title: updates.title ?? existingMetadata.title,
			date: updates.date ?? existingMetadata.date,
			medium: updates.medium ?? existingMetadata.medium,
			notes: updates.notes ?? existingMetadata.notes,
			collection: updates.collection ?? existingMetadata.collection,
			updatedAt: new Date().toISOString()
		};

		await bucket.put(`${id}/metadata.json`, JSON.stringify(newMetadata, null, 2), {
			httpMetadata: {
				contentType: 'application/json'
			}
		});

		return new Response(JSON.stringify({ success: true, metadata: newMetadata }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to update item' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

// Delete item
export const DELETE: APIRoute = async ({ params, request, locals }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;
		const adminPassword = locals.runtime.env.ADMIN_PASSWORD;
		const id = params.id;

		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		if (!verifyToken(token, adminPassword)) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (!bucket || !id) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Get metadata to find the filename
		const metadataObj = await bucket.get(`${id}/metadata.json`);
		if (!metadataObj) {
			return new Response(JSON.stringify({ error: 'Item not found' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const metadata = JSON.parse(await metadataObj.text());

		// Delete both the image and metadata
		await bucket.delete(`${id}/${metadata.filename}`);
		await bucket.delete(`${id}/metadata.json`);

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Failed to delete item' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
