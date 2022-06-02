<script>
	import '../app.css';
</script>

<div class="flex flex-col justify-center items-start max-w-3xl mx-auto">
	<slot />
</div>

<style>
	:global(:root) {
		@apply bg-[#f9fafb] dark:bg-[#292929];
	}

	:global(.card-body) {
		@apply p-4;
	}
	:global(.card-title) {
		@apply m-0;
	}
</style>
