<script lang="ts">
	export let name: string;
	export let title: string;
	export let description: string;
</script>

<div class="flex flex-col sm:flex-row items-center gap-8 sm:gap-16">
	<div class="sm:order-last avatar drop-shadow-xl">
		<div class="w-48">
			<img src="/profile.jpg" class="rounded-full" alt="Profile of Eunjae Lee" />
		</div>
	</div>
	<div>
		<h1 class="text-4xl sm:text-[3rem] font-extrabold">{name}</h1>
		<p class="mt-2 sm:mt-4">{title}</p>
		<p class="mt-4 opacity-75">
			{description}
		</p>
	</div>
</div>
