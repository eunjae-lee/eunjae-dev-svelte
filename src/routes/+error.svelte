<script lang="ts">
	import { page } from '$app/stores';
	import NavBar from '$lib/components/NavBar.svelte';
	import { isKoreanBrowser } from '$lib/helpers';
	import { onMount } from 'svelte';
	import { AlertTriangle } from 'lucide-svelte';

	let isKorean = false;

	onMount(() => {
		isKorean = isKoreanBrowser();
	});
</script>

<NavBar lang={isKorean ? 'ko' : 'en'} />

<div class="my-32 flex flex-col gap-8 w-full justify-center items-center">
	<div class="flex items-center gap-2 text-base-content text-2xl">
		<AlertTriangle />
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
