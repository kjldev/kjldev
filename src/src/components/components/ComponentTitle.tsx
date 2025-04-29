import type { Component } from '../../scripts/component-types';

export interface ComponentTitleProps {
	component: Component;
	url?: string;
}

export default function ComponentTitle(props: ComponentTitleProps) {
	const { component, url } = props;
	const { title, hasContent, status } = component;
	const target = hasContent ? '_self' : '_blank';
	const rel = hasContent ? 'noopener noreferrer' : undefined;

	const titleElement = url ? (
		<a
			href={url}
			target={target}
			rel={rel}
			className='text-blue-500 hover:underline'
		>
			{generateTitle(title)}
		</a>
	) : (
		generateTitle(title)
	);

	return status === 'retried' ? (
		<del class='text-gray-500'>{titleElement}</del>
	) : (
		titleElement
	);
}

function generateTitle(title: string) {
	return <h2 className='text-2xl font-bold mr-1'>{title}</h2>;
}
