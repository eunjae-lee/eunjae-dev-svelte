// This is an endpoint that generates a basic sitemap for the index page and all posts.
// It's helpful for SEO but does require you to keep it updated to reflect the routes of your website.
// It is OK to delete this file if you'd rather not bother with it.

import { getPosts } from '$lib/server/allPosts';

const website = 'https://eunjae.dev';
const postsUrl = `https://eunjae.dev/post`;

export async function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8" ?>
  <urlset
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
    xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
    xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
    xmlns:pagemap="http://www.google.com/schemas/sitemap-pagemap/1.0"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    <url>
      <loc>${website}</loc>
      <priority>1.0</priority>
    </url>
    ${getPosts()
			.map(
				(post) => `<url>
          <loc>${postsUrl}/${post.slug}</loc>
          <lastmod
            >${
							post.updated_at
								? new Date(post.updated_at).toISOString()
								: new Date(post.created_at).toISOString()
						}</lastmod
          >
          <changefreq>monthly</changefreq>
          <priority>1.0</priority>
        </url>`
			)
			.join('')}
  </urlset>`;

	return new Response(body, {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=600`,
			'Content-Type': 'application/xml',
		},
	});
}
