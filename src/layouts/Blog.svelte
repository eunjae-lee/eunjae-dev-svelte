<script>
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';

	export let title;
	export let created_at;
	export let lang;

	let formattedDate = new Intl.DateTimeFormat().format(new Date(created_at));
</script>

<NavBar {lang} />

<div class="mt-4 p-6 prose sm:prose-xl max-w-none">
	<h1 class="my-8 sm:mt-16 sm:mb-4">{title}</h1>
	<p class="opacity-75">{formattedDate}</p>
	<div class="w-full h-4 sm:h-8" />
	<slot />
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />
