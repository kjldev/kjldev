import { type JSX } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

interface MailtoLinkProps {
	to: string;
	subject?: string;
	body?: string;
	className?: string;
	title?: string;
	children: preact.ComponentChildren;
}

export default function MailtoLink(props: MailtoLinkProps) {
	const { subject, body, className, title, children } = props;
	const dialogRef = useRef<HTMLDialogElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const openDialog = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		document.body.style.overflow = 'hidden';
		dialogRef.current?.showModal();
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

	// Dynamically load Cloudflare Turnstile script on mount (Astro-friendly)
	useEffect(() => {
		const scriptId = 'cf-turnstile-script';
		if (!document.getElementById(scriptId)) {
			const script = document.createElement('script');
			script.id = scriptId;
			script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
			script.async = true;
			script.defer = true;
			document.body.appendChild(script);
		}
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
								placeholder='How can we help?'
								required
								class='mt-1 w-full border rounded px-2 py-1'
							/>
						</label>
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold'>Email</span>
							<input
								name='email'
								type='email'
								placeholder='Let us know how to contact you...'
								required
								autofocus
								class='mt-1 w-full border rounded px-2 py-1'
							/>
						</label>
					</div>

					<div>
						<label class='block'>
							<span class='font-semibold'>Message</span>
							<textarea
								name='body'
								placeholder='How can we help you?'
								required
								class='mt-1 w-full h-24 border rounded p-2'
							>
								{body}
							</textarea>
						</label>
					</div>

					{/* Cloudflare Turnstile CAPTCHA */}
					<div class='flex justify-center'>
						<div
							class='cf-turnstile'
							data-sitekey='0x4AAAAAABhzrM6wiLBTm-af'
							data-theme='light'
						></div>
					</div>

					<div class='flex justify-end space-x-2'>
						<button
							type='button'
							class='px-4 py-2 rounded border'
							onClick={() => closeDialog(false)}
						>
							Cancel
						</button>
						<button
							type='button'
							class='px-4 py-2 bg-blue-600 text-white rounded'
							onClick={() => closeDialog(true)}
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
