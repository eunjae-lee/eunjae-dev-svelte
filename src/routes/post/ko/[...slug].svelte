<script context="module" lang="ts">
	export async function load({ fetch }) {
		// console.log('# params.slug', params.slug);
		// const files = import.meta.glob(`/posts/ko/**/index.svx`);
		// console.log('# files', JSON.stringify(files));
		const response = await fetch(`/posts-ko?slug=${params.slug}`, {
			headers: { accept: 'application/json' },
		});
		const posts = (await response.json()).posts;
		console.log('# posts', posts);
		return { status: 200 };
	}
</script>

<!-- <svelte:component this={component} /> -->
