<script>
	import { onMount } from 'svelte';
	import '../app.css';
	import { theme } from '$lib/stores';
	import { setTheme } from '$lib/helpers';

	onMount(() => {
		if ($theme === undefined) {
			const themeFromLocalStorage = localStorage.getItem('theme');
			if (themeFromLocalStorage && ['light', 'dark', 'system'].includes(themeFromLocalStorage)) {
				// @ts-ignore
				$theme = themeFromLocalStorage;
			} else {
				$theme = 'system';
			}
		}
		if ($theme && ['light', 'dark', 'system'].includes($theme)) {
			setTheme($theme);
		}
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
	:global(:root[data-theme='halloween']) {
		@apply bg-[#292929];
	}
</style>
