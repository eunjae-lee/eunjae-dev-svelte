<script context="module" lang="ts">
	export async function load({ fetch }: LoadEvent) {
		const response = await fetch('/post/ko', {
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
	import Footer from '$lib/components/Footer.svelte';
	import LinkedCard from '$lib/components/LinkedCard.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
	import { getOgImage } from '$lib/helpers';
	import type { PostMeta } from '$lib/types';
	import type { LoadEvent } from '@sveltejs/kit';

	export let posts: PostMeta[];
	let ogImage = getOgImage({ title: '이은재입니다 👋🏼' });
</script>

<svelte:head>
	<title>이은재입니다</title>
	<meta
		name="description"
		content="RemNote 에서 웹개발자로 일하고 있습니다. 개인 시간에는 사이드 프로젝트와 강좌를 만듭니다."
	/>
	<meta name="author" content="이은재" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://eunjae.dev/ko" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="이은재" />
	<meta
		property="og:description"
		content="RemNote 에서 웹개발자로 일하고 있습니다. 개인 시간에는 사이드 프로젝트와 강좌를 만듭니다."
	/>
	<meta property="og:image" content={ogImage} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://eunjae.dev/ko" />
	<meta name="twitter:title" content="이은재" />
	<meta
		name="twitter:description"
		content="RemNote 에서 웹개발자로 일하고 있습니다. 개인 시간에는 사이드 프로젝트와 강좌를 만듭니다."
	/>
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<NavBar lang="ko" />

<div class="mt-4 p-6">
	<Bio
		name="이은재입니다 👋🏼"
		title="한국에서 자랐고, 싱가포르를 거쳐 프랑스에 자리 잡았습니다."
		description="RemNote 에서 웹개발자로 일하고 있습니다. 개인 시간에는 사이드 프로젝트와 강좌를 만듭니다."
	/>
	<h2 class="mt-24 text-2xl font-bold">강좌</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LinkedCard
			href="https://courses.eunjae.dev/new-job"
			title="이직 이야기"
			description="프랑스 회사를 다니다가 미국 회사로의 이직을 결심한 계기와 과정, 그리고 그 결과를 자세히 풀어 소개합니다."
			><div class="alert bg-primary text-primary-content shadow-lg p-2 text-sm">
				<div class="w-full flex justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						/>
					</svg>
					<span>NEW</span>
				</div>
			</div></LinkedCard
		>
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
			href="https://courses.eunjae.dev/electron-with-next-js"
			title="Build an Electron App with Next.js"
			description="Next.js 를 가지고 Electron 앱을 만드는 과정을 설명합니다 (영어)."
		/>
		<!-- <LinkedCard
			href="https://www.youtube.com/watch?v=JbzdDYo2w_I"
			title="오픈 소스 라이브러리를 배포해봅시다"
			description="JSConf KR 2020 에서 했던 발표로, 오픈 소스 라이브러리를 배포하기 위한 작업 흐름과 라이브러리를 소개합니다."
		/> -->
	</div>
	<h2 class="mt-24 text-2xl font-bold">프로젝트</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
		<LinkedCard
			href="https://quill.so"
			title="Quill"
			description="Craft 앱에서 만든 노트를 기반으로 웹사이트를 만들어주는 서비스입니다."
		/>
		<LinkedCard
			href="https://github.com/algolia/shipjs"
			title="Ship.js"
			description="JavaScript 라이브러리를 손쉽게 배포하기 위한 자동화 도구입니다."
		/>
		<LinkedCard
			href="https://gomscope.com"
			title="GomScope"
			description="Bear 노트 앱을 위한 부가앱으로써 노트 간의 관계 그래프 및 다양한 기능을 제공합니다. (개발 중지)"
		/>
	</div>
	<div class="mt-24 flex flex-col sm:flex-row gap-24 sm:gap-0">
		<div class="basis-1/2">
			<h2 class="text-2xl font-bold">추천 글</h2>
			<ul class="mt-4">
				{#each posts as post (post.path)}
					<li class="mt-2">
						<a
							sveltekit:prefetch
							class="inline-flex items-center border-b hover:border-b-2 border-gray-200 hover:border-gray-300 dark:border-gray-500 dark:hover:border-gray-400"
							href={post.path}
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
			<a sveltekit:prefetch href="/post/ko" class="-ml-3 mt-2 btn btn-ghost">글 목록 보기 →</a>
		</div>
		<div class="basis-1/2">
			<h2 class="text-2xl font-bold">컨퍼런스 톡</h2>
			<ul class="mt-4">
				<li class="mt-2">
					<a
						sveltekit:prefetch
						class="inline-flex items-center border-b hover:border-b-2 border-gray-200 hover:border-gray-300 dark:border-gray-500 dark:hover:border-gray-400"
						rel="noopener noreferrer"
						target="_blank"
						href="https://www.youtube.com/watch?v=JbzdDYo2w_I"
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
								d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
							/>
						</svg>
						<span class="ml-1 text-lg opacity-75 hover:opacity-100"
							>오픈 소스 라이브러리를 배포해봅시다</span
						></a
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="mt-24">
		<h2 class="text-2xl font-bold">기타 링크</h2>
		<ul class="mt-4">
			<li class="mt-2 flex items-start">
				<a
					href="https://3v7zh2.csb.app/"
					class="inline-flex items-center border-b hover:border-b-2 border-gray-200 hover:border-gray-300 dark:border-gray-500 dark:hover:border-gray-400"
					rel="noopener noreferrer"
					target="_blank"
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
							d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
						/>
					</svg><span class="ml-1 text-lg opacity-75 hover:opacity-100"
						>클로바노트 → SRT 변환기</span
					></a
				>
				<a
					href="https://codesandbox.io/s/clova-note-to-srt-3v7zh2?file=/src/index.js"
					rel="noopener noreferrer"
					target="_blank"><span class="ml-1 text-lg opacity-75 hover:opacity-100">(코드)</span></a
				>
			</li>
		</ul>
	</div>
	<form
		class="mt-24 card bg-base-100"
		action="https://courses.eunjae.dev/email_lists/331197/subscriptions"
		accept-charset="UTF-8"
		method="post"
	>
		<div class="card-body">
			<h2 class="card-title">사이드 프로젝트 뉴스레터를 구독하세요.</h2>
			<p class="opacity-75">
				비정기적으로 발행되는 뉴스레터입니다. 사이드 프로젝트를 좋아하시거나, 좋아하고 싶으신
				분들에게 관련 소식을 전해드려요. 저의 개인적인 목표는 다양한 사이드 프로젝트로 부수입을
				만드는 것이고, 그 과정에서 제가 접하는 좋은 정보나 제 경험을 공유하려 합니다.
			</p>
			<div class="mt-2 card-actions justify-end">
				<input
					type="email"
					name="email"
					placeholder="이메일"
					class="grow input input-bordered"
					required
				/>
				<button type="submit" class="btn btn-primary sm:w-32">구독하기</button>
			</div>
		</div>
	</form>
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />
