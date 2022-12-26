<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';
	import type { PostMeta } from '$lib/types';

	type Data = { posts: PostMeta[] };
	export let data: Data;

	let title = '글 목록';
	let url = `https://eunjae.dev/post/ko`;
	let ogImage = getOgImage({ title });
</script>

<svelte:head>
	<title>{title}</title>
	<!-- <meta name="description" content={description} /> -->
	<meta name="author" content="Eunjae Lee" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<!-- <meta property="og:description" content={description} /> -->
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<!-- <meta name="twitter:description" content={description} /> -->
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar lang="ko" />

<div class="mt-4 p-6">
	<h1 class="mt-16 text-4xl sm:text-[3rem] font-bold">글 목록</h1>
	<ul class="mt-8">
		{#each data.posts as post}
			<li class="mt-12">
				<a href={post.path}>
					<div>
						<h2 class="text-2xl font-bold opacity-90 hover:opacity-100">{post.meta.title}</h2>
						{#if post.meta.excerpt}
							<p class="mt-2 opacity-75">{post.meta.excerpt}</p>
						{/if}
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />
