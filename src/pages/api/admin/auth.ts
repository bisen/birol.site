import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, locals }) => {
	try {
		const { password } = await request.json();
		const adminPassword = await locals.runtime.env.ADMIN_PASSWORD?.get();

		if (!adminPassword) {
			return new Response(JSON.stringify({ error: 'Admin not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (password === adminPassword) {
			// Generate a simple session token (in production, use proper JWT)
			const token = btoa(`${Date.now()}:${adminPassword}`);

			return new Response(JSON.stringify({ success: true, token }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify({ error: 'Invalid password' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Auth failed' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};

// Helper to verify token in other endpoints
export function verifyToken(token: string | null, adminPassword: string): boolean {
	if (!token || !adminPassword) return false;

	try {
		const decoded = atob(token);
		const [timestamp, pwd] = decoded.split(':');
		const tokenAge = Date.now() - parseInt(timestamp);

		// Token valid for 24 hours
		if (tokenAge > 24 * 60 * 60 * 1000) return false;

		return pwd === adminPassword;
	} catch {
		return false;
	}
}
