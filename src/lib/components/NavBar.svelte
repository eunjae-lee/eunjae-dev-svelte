<script lang="ts">
	import EngKor from './EngKor.svelte';
	import KorEng from './KorEng.svelte';

	export let currentLang: 'en' | 'ko';

	let isEnglish = currentLang === 'en';
	let home: string = isEnglish ? 'Home' : '처음으로';
	let menuItems = [
		// { label: 'Item1', href: '/' },
		{ label: isEnglish ? 'Uses' : '사용하는 것들', href: '/uses' },
	];
</script>

<div class="navbar">
	<div class="navbar-start">
		<div class="dropdown">
			<button tabindex="0" class="btn btn-ghost md:hidden"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
				</svg></button
			>
			<ul
				tabindex="0"
				class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-48"
			>
				<li><a href="/">{home}</a></li>
				{#each menuItems as item (item.label)}
					<li><a href={item.href}>{item.label}</a></li>
				{/each}
				<li tabindex="0">
					<button class="justify-between" title="Choose language">
						{#if currentLang === 'ko'}
							<EngKor />
						{:else}
							<KorEng />
						{/if}
					</button>
					<ul class="p-2 bg-base-200">
						<li><a href="/en">English</a></li>
						<li><a href="/ko">Korean</a></li>
					</ul>
				</li>
			</ul>
		</div>
		<a
			href="/"
			class="hidden md:inline-flex btn btn-ghost normal-case text-xl opacity-25 hover:opacity-75"
			>{home}</a
		>
	</div>
	<div class="navbar-end hidden md:flex">
		<ul class="menu menu-horizontal p-0">
			{#each menuItems as item (item.label)}
				<li><a href={item.href}>{item.label}</a></li>
			{/each}

			<li class="dropdown dropdown-end">
				<button title="Choose language" tabindex="0" class="btn m-1 btn-ghost "
					>{#if currentLang === 'ko'}
						<EngKor />
					{:else}
						<KorEng />
					{/if}</button
				>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-28">
					<li><a class="justify-center" href="/en">English</a></li>
					<li><a class="justify-center" href="/ko">Korean</a></li>
				</ul>
			</li>
		</ul>
	</div>
</div>

<style>
	ul.menu li a,
	ul.menu li button {
		@apply opacity-25 hover:opacity-75;
	}
</style>
