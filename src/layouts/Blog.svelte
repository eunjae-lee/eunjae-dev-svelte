<script lang="ts">
    export let title: string;
    export let lang: 'en' | 'ko';
</script>

<h1 class="text-3xl my-8">{title}</h1>

<slot />