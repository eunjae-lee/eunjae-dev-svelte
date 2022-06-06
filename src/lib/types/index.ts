export type PostMeta = {
	meta: {
		title: string;
		excerpt: string;
		created_at: string;
		featured?: boolean;
		lang: 'en' | 'ko';
		path: string;
	};
	path: string;
};

export type Theme = 'light' | 'dark' | 'system';
