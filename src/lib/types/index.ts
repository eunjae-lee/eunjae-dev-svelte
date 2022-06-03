export type PostMeta = {
	meta: {
		title: string;
		created_at: string;
		lang: 'en' | 'ko';
	};
	path: string;
};

export type Theme = 'light' | 'dark' | 'system';
