import MailtoLink from './MailToLink';

interface SayHelloProps {
	asLink?: boolean;
	title?: string;
	inline?: boolean;
	className?: string;
}

export default function SayHello(props: SayHelloProps) {
	const { asLink = false, title, inline = false, className } = props;
	const emailAddress = 'sayhello@kjl.dev';
	const displayText = title ?? (asLink ? emailAddress : 'Say Hello');

	// Default styling for non-inline badge
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

	// Minimal styling for inline usage (includes whitespace-nowrap so it doesn't break lines)
	const inlineClasses = [
		'inline',
		'whitespace-nowrap',
		'p-0',
		'm-0',
		'text-blue-500',
		'hover:underline',
	].join(' ');

	const baseClasses = inline ? inlineClasses : asLink ? '' : linkClasses;
	const computedClasses = [baseClasses, className].filter(Boolean).join(' ');

	return (
		<MailtoLink
			to={emailAddress}
			subject='Hello World'
			className={computedClasses}
			title='Say Hello...! (:'
		>
			{displayText}
		</MailtoLink>
	);
}
