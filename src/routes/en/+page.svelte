<script lang="ts">
	import Bio from '$lib/components/Bio.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LinkedCard from '$lib/components/LinkedCard.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';
	import type { PostMeta } from '$lib/types';
	import type { LoadEvent } from '@sveltejs/kit';

	type Data = {
		posts: PostMeta[];
	};
	export let data: Data;
	let ogImage = getOgImage({ title: 'Eunjae Lee' });

	let series = [
		{
			title: 'Maison',
			url: '/post/maison',
		},
		{
			title: 'Mental Health',
			url: '/post/mental-health',
		},
	];
</script>

<svelte:head>
	<title>Eunjae Lee</title>
	<meta
		name="description"
		content="Web developer at Storyblok by day. Indie hacker by night, working on courses and side projects."
	/>
	<meta name="author" content="Eunjae Lee" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://eunjae.dev/en" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Eunjae Lee" />
	<meta
		property="og:description"
		content="Web developer at Storyblok by day. Indie hacker by night, working on courses and side projects."
	/>
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://eunjae.dev/en" />
	<meta name="twitter:title" content="Eunjae Lee" />
	<meta
		name="twitter:description"
		content="Web developer at Storyblok by day. Indie hacker by night, working on courses and side projects."
	/>
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar lang="en" />

<div class="mt-4 p-6">
	<Bio
		name="Eunjae Lee"
		title="Raised in South Korea, now in France."
		description="Web developer at Storyblok by day. Indie hacker by night, working on courses and side projects."
	/>
	<h2 class="mt-24 text-2xl font-bold">Projects</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LinkedCard
			href="https://quill.so"
			title="Quill"
			description="Quill is a low-code website generator based on Craft docs."
		/>
		<LinkedCard
			href="https://github.com/algolia/shipjs"
			title="Ship.js"
			description="Opinionated release tool for JavaScript packages"
		/>
		<LinkedCard
			href="https://gomscope.com"
			title="GomScope"
			description="GomScope is a mac app that supercharges your Bear notes. (sunset)"
		/>
	</div>
	<h2 class="mt-24 text-2xl font-bold">Courses & Talks</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LinkedCard
			href="https://courses.eunjae.dev/electron-with-next-js"
			title="Build an Electron App with Next.js"
			description="In this paid course, I explain how I built an Electron app with Next.js from scratch. I
    talk about neat tips and it comes with a full source code of GomScope."
		/>
		<LinkedCard
			href="https://www.youtube.com/watch?v=3L8R4pG81vQ"
			title="How to release open source library"
			description="In this HolyJS 2020 talk, I talk about how I at Algolia release libraries with a refined
    process and a tool."
		/>
		<LinkedCard
			href="https://koreanvegetariancooking.com/"
			title="Korean Vegetarian Cooking"
			description="This is a cooking course my wife Minji has made. I have participated in the project as a translator of the subtitles (Korean → English)."
		/>
	</div>

	<div class="mt-24 flex flex-col sm:flex-row gap-24 sm:gap-0">
		<div class="basis-1/2">
			<h2 class="text-2xl font-bold">Featured Posts</h2>
			<ul class="mt-4">
				{#each data.posts as post (post.path)}
					<li class="mt-2">
						<a
							sveltekit:prefetch
							class="inline-flex items-center border-b hover:border-b-2 border-gray-200 hover:border-gray-300 dark:border-gray-500 dark:hover:border-gray-400"
							href={post.path}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 opacity-50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
							<span class="ml-1 text-lg opacity-75 hover:opacity-100">{post.meta.title}</span></a
						>
					</li>
				{/each}
			</ul>
			<a sveltekit:prefetch href="/post/en" class="-ml-3 mt-2 btn btn-ghost">View All Posts →</a>
		</div>
		<div class="basis-1/2">
			<h2 class="text-2xl font-bold">Series</h2>
			<ul class="mt-4">
				{#each series as item (item.url)}
					<li class="mt-2">
						<a
							sveltekit:prefetch
							class="inline-flex items-center border-b hover:border-b-2 border-gray-200 hover:border-gray-300 dark:border-gray-500 dark:hover:border-gray-400"
							href={item.url}
							><svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-6 w-6 opacity-50"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
								/>
							</svg>
							<span class="ml-1 text-lg opacity-75 hover:opacity-100">{item.title}</span></a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="en" />
