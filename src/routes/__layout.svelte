<script>
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores';
	import '../app.css';
	import { setTheme } from '$lib/helpers';

	// onMount(() => {
	// 	const theme = localStorage.getItem('theme');
	// 	if (theme === 'light' || theme === 'dark' || theme === 'system') {
	// 		// @ts-ignore
	// 		document.querySelector('html').setAttribute('data-theme', theme);
	// 	}
	// });
	onMount(() => {
		if ($theme === undefined) {
			const themeFromLocalStorage = localStorage.getItem('theme');
			if (['light', 'dark', 'system'].includes(themeFromLocalStorage)) {
				$theme = themeFromLocalStorage;
			} else {
				$theme = 'system';
			}
		}
		setTheme($theme);
	});
</script>

<div class="flex flex-col justify-center items-start max-w-3xl mx-auto">
	<slot />
</div>

<style>
	:global(:root) {
		@apply bg-[#f9fafb] dark:bg-[#292929];
	}
	:global(:root[data-theme='light']) {
		@apply bg-[#f9fafb];
	}
	:global(:root[data-theme='dark']) {
		@apply bg-[#292929];
	}

	:global(.card-body) {
		@apply p-4;
	}
	:global(.card-title) {
		@apply m-0;
	}
</style>
