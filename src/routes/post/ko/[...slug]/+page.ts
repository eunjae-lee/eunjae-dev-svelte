import type { LoadEvent } from '@sveltejs/kit';

const LANG = 'ko';

export async function load({ params }: LoadEvent) {
	return {
		component: (await import(`../../../../../posts/${LANG}/${params.slug}/index.md`)).default,
		path: `/post/${LANG}/${params.slug}`,
	};
}
