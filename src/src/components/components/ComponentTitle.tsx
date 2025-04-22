import { type LinkProp } from '../../scripts/component-types';

export interface ComponentTitleProps {
	title: string;
	link?: LinkProp;
}

export default function ComponentTitle(props: ComponentTitleProps) {
	const { title, link } = props;
	const url = link?.url;

	return url ? (
		<a
			href={url}
			target='_blank'
			rel='noopener noreferrer'
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
