<script lang="ts">
    type Post = {
        meta: {
            title: string;
            created_at: string;
            lang: 'en' | 'ko';
        };
        path: string;
    }
    export let posts: Post[];
</script>

{#each posts as post}
<div class="card p-2 bg-base-100 shadow-xl transform hover:scale-[1.01]">
	<a href={post.path}>
		<div class="card-body">
			<h2 class="card-title text-xl">{post.meta.title}</h2>
		</div>
	</a>
</div>
{/each}