import { error, redirect, type LoadEvent } from '@sveltejs/kit';
import { REDIRECT_MAP } from '../../redirect';

export function load({ params }: LoadEvent) {
	const redirectTo = REDIRECT_MAP[`/${params.rest}`];

	if (redirectTo) {
		throw redirect(307, redirectTo);
	} else {
		throw error(404);
	}
}
