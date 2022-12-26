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

	const octokit = new Octokit({
		auth: env.GITHUB_PERSONAL_ACCESS_TOKEN,
	});

	const issue = await octokit.issues.get({ owner: 'eunjae-lee', repo: 'notes', issue_number });
	const body = issue?.data?.body || '';
	if (body) {
		try {
			await supabase.from('eunjae_notes').insert({
				issue_number,
				body: issue.data.body,
			});
		} catch (err) {
			// ignore this
		}
	}

	const imageMatch = body.match(/!\[.+?\]\((.+?)\)/);
	let ogImage;
	if (imageMatch) {
		ogImage = imageMatch[1];
	}

	return {
		html_url: issue.data.html_url,
		body: body.replaceAll(/!\[.+?\]\(.+?\)/g, '').trim(),
		ogImage,
	};
}
