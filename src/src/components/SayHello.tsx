interface Props {
	asLink?: boolean;
}

const encodedEmail = 'c2F5aGVsbG9Aa2psLmRldg==';
const emailAddress = decodeEmail(encodedEmail);

export default function SayHello(props: Props) {
	return (
		<div>
			{props.asLink ? (
				<a
					href='#'
					onClick={sayHello}
					title='Say Hello'
				>
					{emailAddress}
				</a>
			) : (
				<button
					class='bg-black text-[#f1f1f1] px-3 py-2 rounded-md cursor-pointer font-bold'
					onClick={sayHello}
					title='Say Hello'
				>
					Say Hello
				</button>
			)}
		</div>
	);
}

function decodeEmail(encoded: string): string {
	try {
		return atob(encoded);
	} catch (error) {
		console.error('Failed to decode email', error);
		return '';
	}
}

function sayHello(e: Event) {
	e.preventDefault();
	window.location.href = `mailto:${emailAddress}?subject=Hello%20World`;
	return false;
}
