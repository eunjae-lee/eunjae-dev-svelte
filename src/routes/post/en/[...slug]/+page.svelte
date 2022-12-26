<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	type Data = {
		component: SvelteComponent;
		path: string;
	};
	export let data: Data;
</script>

<svelte:component this={data.component} path={data.path} />
