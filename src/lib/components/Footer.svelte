<script lang="ts">
	export let lang: 'ko' | 'en';

	let footerLinkGroup1 = [
		{
			label: 'Twitter',
			href: 'https://twitter.com/eunjae_lee_ko',
		},
		{
			label: 'GitHub',
			href: 'https://github.com/eunjae-lee',
		},
		{
			label: 'Instagram',
			href: 'https://instagram.com/eunjae_dev',
		},
	];

	let footerLinkGroup2 = [
		...(lang === 'ko'
			? [
					{
						label: 'Recent Tweets',
						href: 'hhttps://twitter.com/search?q=(from%3Aeunjae_lee_ko)%20min_faves%3A100&src=typed_query&f=live',
					},
			  ]
			: []),
		{
			label: 'Repository',
			href: 'https://github.com/eunjae-lee/eunjae-dev-svelte',
		},
		{
			label: `RSS (${lang === 'ko' ? 'Korean' : 'English'} only)`,
			href: `/rss.xml?slug=${encodeURIComponent(`${lang}/`)}`,
		},
	];
</script>

<div class="w-full flex justify-evenly sm:justify-start">
	<div class="sm:grow sm:mx-6 flex flex-col gap-4 mb-16">
		{#each footerLinkGroup1 as item (item.href)}
			<a
				rel="noopener noreferrer"
				target="_blank"
				class="text-sm opacity-30 hover:opacity-50"
				href={item.href}>{item.label}</a
			>
		{/each}
	</div>
	<div class="sm:grow flex flex-col gap-4 mb-16">
		{#each footerLinkGroup2 as item (item.href)}
			<a
				rel="noopener noreferrer"
				target="_blank"
				class="text-sm opacity-30 hover:opacity-50"
				href={item.href}>{item.label}</a
			>
		{/each}
	</div>
</div>
