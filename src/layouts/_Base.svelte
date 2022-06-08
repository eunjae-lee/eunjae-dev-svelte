<script>
	import Footer from '$lib/components/Footer.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';
	import '../prism-one-dark.css';

	export let title;
	export let excerpt;
	export let created_at;
	export let lang;
	export let path;

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
	<h1 class="">{title}</h1>
	<p class="opacity-75">{formattedDate}</p>
	<div class="w-full h-4 sm:h-8" />
	<slot />
</article>

<div class="divider mt-16 mb-8" />
<Footer {lang} />

<style>
	article :global(pre) {
		@apply shadow-md;
	}
</style>
