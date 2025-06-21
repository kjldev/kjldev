import { type JSX } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';

// @ts-ignore
const siteKey = import.meta.env.PUBLIC_CF_TURNSTILE_SITEKEY;

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
	const turnstileRef = useRef<HTMLDivElement>(null);

	const [subject, setSubject] = useState(initialSubject ?? '');
	const [email, setEmail] = useState('');
	const [body, setBody] = useState(initialBody ?? '');
	const [captchaToken, setCaptchaToken] = useState<string | null>(null);
	const [touched, setTouched] = useState(false);

	// Modern email validation regex supporting plus addressing and common cases
	const isValidEmail = (email: string) =>
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
			email
		);

	const isFormValid =
		subject.trim().length > 0 &&
		body.trim().length > 0 &&
		isValidEmail(email) &&
		!!captchaToken;

	// Ensure Turnstile script is loaded only once
	useEffect(() => {
		const scriptId = 'cf-turnstile-script';
		if (!document.getElementById(scriptId)) {
			const script = document.createElement('script');
			script.id = scriptId;
			script.src =
				'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
	}, []);

	// Render Turnstile widget when dialog opens
	const renderTurnstile = () => {
		if (turnstileRef.current) {
			turnstileRef.current.innerHTML = '';
			// @ts-ignore
			if (window.turnstile && siteKey) {
				// @ts-ignore
				window.turnstile.render(turnstileRef.current, {
					sitekey: siteKey,
					theme: 'light',
					callback: (token: string) => setCaptchaToken(token),
					'expired-callback': () => setCaptchaToken(null),
					'error-callback': () => setCaptchaToken(null),
				});
			}
		}
	};

	const openDialog = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		document.body.style.overflow = 'hidden';
		dialogRef.current?.showModal();
		setTouched(false);
		setCaptchaToken(null);

		// Wait for dialog to open and then render Turnstile
		setTimeout(() => {
			// If script is loaded, render immediately
			if (window.turnstile && turnstileRef.current) {
				renderTurnstile();
			} else {
				// Otherwise, wait for script to load
				const handler = () => {
					renderTurnstile();
					window.removeEventListener('turnstile-loaded', handler);
				};
				window.addEventListener('turnstile-loaded', handler);
			}
		}, 0);
	};

	const closeDialog = (submitForm = false) => {
		if (submitForm) {
			formRef.current?.submit();
		}
		dialogRef.current?.close();
		document.body.style.overflow = '';
	};

	useEffect(() => {
		return () => {
			document.body.style.overflow = '';
		};
	}, []);

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
			>
				<form
					ref={formRef}
					method='post'
					enctype='multipart/form-data'
					action='https://formcarry.com/s/7LBSAyOPWY3'
					class='bg-white rounded-lg p-6 space-y-4 max-w-md w-full relative'
					onSubmit={(e) => {
						if (!isFormValid) {
							e.preventDefault();
							setTouched(true);
						}
					}}
				>
					<button
						type='button'
						class='absolute top-2 right-2 text-gray-600 hover:text-gray-900'
						onClick={() => closeDialog(false)}
						aria-label='Close'
					>
						×
					</button>

					<h3 class='text-xl font-bold'>Send a Message</h3>

					<div>
						<label class='block'>
							<span class='font-semibold'>Subject</span>
							<input
								name='subject'
								type='text'
								value={subject}
								onInput={(e) =>
									setSubject((e.target as HTMLInputElement).value)
								}
								placeholder='How can we help?'
								required
								class='mt-1 w-full border rounded px-2 py-1'
							/>
						</label>
						{touched && subject.trim().length === 0 && (
							<span class='text-red-600 text-sm'>Subject is required.</span>
						)}
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold'>Email</span>
							<input
								name='email'
								type='email'
								value={email}
								onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
								placeholder='Let us know how to contact you...'
								required
								autofocus
								class='mt-1 w-full border rounded px-2 py-1'
							/>
						</label>
						{touched && !isValidEmail(email) && (
							<span class='text-red-600 text-sm'>
								Please enter a valid email.
							</span>
						)}
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold'>Message</span>
							<textarea
								name='body'
								value={body}
								onInput={(e) =>
									setBody((e.target as HTMLTextAreaElement).value)
								}
								placeholder='How can we help you?'
								required
								class='mt-1 w-full h-24 border rounded p-2'
							/>
						</label>
						{touched && body.trim().length === 0 && (
							<span class='text-red-600 text-sm'>Message is required.</span>
						)}
					</div>

					{/* Cloudflare Turnstile CAPTCHA */}
					<div class='flex justify-center'>
						<div
							ref={turnstileRef}
							class='cf-turnstile'
							data-sitekey={siteKey}
							data-theme='light'
						></div>
					</div>
					{touched && !captchaToken && (
						<div class='text-red-600 text-sm text-center'>
							Please complete the CAPTCHA.
						</div>
					)}

					<div class='flex justify-end space-x-2'>
						<button
							type='button'
							class='px-4 py-2 rounded border'
							onClick={() => closeDialog(false)}
						>
							Cancel
						</button>
						<button
							type='submit'
							class='px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50'
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
