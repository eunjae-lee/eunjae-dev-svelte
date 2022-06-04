<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';
	import type { PostMeta } from '$lib/types';

	export let posts: PostMeta[];
</script>

<NavBar lang="ko" />

<div class="mt-4 p-6">
	<h1 class="mt-16 text-4xl sm:text-[3rem] font-bold">글 목록</h1>
	<ul class="mt-8">
		{#each posts as post}
			<li class="mt-12">
				<a href={post.path}>
					<div>
						<h2 class="text-2xl font-bold opacity-90 hover:opacity-100">{post.meta.title}</h2>
						<p class="mt-2 opacity-75">{post.meta.excerpt}</p>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />
