import type { Theme } from '$lib/types';

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
