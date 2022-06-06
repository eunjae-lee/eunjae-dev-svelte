<script context="module" lang="ts">
	import type { LoadEvent, LoadOutput } from '@sveltejs/kit';
	import { REDIRECT_MAP } from '../redirect';

	export function load({ error, status, url }: LoadEvent): LoadOutput {
		if (status === 404 && REDIRECT_MAP[url.pathname]) {
			return {
				status: 307,
				redirect: REDIRECT_MAP[url.pathname],
			};
		}
		return {
			props: {
				title: `${status}: ${error!.message}`,
			},
		};
	}
</script>

<script>
	export let title;
</script>

{#if title}
	<h1>{title}</h1>
{/if}
