import type { APIRoute } from 'astro';

export interface GalleryItem {
	id: string;
	title: string;
	date: string;
	medium?: string;
	notes?: string;
	filename: string;
	collection?: string;
	uploadedAt?: string;
}

export const GET: APIRoute = async ({ locals, request }) => {
	try {
		const bucket = locals.runtime.env.GALLERY_BUCKET;

		if (!bucket) {
			return new Response(JSON.stringify({ error: 'R2 bucket not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		// List all objects to find metadata.json files
		const listed = await bucket.list();
		const items: GalleryItem[] = [];
		const folderIds = new Set<string>();

		// Extract unique folder IDs (1, 2, 3, etc.)
		for (const object of listed.objects) {
			const match = object.key.match(/^(\d+)\//);
			if (match) {
				folderIds.add(match[1]);
			}
		}

		// Fetch metadata for each folder
		for (const id of folderIds) {
			try {
				const metadataObj = await bucket.get(`${id}/metadata.json`);
				if (metadataObj) {
					const metadataText = await metadataObj.text();
					const metadata = JSON.parse(metadataText);
					items.push({
						id,
						title: metadata.title || `Untitled ${id}`,
						date: metadata.date || '',
						medium: metadata.medium,
						notes: metadata.notes,
						filename: metadata.filename || '',
						collection: metadata.collection,
						uploadedAt: metadata.uploadedAt
					});
				}
			} catch (e) {
				// Skip folders without valid metadata
				console.error(`Error reading metadata for folder ${id}:`, e);
			}
		}

		// Sort by ID descending (newest first, assuming higher ID = newer)
		items.sort((a, b) => parseInt(b.id) - parseInt(a.id));

		// Optional: filter by collection
		const url = new URL(request.url);
		const collection = url.searchParams.get('collection');
		const filteredItems = collection
			? items.filter(item => item.collection === collection)
			: items;

		return new Response(JSON.stringify({ items: filteredItems }), {
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'public, max-age=60'
			}
		});
	} catch (error) {
		console.error('Error listing gallery items:', error);
		return new Response(JSON.stringify({ error: 'Failed to list items' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
