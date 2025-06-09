# Cloudflare Pages Deployment Guide

This guide explains how to deploy your Astro site to Cloudflare Pages.

## Prerequisites

- A Cloudflare account (free tier works fine)
- Your site code pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### 1. Connect Your Repository

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Pages** in the sidebar
3. Click **Create a project**
4. Choose **Connect to Git**
5. Select your repository and authorize Cloudflare

### 2. Configure Build Settings

When setting up the project, use these build settings:

- **Project name**: `birol-site` (or your preferred name)
- **Production branch**: `master` (or `main`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty if your Astro project is in the root)

### 3. Environment Variables (if needed)

If you plan to use environment variables:

- Go to **Settings** > **Environment variables**
- Add any required variables for your site

### 4. Custom Domain (Optional)

To use your custom domain `birol.site`:

1. Go to **Custom domains** tab in your Pages project
2. Click **Set up a custom domain**
3. Enter `birol.site`
4. Follow the DNS configuration instructions
5. Also add `www.birol.site` if desired

## Build Configuration

The site is configured with:
- **Output**: `hybrid` (supports both static and server-side rendering)
- **Adapter**: `@astrojs/cloudflare` for Cloudflare Pages compatibility
- **Platform Proxy**: Enabled for local development with Cloudflare features

## Automatic Deployments

- Every push to your main branch will trigger a new deployment
- Preview deployments are created for pull requests
- Build logs are available in the Cloudflare dashboard

## Local Development with Cloudflare Features

To test Cloudflare-specific features locally:

```bash
npm run dev
```

The Cloudflare adapter provides platform proxy support for testing locally.

## Build Commands

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Performance Optimizations

The site includes:
- Optimized caching headers in `_headers` file
- Static asset optimization
- Image optimization with Sharp
- Automatic sitemap generation

## Troubleshooting

### Build Fails
- Check that all dependencies are listed in `package.json`
- Ensure Node.js version compatibility (18.20.8+ or 20.3.0+ or 22.0.0+)

### Content Not Updating
- Check that content files are committed to your repository
- Verify the build completed successfully in Cloudflare dashboard

### Custom Domain Issues
- Ensure DNS records are correctly configured
- Wait for DNS propagation (can take up to 24 hours)

## Useful Links

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Cloudflare Adapter Documentation](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)