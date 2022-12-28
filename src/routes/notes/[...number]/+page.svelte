<script lang="ts">
	import NavBar from '$lib/components/NavBar.svelte';
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let data: any;
	let isKorean = false;

	onMount(() => {
		isKorean = (window.navigator.languages || []).some(
			(language) => language === 'ko' || language.split('-')[0] === 'ko'
		);
	});
</script>

<NavBar lang={isKorean ? 'ko' : 'en'} />

<svelte:head>
	<title>{data.strippedBody}</title>
	<meta property="og:title" content={data.strippedBody} />
	<meta name="twitter:title" content={data.strippedBody} />
	<meta property="og:image" content={data.ogImage} />
	<meta name="twitter:image" content={data.ogImage} />
</svelte:head>

<div class="mt-4 p-6 max-w-lg mx-auto prose">
	{@html marked.parse(data.body)}

	<a href={data.html_url} class="no-underline opacity-50 hover:opacity-100"
		>원본 ➡️ {data.html_url}</a
	>
</div>
