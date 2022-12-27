<script lang="ts">
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';

	let isKorean = false;

	onMount(() => {
		isKorean = (window.navigator.languages || []).some(
			(language) => language === 'ko' || language.split('-')[0] === 'ko'
		);
	});
</script>

<NavBar lang={isKorean ? 'ko' : 'en'} />

<div class="my-32 flex flex-col gap-8 w-full justify-center items-center">
	<div class="flex items-center gap-2 text-base-content text-2xl">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="stroke-current flex-shrink-0 h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
			/></svg
		>
		{#if $page.status === 404}
			<span>Page not found.</span>
		{:else}
			<span>Error {$page.status}</span>
		{/if}
	</div>
	<div>
		<a href="/" class="btn">Go home</a>
	</div>
</div>
