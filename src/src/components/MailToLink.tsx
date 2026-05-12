import { type JSX } from 'preact';
import { useRef, useState } from 'preact/hooks';

// @ts-ignore
declare global {
	interface Window {
		turnstile?: any;
		turnstileLoaded?: () => void;
	}
}

interface MailtoLinkProps {
	to: string;
	subject?: string;
	body?: string;
	className?: string;
	title?: string;
	children: preact.ComponentChildren;
}

export default function MailtoLink(props: MailtoLinkProps) {
	const {
		subject: initialSubject,
		body: initialBody,
		className,
		title,
		children,
	} = props;
	const dialogRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const [subject, setSubject] = useState(initialSubject ?? '');
	const [email, setEmail] = useState('');
	const [body, setBody] = useState(initialBody ?? '');
	const [touched, setTouched] = useState(false);

	// Modern email validation regex supporting plus addressing and common cases
	const isValidEmail = (email: string) =>
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		);

	const isFormValid =
		subject.trim().length > 0 && body.trim().length > 0 && isValidEmail(email);

	const openDialog = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		document.body.style.overflow = 'hidden';
		dialogRef.current?.showModal();
		setTouched(false);
	};

	const closeDialog = (submitForm = false) => {
		if (submitForm) {
			formRef.current?.submit();
		}
		dialogRef.current?.close();
		document.body.style.overflow = '';
	};

	return (
		<>
			<a
				href='#'
				onClick={openDialog}
				class={className}
				title={title ?? 'Contact us...'}
			>
				{children}
			</a>

			<dialog
				ref={dialogRef}
				class='modal-dialog'
				aria-modal='true'
				role='dialog'
				aria-labelledby='contact-dialog-title'
			>
				<form
					ref={formRef}
					action='https://formspree.io/f/xpwreygd'
					method='POST'
					class='bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 max-w-md w-full relative'
					onSubmit={(e) => {
						if (!isFormValid) {
							e.preventDefault();
							setTouched(true);
						}
					}}
				>
					<button
						type='button'
						class='absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						onClick={() => closeDialog(false)}
						aria-label='Close'
					>
						×
					</button>

					<h3
						id='contact-dialog-title'
						class='text-xl font-bold text-gray-900 dark:text-white'
					>
						Send a Message
					</h3>

					<div>
						<label class='block'>
							<span class='font-semibold text-gray-800 dark:text-gray-200'>Subject</span>
							<input
								name='subject'
								type='text'
								value={subject}
								onInput={(e) =>
									setSubject((e.target as HTMLInputElement).value)
								}
								placeholder='How can we help?'
								required
								class='mt-1 w-full border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</label>
						{touched && subject.trim().length === 0 && (
							<span class='text-red-600 dark:text-red-400 text-sm'>Subject is required.</span>
						)}
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold text-gray-800 dark:text-gray-200'>Email</span>
							<input
								name='email'
								type='email'
								value={email}
								onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
								placeholder='Let us know how to contact you...'
								required
								autoFocus
								class={`mt-1 w-full border rounded px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
									touched && !isValidEmail(email) ?
										'border-red-600 dark:border-red-500'
									:	'border-gray-300 dark:border-gray-600'
								}`}
							/>
						</label>
						{touched && !isValidEmail(email) && (
							<span class='text-red-600 dark:text-red-400 text-sm'>
								Please enter a valid email.
							</span>
						)}
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold text-gray-800 dark:text-gray-200'>Message</span>
							<textarea
								name='body'
								value={body}
								onInput={(e) =>
									setBody((e.target as HTMLTextAreaElement).value)
								}
								placeholder='How can we help you?'
								required
								class='mt-1 w-full h-24 border border-gray-300 dark:border-gray-600 rounded p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
						</label>
						{touched && body.trim().length === 0 && (
							<span class='text-red-600 dark:text-red-400 text-sm'>Message is required.</span>
						)}
					</div>

					<div class='flex justify-end space-x-2'>
						<button
							type='button'
							class='px-4 py-2 rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
							onClick={() => closeDialog(false)}
						>
							Cancel
						</button>
						<button
							type='submit'
							class='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50 transition-colors'
							disabled={!isFormValid}
						>
							Send
						</button>
					</div>
				</form>
			</dialog>

			<style>
				{`
          dialog.modal-dialog {
            padding: 0;
            border: none;
            border-radius: 0.5rem;
          }
          dialog.modal-dialog::backdrop {
            background: rgba(0,0,0,0.5);
          }
          dialog:not([open]) {
            display: none;
          }
          dialog.modal-dialog {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}
			</style>
		</>
	);
}
