import type { LoadEvent } from '@sveltejs/kit';

export async function load({ params }: LoadEvent) {
	return {
		component: (await import(`../../../../../posts/${params.series}/${params.slug}/index.svx`))
			.default,
		path: `/post/${params.series}/${params.slug}`,
	};
}
