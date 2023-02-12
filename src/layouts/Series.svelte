<script>
	import Base from './_Base.svelte';
	import { page } from '$app/stores';
	import { SERIES } from '../series';
	let slug = $page.url.pathname.split('/')[2];
	// @ts-ignore
	let title = SERIES[slug].title;
</script>

<Base {...$$props}>
	<div slot="before-title" class="not-prose mb-2">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<a class="text-lg underline opacity-75 hover:opacity-100" href={`/post/${slug}`}
						>{title}</a
					>
				</li>
			</ul>
		</div>
	</div>
	<slot />
</Base>
