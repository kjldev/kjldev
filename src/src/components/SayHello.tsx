interface SayHelloProps {
	asLink?: boolean;
}

export default function SayHello(props: SayHelloProps) {
	const { asLink = false } = props;

	const emailAddress = 'sayhello@kjl.dev';
	const displayText = asLink ? emailAddress : 'Say Hello';

	// match the styling of tags/status: gradient, rounded, shadow, transform on hover
	const linkClasses = [
		'inline-block',
		'px-4',
		'py-2',
		'bg-gradient-to-r',
		'from-blue-400',
		'to-purple-500',
		'text-white',
		'rounded-full',
		'shadow-md',
		'hover:shadow-lg',
		'transform',
		'hover:scale-105',
		'transition',
		'duration-200',
		'font-bold',
	].join(' ');

	//const classes = asLink ? linkClasses : buttonClasses;
	const classes = asLink ? '' : linkClasses;

	return (
		<a
			href={`mailto:${emailAddress}?subject=Hello%20World`}
			title='Say Hello'
			class={classes}
		>
			{displayText}
		</a>
	);
}
