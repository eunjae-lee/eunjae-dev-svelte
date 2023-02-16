<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import type { Lang, PostMeta } from '$lib/types';
	import { getOgImage } from '$lib/helpers';
	import { Tag } from 'lucide-svelte';

	type Data = {
		title: string;
		description: string;
		lang: Lang;
		posts: PostMeta[];
		series: string;
		tags: Array<{ name: string; count: number }>;
	};
	export let data: Data;
	let { title, description, lang, posts, series, tags } = data;

	let url = `https://eunjae.dev/post/${series}`;
	let ogImage = getOgImage({ title });
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="Eunjae Lee" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={url} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar {lang} />

<div class="mt-4 p-6">
	<h1 class="mt-16 text-4xl sm:text-[3rem] font-bold">{title}</h1>
	<p class="mt-4 italic opacity-75">
		{description}
	</p>
	<ul class="mt-12 -ml-4">
		{#each tags as tag}
			<li class="mr-1 inline-flex items-center">
				<a
					href={`/post/tweet/tag/${tag.name}`}
					class="btn btn-ghost btn-sm shrink-0 opacity-50 hover:opacity-100"
					><Tag size={14} opacity={75} /><span class="ml-2 mr-1">{tag.name}</span><span
						class="font-light text-xs">({tag.count})</span
					></a
				>
			</li>
		{/each}
	</ul>
	<ul class="mt-12">
		{#each posts as post}
			<li class="mt-12">
				<div>
					<a href={post.path}>
						<h2 class="text-2xl font-bold opacity-75 hover:opacity-100">{post.meta.title}</h2>
					</a>
					{#if post.meta.excerpt}
						<p class="mt-2 opacity-75">{post.meta.excerpt}</p>
					{/if}
					{#if post.meta.tags}
						<p class="mt-1 text-sm opacity-50 flex gap-1 items-center">
							<Tag size={12} />
							<span class="uppercase text-xs">
								{post.meta.tags.join(', ')}
							</span>
						</p>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
</div>

<div class="divider mt-16 mb-8" />
<Footer {lang} />
