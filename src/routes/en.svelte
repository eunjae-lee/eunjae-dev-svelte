<script>
	import Bio from '$lib/components/Bio.svelte';
	import LinkedCard from '$lib/components/LinkedCard.svelte';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar currentLang="en" />

<div class="mt-4 p-6">
	<Bio
		name="Eunjae Lee"
		title="Raised in South Korea, now in France."
		description="Web developer at RemNote by day. Indie hacker by night, working on courses and side projects."
	/>
	<h2 class="mt-12 text-2xl font-bold">Courses & Talks</h2>
	<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2">
		<LinkedCard
			href="https://courses.eunjae.dev/electron-with-next-js"
			title="Build an Electron App with Next.js"
			description="In this paid course, I explain how I built an Electron app with Next.js from scratch. I
    talk about neat tips and it comes with a full source code of GomScope."
		/>
		<LinkedCard
			href="https://www.youtube.com/watch?v=3L8R4pG81vQ"
			title="How to release open source library"
			description="In this HolyJS 2020 talk, I talk about how I at Algolia release libraries with a refined
    process and a tool."
		/>
		<LinkedCard
			href="https://koreanvegetariancooking.com/"
			title="Korean Vegetarian Cooking"
			description="This is a cooking course my wife Minji has made. I have participated in the project as a translator of the subtitles (Korean → English)."
		/>
	</div>
</div>
