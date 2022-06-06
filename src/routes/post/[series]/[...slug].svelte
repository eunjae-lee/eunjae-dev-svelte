<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';

	export async function load({ fetch, params }: LoadEvent) {
		return {
			status: 200,
			props: {
				component: (await import(`../../../../posts/${params.series}/${params.slug}/index.svx`))
					.default,
				path: `/post/${params.series}/${params.slug}`,
			},
		};
	}
</script>

<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	export let component: SvelteComponent;
	export let path: string;
</script>

<svelte:component this={component} {path} />
