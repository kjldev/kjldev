interface SayHelloProps {
	asLink?: boolean;
}

export default function SayHello(props: SayHelloProps) {
	const { asLink = false } = props;

	const emailAddress = 'sayhello@kjl.dev';
	const displayText = asLink ? emailAddress : 'Say Hello';

	const classes = asLink
		? ''
		: 'inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 active:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 transition';

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
