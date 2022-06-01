<script>
	import EngKor from '$lib/components/EngKor.svelte';
	import KorEng from '$lib/components/KorEng.svelte';
</script>

<div class="navbar bg-base-100">
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
				<li><a href="/">Item 1</a></li>
				<li tabindex="0">
					<button class="justify-between" title="Choose language">
						<KorEng />
					</button>
					<ul class="p-2 bg-base-200">
						<li><a href="/en">English</a></li>
						<li><a href="/ko">Korean</a></li>
					</ul>
				</li>
				<li><a href="/">Item 3</a></li>
			</ul>
		</div>
		<a href="/" class="btn btn-ghost normal-case text-xl">Eunjae Lee</a>
	</div>
	<div class="navbar-end hidden md:flex">
		<ul class="menu menu-horizontal p-0">
			<li><a href="/">Item 1</a></li>
			<li tabindex="0">
				<button title="Choose language">
					<EngKor />
				</button>
				<ul class="p-2 bg-base-200">
					<li><a href="/en">English</a></li>
					<li><a href="/ko">Korean</a></li>
				</ul>
			</li>
			<li><a href="/">Item 3</a></li>
		</ul>
	</div>
</div>
