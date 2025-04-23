export interface ComponentTitleProps {
	title: string;
	url?: string;
	hasContent: boolean;
}

export default function ComponentTitle(props: ComponentTitleProps) {
	const { title, url, hasContent } = props;
	const target = hasContent ? '_self' : '_blank';
	const rel = hasContent ? 'noopener noreferrer' : undefined;

	return url ? (
		<a
			href={url}
			target={target}
			rel={rel}
			className={'text-blue-500 hover:underline'}
		>
			{generateTitle(title)}
		</a>
	) : (
		generateTitle(title)
	);
}

function generateTitle(title: string) {
	return <h2 className='text-2xl font-bold mb-2'>{title}</h2>;
}
