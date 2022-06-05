<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	const LANG = 'en';

	export async function load({ fetch, params }: LoadEvent) {
		const response = await fetch(`/posts-${LANG}?slug=${encodeURIComponent(params.slug)}`, {
			headers: { accept: 'application/json' },
		});
		const post = (await response.json()).post;
		return {
			status: 200,
			props: {
				component: (await import(`../../../../posts/${LANG}/${params.slug}/index.svx`)).default,
			},
		};
	}
</script>

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let component: SvelteComponent;
</script>

<svelte:component this={component} />
