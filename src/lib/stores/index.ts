import { writable } from 'svelte/store';
import type { Theme } from '$lib/types';

export const theme: Theme = writable<Theme | undefined>(undefined);
