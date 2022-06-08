<script>
	import Base from './_Base.svelte';
</script>

<Base {...$$props}>
	<div slot="before-title" class="not-prose mb-2">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<a href="/post/mental-health">🧘🏻‍♂️ Mental Health</a>
				</li>
			</ul>
		</div>
	</div>
	<slot />
</Base>
