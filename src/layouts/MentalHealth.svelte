<script>
	import Footer from '$lib/components/Footer.svelte';

	import NavBar from '$lib/components/NavBar.svelte';

	export let title;
	export let created_at;
	export let lang;

	let formattedDate = new Intl.DateTimeFormat().format(new Date(created_at));
</script>

<NavBar {lang} />

<div class="mt-16 p-6 prose prose-lg sm:prose-xl md:prose-2xl max-w-none">
	<div class="not-prose mb-2">
		<div class="text-sm breadcrumbs">
			<ul>
				<li>
					<a href="/post/mental-health">🧘🏻‍♂️ Mental Health</a>
				</li>
			</ul>
		</div>
	</div>

	<h1 class="">{title}</h1>
	<p class="opacity-75">{formattedDate}</p>
	<div class="w-full h-4 sm:h-8" />
	<slot />
</div>

<div class="divider mt-16 mb-8" />
<Footer lang="ko" />
