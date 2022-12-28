import { env } from '$env/dynamic/private';
import { type RequestEvent, error as svelteKitError } from '@sveltejs/kit';
import { createClient } from '@supabase/supabase-js';
import { Octokit } from '@octokit/rest';

export async function load({ params }: RequestEvent) {
	const issue_number = parseInt(params.number!, 10);

	const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

	const { data, error } = await supabase
		.from('eunjae_notes')
		.select('body')
		.eq('issue_number', issue_number);

	if (error) {
		throw svelteKitError(500);
	}

	let body;

	if (data?.[0]) {
		body = data[0].body;
	} else {
		const octokit = new Octokit({
			auth: env.GITHUB_PERSONAL_ACCESS_TOKEN,
		});

		let issue;
		try {
			issue = await octokit.issues.get({ owner: 'eunjae-lee', repo: 'notes', issue_number });
		} catch (err) {
			if ((err as any).status === 404) {
				throw svelteKitError(404);
			}
		}
		body = issue?.data?.body || '';

		if (body) {
			try {
				await supabase.from('eunjae_notes').insert({
					issue_number,
					body,
				});
			} catch (err) {
				// ignore this
			}
		}
	}

	const imageMatch = body.match(/!\[.+?\]\((.+?)\)/);
	let ogImage;
	if (imageMatch) {
		ogImage = imageMatch[1];
	}

	return {
		html_url: `https://github.com/eunjae-lee/notes/issues/${issue_number}`,
		body,
		strippedBody: body.replaceAll(/!\[.+?\]\(.+?\)/g, '').trim(),
		ogImage,
	};
}
