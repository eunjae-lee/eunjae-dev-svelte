<script>
	import Base from './_Base.svelte';

	const { lang } = $$props;
</script>

<Base {...$$props}
	><slot />
	<div slot="after-article" class="mt-8 p-6">
		<a sveltekit:prefetch href={`/post/${lang}`} class="-ml-4 btn btn-ghost text-base"
			>{lang === 'ko' ? '글 목록 보기' : 'View All Posts'} →</a
		>
	</div>
</Base>
