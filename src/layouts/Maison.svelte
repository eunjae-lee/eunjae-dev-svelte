<script>
	import Base from './_Base.svelte';
	export let title;
	export let created_at;
	export let lang;
	export let path;
</script>

<Base {title} {created_at} {lang} {path}>
	<div slot="before-title" class="not-prose mb-2">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<a href="/post/maison">🏡 Maison</a>
				</li>
			</ul>
		</div>
	</div>
	<slot />
</Base>
