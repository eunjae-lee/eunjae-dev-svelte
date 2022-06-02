<script>
	import Bio from '$lib/components/Bio.svelte';
	import LinkedCard from '$lib/components/LinkedCard.svelte';
	import NavBar from '$lib/components/NavBar.svelte';

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
	<a href="" class="mt-2 btn btn-ghost">모든 글 보기 →</a>
</div>

<div class="mt-16 mb-8 border-b border-base-content w-full opacity-10" />

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
