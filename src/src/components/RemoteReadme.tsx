import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeExternalLinks from 'rehype-external-links';
import { useEffect, useState } from 'preact/hooks';

interface Props {
	urls?: string[] | undefined;
}

// This component fetches a remote README (markdown), converts it to HTML using unified/remark/rehype, and renders it as HTML.
export default function RemoteReadme({ urls }: Props) {
	const [html, setHtml] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		setHtml(null);
		setError(null);

		const tryUrls = urls && urls.length > 0 ? urls : [];
		async function fetchReadme() {
			for (const u of tryUrls) {
				try {
					const res = await fetch(u);
					if (res.ok) {
						const text = await res.text();
						const processed = await unified()
							.use(remarkParse)
							.use(remarkRehype)
							.use(rehypeExternalLinks, {
								target: '_blank',
								rel: ['nofollow', 'noopener', 'noreferrer'],
							})
							.use([rehypeGithubAlerts])
							.use(rehypeStringify)
							.process(text);
						if (!cancelled) setHtml(processed.toString());
						return;
					}
				} catch {
					// Try next url
				}
			}
			if (!cancelled) setError('README.md could not be loaded.');
		}

		if (tryUrls.length > 0) {
			fetchReadme();
		} else {
			setError('No README.md URL provided.');
		}

		return () => {
			cancelled = true;
		};
	}, [urls]);

	if (error) {
		return <div className='text-red-600 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800'>{error}</div>;
	}
	if (html === null) {
		return <div className='text-gray-500 dark:text-gray-400 italic text-center py-8'>Loading README…</div>;
	}

	return (
		<div
			className='prose prose-lg dark:prose-invert mx-auto max-w-none
				prose-headings:text-gray-900 dark:prose-headings:text-gray-100
				prose-p:text-gray-700 dark:prose-p:text-gray-200
				prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:hover:text-blue-800 dark:prose-a:hover:text-blue-300
				prose-strong:text-gray-900 dark:prose-strong:text-gray-100
				prose-code:text-purple-600 dark:prose-code:text-purple-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-800
				prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:text-gray-100
				prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600
				prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-300
				prose-img:rounded-xl prose-img:shadow-lg
				prose-li:text-gray-700 dark:prose-li:text-gray-200
				prose-table:text-gray-700 dark:prose-table:text-gray-200'
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
