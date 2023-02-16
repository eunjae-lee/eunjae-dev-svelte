<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';
	import { Tag } from 'lucide-svelte';
	import '../prism-one-dark.css';

	export let title;
	export let excerpt;
	export let created_at;
	export let lang;
	export let path;
	export let tags;
	export let series;

	let url = `https://eunjae.dev${path}`;
	let formattedDate = new Intl.DateTimeFormat().format(new Date(created_at));
	let ogImage = getOgImage({ title });
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={excerpt} />
	<meta name="author" content="Eunjae Lee" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={excerpt} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={excerpt} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar {lang} />

<article class="mt-16 p-6 prose prose-lg sm:prose-xl md:prose-2xl w-full">
	<slot name="before-title" />
	<h1>{title}</h1>
	<p class="opacity-75 text-lg flex items-center">
		<span>{formattedDate}</span>
		{#if series && tags && tags.length > 0}
			<span class="mx-2">·</span>
			<Tag size={14} />
			{#each tags as tag}
				<a
					href={`/post/${series}/tag/${tag}`}
					class="opacity-75 hover:opacity-100 uppercase ml-1 mr-3">{tag}</a
				>
			{/each}
		{/if}
	</p>
	<div class="w-full h-4 sm:h-8" />
	<slot />
</article>

<slot name="after-article" />

<div class="divider mt-16 mb-8" />
<Footer {lang} />

<style>
	article :global(pre) {
		@apply shadow-md;
	}

	article :global(p > code) {
		@apply border border-base-content border-opacity-50 rounded-md font-normal text-primary;
	}

	article :global(p > a) {
		@apply w-full truncate inline-block;
	}

	h1 {
		word-wrap: break-word;
		word-break: keep-all;
	}
</style>
