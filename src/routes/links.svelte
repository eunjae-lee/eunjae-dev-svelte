<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Discord from '$lib/components/icons/Discord.svelte';
	import Email from '$lib/components/icons/Email.svelte';
	import Globe from '$lib/components/icons/Globe.svelte';
	import Instagram from '$lib/components/icons/Instagram.svelte';
	import LinkedIn from '$lib/components/icons/LinkedIn.svelte';
	import Twitter from '$lib/components/icons/Twitter.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';

	let title = '저에게 연락하고 싶으시다면...';
	let ogImage = getOgImage({ title });
	let description =
		'안녕하세요 이은재입니다. 저에게 연락하고 싶으시다면, 다음 채널들을 사용하시면 됩니다.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="author" content="이은재" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://eunjae.dev/links" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://eunjae.dev/ko" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar lang="ko" />

<div class="mt-4 p-6">
	<h2 class="text-2xl font-bold">{title}</h2>

	<ul class="mt-8 flex flex-col gap-2">
		<li>
			<a href="https://twitter.com/eunjae_lee_ko"><Twitter /><span>트위터 (한글 계정)</span></a>
		</li>
		<li><a href="https://twitter.com/eunjae_lee"><Twitter /><span>트위터 (영문 계정)</span></a></li>
		<li><a href="https://instagram.com/eunjae.dev"><Instagram /><span>인스타그램</span></a></li>
		<li><a href="https://www.linkedin.com/in/eunjae-lee/"><LinkedIn /><span>링크드인</span></a></li>
		<li>
			<a href="https://learnwitheunjae.dev"><Globe /><span>Learn with Eunjae (강좌 사이트)</span></a
			>
		</li>
		<li><a href="https://learnwitheunjae.dev/community"><Discord /><span>Discord</span></a></li>
		<li><a href="https://mas.to/@eunjae_ko"><Globe /><span>Mastodon (한글 계정)</span></a></li>
		<li><a href="https://mas.to/@eunjae"><Globe /><span>Mastodon (영문 계정)</span></a></li>
		<li><a href="mailto:hey@eunjae.dev"><Email /><span>hey@eunjae.dev</span></a></li>
	</ul>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />

<style>
	li a {
		@apply flex items-center gap-2 underline underline-offset-4 opacity-75 hover:opacity-100;
	}
</style>
