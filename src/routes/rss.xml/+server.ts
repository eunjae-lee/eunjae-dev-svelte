// This is an endpoint that generates a basic rss feed for your posts.
// It is OK to delete this file if you don't want an RSS feed.
// credit: https://scottspence.com/posts/make-an-rss-feed-with-sveltekit#add-posts-for-the-rss-feed

import { getPosts } from '$lib/server/allPosts';

const name = 'Eunjae Lee';
const website = 'https://eunjae.dev';
const websiteDescription = `Eunjae Lee`;
const postsUrl = `https://eunjae.dev/post`;

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function GET({ url }) {
	const slug = url.searchParams.get('slug');
	// helper for vscode syntax highlighting
	const xml = String.raw;

	let posts = getPosts();
	if (slug) {
		posts = posts.filter((post) => post.slug.startsWith(slug));
	}

	const body = xml`
  <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
<channel>
  <title>${name}</title>
  <link>${website}</link>
  <description>${websiteDescription}</description>
  <atom:link href="${website}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
		.map(
			(post) =>
				xml`
        <item>
          <guid>${postsUrl}/${post.slug}</guid>
          <title>${post.title}</title>
          <description>${post.preview.text}</description>
          <link>${postsUrl}/${post.slug}</link>
          <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      </item>
    `
		)
		.join('')}
</channel>
</rss>`;

	return new Response(body, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=3600',
			'Content-Type': 'application/xml',
		},
	});
}
