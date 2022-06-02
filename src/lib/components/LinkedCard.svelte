<script lang="ts">
	export let href: string;
	export let title: string;
	export let description: string;

	let anchorProps = href.startsWith('https://')
		? { rel: 'noopener noreferrer', target: '_blank' }
		: {};
</script>

<div class="card p-2 bg-base-100 shadow-xl transform hover:scale-[1.01]">
	<a {href} {...anchorProps}>
		<div class="card-body">
			<h2 class="card-title text-xl">{title}</h2>
			<p class="mt-2 text-sm opacity-75">
				{description}
			</p>
		</div>
	</a>
</div>
