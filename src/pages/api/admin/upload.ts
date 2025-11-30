import type { APIRoute } from 'astro';
import { verifyToken } from './auth';

export const POST: APIRoute = async ({ request, locals }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;
		const adminPassword = await locals.runtime.env.ADMIN_PASSWORD?.get();

		// Verify auth
		const token = request.headers.get('Authorization')?.replace('Bearer ', '');
		if (!verifyToken(token, adminPassword)) {
			return new Response(JSON.stringify({ error: 'Unauthorized' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (!bucket) {
			return new Response(JSON.stringify({ error: 'R2 bucket not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const formData = await request.formData();
		const file = formData.get('file') as File;
		const thumbnail = formData.get('thumbnail') as File;
		const title = formData.get('title') as string;
		const date = formData.get('date') as string;
		const medium = formData.get('medium') as string;
		const notes = formData.get('notes') as string;
		const collection = formData.get('collection') as string;

		if (!file) {
			return new Response(JSON.stringify({ error: 'No file provided' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// Find the next available ID
		const listed = await bucket.list();
		const existingIds = new Set<number>();

		for (const object of listed.objects) {
			const match = object.key.match(/^(\d+)\//);
			if (match) {
				existingIds.add(parseInt(match[1]));
			}
		}

		let nextId = 1;
		while (existingIds.has(nextId)) {
			nextId++;
		}

		const id = String(nextId);
		const filename = file.name;

		// Upload the image
		const arrayBuffer = await file.arrayBuffer();
		await bucket.put(`${id}/${filename}`, arrayBuffer, {
			httpMetadata: {
				contentType: file.type
			}
		});

		// Upload the thumbnail if provided
		if (thumbnail) {
			const thumbBuffer = await thumbnail.arrayBuffer();
			await bucket.put(`${id}/thumbnail.webp`, thumbBuffer, {
				httpMetadata: {
					contentType: 'image/webp'
				}
			});
		}

		// Create and upload metadata
		const metadata = {
			title: title || `Untitled ${id}`,
			date: date || new Date().toISOString().split('T')[0],
			medium: medium || '',
			notes: notes || '',
			filename,
			collection: collection || 'art',
			uploadedAt: new Date().toISOString()
		};

		await bucket.put(`${id}/metadata.json`, JSON.stringify(metadata, null, 2), {
			httpMetadata: {
				contentType: 'application/json'
			}
		});

		return new Response(JSON.stringify({ success: true, id, metadata }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		console.error('Upload error:', error);
		return new Response(JSON.stringify({ error: 'Upload failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
