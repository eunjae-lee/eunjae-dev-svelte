<script context="module" lang="ts">
	export async function load({ fetch }) {
		const response = await fetch('/posts-ko', {
			headers: {
				accept: 'application/json',
			},
		});
		const posts = (await response.json()).posts.filter((post) => post.meta.featured === true);

		return {
			status: 200,
			props: {
				posts,
			},
		};
	}
</script>

<script lang="ts">
	import Bio from '$lib/components/Bio.svelte';
	import LinkedCard from '$lib/components/LinkedCard.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import type { PostMeta } from '$lib/types';

	export let posts: PostMeta[];

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
		{
			label: 'Recent Tweets',
			href: 'hhttps://twitter.com/search?q=(from%3Aeunjae_lee_ko)%20min_faves%3A100&src=typed_query&f=live',
		},
		{
			label: 'Repository',
			href: 'https://github.com/eunjae-lee/eunjae-dev-svelte',
		},
	];
</script>

<NavBar currentLang="ko" />

<div class="mt-4 p-6">
	<Bio
		name="이은재"
		title="한국에서 자랐고, 싱가포르를 거쳐 프랑스에 자리 잡았습니다."
		description="RemNote 에서 웹개발자로 일하고 있습니다. 개인 시간에는 사이드 프로젝트와 강좌를 만듭니다."
	/>
	<h2 class="mt-24 text-2xl font-bold">강좌 & 발표</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LinkedCard
			href="https://courses.eunjae.dev/solo-hackathon"
			title="SaaS, 처음부터 끝까지 라이브로 개발하기"
			description="프로젝트 설계부터 런칭까지, SaaS 프로젝트를 만들어가는 모든 과정을 소개합니다. 나홀로 해커톤 형태로 진행되는 개발 실황을 통째로 보여드립니다."
		/>
		<LinkedCard
			href="https://courses.eunjae.dev/in-paris"
			title="파리에 사는 개발자 - 해외 취업 이야기"
			description="이 3시간 35분짜리 영상을 통해, 제가 해외에 취직하고, 프랑스로 이사, 정착하는 과정과 제가 겪은 다양한 문화적 차이에 대해 이야기합니다."
		/>
		<LinkedCard
			href="https://www.youtube.com/watch?v=JbzdDYo2w_I"
			title="오픈 소스 라이브러리를 배포해봅시다"
			description="JSConf KR 2020 에서 했던 발표로, 오픈 소스 라이브러리를 배포하기 위한 작업 흐름과 라이브러리를 소개합니다."
		/>
	</div>
	<h2 class="mt-24 text-2xl font-bold">최근 글</h2>
	<ul class="mt-4">
		{#each posts as post (post.path)}
			<li class="mt-2">
				<a sveltekit:prefetch class="flex items-center" href={post.path}
					><svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 opacity-50"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						/>
					</svg>
					<span class="ml-1 text-lg opacity-75 hover:opacity-100">{post.meta.title}</span></a
				>
			</li>
		{/each}
	</ul>
	<a sveltekit:prefetch href="/posts-ko" class="mt-2 btn btn-ghost">모든 글 보기 →</a>
</div>

<div class="divider mt-16 mb-8" />

<div class="w-full flex">
	<div class="grow flex flex-col gap-4 mb-16">
		{#each footerLinkGroup1 as item (item.href)}
			<a
				rel="noopener noreferrer"
				target="_blank"
				class="text-sm opacity-30 hover:opacity-50"
				href={item.href}>{item.label}</a
			>
		{/each}
	</div>
	<div class="grow flex flex-col gap-4 mb-16">
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
