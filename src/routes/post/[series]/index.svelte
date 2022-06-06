<script context="module" lang="ts">
	import type { LoadEvent } from '@sveltejs/kit';
	export function load({ params, props }: LoadEvent) {
		const { series } = params;
		if (series === 'mental-health') {
			return {
				props: {
					...props,
					title: '🧘🏻‍♂️ Growing Mental Muscle',
					description: `I want to be stronger, mentally. So let's get started. I'm putting time, money and effort. I already know this is going to be an incredible investment for my happy life.`,
				},
			};
		} else if (series === 'maison') {
			return {
				props: {
					...props,
					title: '🏡 Maison',
					description: 'This is going to be a long and difficult but exciting journey, right?',
				},
			};
		} else {
			return {
				status: 404,
			};
		}
	}
</script>

<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import type { PostMeta } from '$lib/types';

	export let title: string;
	export let description: string;
	export let posts: PostMeta[];
</script>

<NavBar lang="en" />

<div class="mt-4 p-6">
	<h1 class="mt-16 text-4xl sm:text-[3rem] font-bold">{title}</h1>
	<p class="mt-4 italic opacity-75">
		{description}
	</p>
	<ul class="mt-8">
		{#each posts as post}
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
<Footer lang="en" />
