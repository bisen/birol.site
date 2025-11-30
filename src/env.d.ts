/// <reference path="../.astro/types.d.ts" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

interface Env {
	GALLERY_BUCKET: R2Bucket;
	ADMIN_PASSWORD: string;
}

declare namespace App {
	interface Locals extends Runtime {}
}
