<script>
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';

	export let title;
	export let created_at;
	export let lang;

	let formattedDate = new Intl.DateTimeFormat().format(new Date(created_at));
</script>

<NavBar {lang} />

<article class="mt-16 p-6 prose prose-lg sm:prose-xl md:prose-2xl w-full">
	<h1 class="">{title}</h1>
	<p class="opacity-75">{formattedDate}</p>
	<div class="w-full h-4 sm:h-8" />
	<slot />
</article>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />

<style>
	article :global(pre) {
		@apply shadow-md;
	}
</style>
