<script lang="ts">
	import type { Lang } from '$lib/types';
	import { theme } from '$lib/stores';
	import { setTheme } from '$lib/helpers';
	import { Menu, SunMoon } from 'lucide-svelte';
	import EngKor from './EngKor.svelte';
	import KorEng from './KorEng.svelte';

	export let lang: Lang;

	let isEnglish = lang === 'en';
	let home: string = isEnglish ? 'Home' : '처음으로';
	let menuItems = [
		{ label: isEnglish ? 'Blog' : '블로그', href: isEnglish ? '/post/en' : '/post/ko' },
		{ label: isEnglish ? 'Links' : '링크 모음', href: isEnglish ? '/links/en' : '/links/ko' },
		// { label: isEnglish ? 'Uses' : '사용하는 것들', href: '/uses' },
	];
</script>

<div class="navbar">
	<div class="navbar-start">
		<div class="dropdown">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn btn-ghost md:hidden"><Menu /></label>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-48"
			>
				<li><a class="opacity-50 hover:opacity-75" href={`/${lang}`}>{home}</a></li>
				{#each menuItems as item (item.label)}
					<li>
						<a class="opacity-50 hover:opacity-75" href={item.href}>{item.label}</a>
					</li>
				{/each}
				<li tabindex="0">
					<button class="opacity-50 hover:opacity-75 justify-between" title="Choose theme">
						Theme
					</button>
					<ul class="p-2 bg-base-200">
						<li>
							<button
								type="button"
								class={`${$theme === 'light' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
								href="/en"
								on:click={() => setTheme('light')}>Light</button
							>
						</li>
						<li>
							<button
								type="button"
								class={`${$theme === 'dark' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
								href="/ko"
								on:click={() => setTheme('dark')}>Dark</button
							>
						</li>
						<li>
							<button
								type="button"
								class={`${$theme === 'system' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
								href="/ko"
								on:click={() => setTheme('system')}>System</button
							>
						</li>
					</ul>
				</li>
				<li tabindex="0">
					<button class="opacity-50 hover:opacity-75 justify-between" title="Choose language">
						Language
					</button>
					<ul class="p-2 bg-base-200">
						<li>
							<a class={`${isEnglish ? 'opacity-75' : 'opacity-50'} hover:opacity-75`} href="/en"
								>English</a
							>
						</li>
						<li>
							<a class={`${isEnglish ? 'opacity-50' : 'opacity-75'} hover:opacity-75`} href="/ko"
								>Korean</a
							>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<a
			href={`/${lang}`}
			class="hidden md:inline-flex btn btn-ghost normal-case text-xl opacity-50 hover:opacity-75"
			>{home}</a
		>
	</div>
	<div class="navbar-end hidden md:flex">
		<ul class="menu menu-horizontal p-0">
			{#each menuItems as item (item.label)}
				<li>
					<a class="opacity-50 hover:opacity-75" href={item.href}>{item.label}</a>
				</li>
			{/each}

			<li class="dropdown dropdown-end">
				<label
					title="Choose theme"
					tabindex="0"
					class="opacity-50 hover:opacity-75 btn m-1 btn-ghost"
				>
					<SunMoon />
				</label>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28">
					<li>
						<button
							type="button"
							class={`${$theme === 'light' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
							on:click={() => setTheme('light')}>Light</button
						>
					</li>
					<li>
						<button
							type="button"
							class={`${$theme === 'dark' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
							on:click={() => setTheme('dark')}>Dark</button
						>
					</li>
					<li>
						<button
							type="button"
							class={`${$theme === 'system' ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
							on:click={() => setTheme('system')}>System</button
						>
					</li>
				</ul>
			</li>
			<li class="dropdown dropdown-end">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label
					title="Choose language"
					tabindex="0"
					class="opacity-50 hover:opacity-75 btn m-1 btn-ghost"
					>{#if isEnglish}
						<KorEng />
					{:else}
						<EngKor />
					{/if}</label
				>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28">
					<li>
						<a
							class={`${isEnglish ? 'opacity-75' : 'opacity-50'} hover:opacity-75 justify-center`}
							href="/en">English</a
						>
					</li>
					<li>
						<a
							class={`${isEnglish ? 'opacity-50' : 'opacity-75'} hover:opacity-75 justify-center`}
							href="/ko">Korean</a
						>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>
