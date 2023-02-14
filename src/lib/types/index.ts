export type PostMeta = {
	meta: {
		title: string;
		excerpt: string;
		created_at: string;
		featured?: boolean;
		lang: 'en' | 'ko';
		path: string;
		tags?: string[];
	};
	path: string;
};

export type Theme = 'light' | 'dark' | 'system';

export type Files = Record<string, () => Promise<{ metadata: PostMeta['meta'] }>>;

export type Lang = 'en' | 'ko';
