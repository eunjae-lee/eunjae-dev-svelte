<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';
	import { SERIES } from '../../../series';

	export function load({ params, props }: LoadEvent) {
		const { series } = params;
		if (SERIES[series]) {
			return {
				props: {
					...props,
					...SERIES[series],
					series,
				},
			};
		} else {
			return {
				status: 404,
			};
		}
	}
</script>

<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import type { PostMeta } from '$lib/types';

	export let title: string;
	export let description: string;
	export let posts: PostMeta[];
	export let series: string;

	let url = `https://eunjae.dev/post/${series}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Eunjae Lee" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<!-- <meta property="og:image" content={ogImage} /> -->

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<!-- <meta name="twitter:image" content={ogImage} /> -->
</svelte:head>

<NavBar lang="en" />

<div class="mt-4 p-6">
	<h1 class="mt-16 text-4xl sm:text-[3rem] font-bold">{title}</h1>
	<p class="mt-4 italic opacity-75">
		{description}
	</p>
	<ul class="mt-8">
		{#each posts as post}
			<li class="mt-12">
				<a href={post.path}>
					<div>
						<h2 class="text-2xl font-bold opacity-90 hover:opacity-100">{post.meta.title}</h2>
						{#if post.meta.excerpt}
							<p class="mt-2 opacity-75">{post.meta.excerpt}</p>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="en" />
