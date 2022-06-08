import type { Theme } from '$lib/types';

export function getOgImage({ title }: { title: string }) {
	return `https://og-image.eunjae.dev/${encodeURIComponent(
		title
	)}?theme=light&md=1&fontSize=100px&images=${encodeURIComponent(
		'https://eunjae-dev-svelte.vercel.app/profile.png'
	)}&widths=400&heights=400`;
}

export function setTheme(theme: Theme) {
	const updateDom = (theme: 'dark' | 'light') => {
		const html = document.querySelector('html');
		html.setAttribute('data-theme', theme === 'dark' ? 'halloween' : 'light');
	};

	if (theme === 'system') {
		updateDom(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
	} else {
		updateDom(theme);
	}
	localStorage.setItem('theme', theme);
}

// export function isDark(theme: Theme | undefined) {
// 	if (theme === 'dark') {
// 		return true;
// 	} else if (theme === 'light') {
// 		return false;
// 	} else {
// 		return window.matchMedia('(prefers-color-scheme: dark)').matches;
// 	}
// }
