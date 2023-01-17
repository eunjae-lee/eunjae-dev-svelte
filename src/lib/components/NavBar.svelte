<script lang="ts">
	import type { Theme } from '$lib/types';
	import { theme } from '$lib/stores';
	import { setTheme } from '$lib/helpers';

	import EngKor from './EngKor.svelte';
	import KorEng from './KorEng.svelte';

	export let lang: 'en' | 'ko';

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
			<label tabindex="0" class="btn btn-ghost md:hidden"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg></label
			>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-48"
			>
				<li><a class="opacity-50 hover:opacity-75" href={`/${lang}`}>{home}</a></li>
				{#each menuItems as item (item.label)}
					<li>
						<a sveltekit:prefetch class="opacity-50 hover:opacity-75" href={item.href}
							>{item.label}</a
						>
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
							<a
								sveltekit:prefetch
								class={`${isEnglish ? 'opacity-75' : 'opacity-50'} hover:opacity-75`}
								href="/en">English</a
							>
						</li>
						<li>
							<a
								sveltekit:prefetch
								class={`${isEnglish ? 'opacity-50' : 'opacity-75'} hover:opacity-75`}
								href="/ko">Korean</a
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
					<a sveltekit:prefetch class="opacity-50 hover:opacity-75" href={item.href}>{item.label}</a
					>
				</li>
			{/each}

			<li class="dropdown dropdown-end">
				<label
					title="Choose theme"
					tabindex="0"
					class="opacity-50 hover:opacity-75 btn m-1 btn-ghost"
				>
					<svg viewBox="0 0 24 24" class="w-6 h-6 fill-current"
						><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
							class="fill-current"
						/><path
							d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
							class="fill-current"
						/><path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
							class="fill-current"
						/></svg
					>
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
							sveltekit:prefetch
							class={`${isEnglish ? 'opacity-75' : 'opacity-50'} hover:opacity-75 justify-center`}
							href="/en">English</a
						>
					</li>
					<li>
						<a
							sveltekit:prefetch
							class={`${isEnglish ? 'opacity-50' : 'opacity-75'} hover:opacity-75 justify-center`}
							href="/ko">Korean</a
						>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</div>
