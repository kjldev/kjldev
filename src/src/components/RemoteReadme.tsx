import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import rehypeExternalLinks from 'rehype-external-links';
import { useEffect, useState } from 'preact/hooks';

interface Props {
	url?: string;
}

// This component fetches a remote README (markdown), converts it to HTML using unified/remark/rehype, and renders it as HTML.
export default function RemoteReadme({ url, urls }: Props) {
	const [html, setHtml] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;
		setHtml(null);
		setError(null);

		const tryUrls = urls && urls.length > 0 ? urls : url ? [url] : [];

		async function fetchReadme() {
			for (const u of tryUrls) {
				try {
					const res = await fetch(u);
					if (res.ok) {
						const text = await res.text();
						const processed = await unified()
							.use(remarkParse)
							.use(remarkRehype)
							.use((any)rehypeGithubAlerts)
							.use(rehypeExternalLinks, {
								target: '_blank',
								rel: ['nofollow', 'noopener', 'noreferrer'],
							})
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
	}, [url, urls]);

	if (error) {
		return <div className='text-red-600'>{error}</div>;
	}
	if (html === null) {
		return <div className='text-gray-400 italic'>Loading README…</div>;
	}

	return (
		<div
			className='text-left max-w-full overflow-x-auto prose mx-auto my-6'
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
