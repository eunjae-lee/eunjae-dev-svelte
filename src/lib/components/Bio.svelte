<script lang="ts">
	import Image from 'svelte-image';

	export let name: string;
	export let title: string;
	export let description: string;
</script>

<div class="flex flex-row items-center gap-4">
	<div>
		<h1 class="text-[3rem] font-bold">{name}</h1>
		<p class="mt-1">{title}</p>
		<p class="mt-4 opacity-75">
			{description}
		</p>
	</div>
	<div class="avatar drop-shadow-xl">
		<div class="w-48 rounded-full">
			<Image src="profile.jpeg" />
		</div>
	</div>
</div>
