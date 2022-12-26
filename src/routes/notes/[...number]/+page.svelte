<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	export let data: any;
	if (browser) {
		goto(data.html_url, { replaceState: true });
	}
</script>

<svelte:head>
	<title>{data.body}</title>
	<meta property="og:title" content={data.body} />
	<meta name="twitter:title" content={data.body} />
	<meta property="og:image" content={data.ogImage} />
	<meta name="twitter:image" content={data.ogImage} />
</svelte:head>
