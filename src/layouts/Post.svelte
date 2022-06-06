<script>
	import Base from './_Base.svelte';
	export let title;
	export let created_at;
	export let lang;
	export let path;
</script>

<Base {title} {created_at} {lang} {path}><slot /></Base>
