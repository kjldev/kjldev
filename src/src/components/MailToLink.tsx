// src/components/MailtoLink.tsx
import { type FunctionalComponent, h } from 'preact';
import type { JSX } from 'preact';

interface MailtoLinkProps {
	to: string;
	subject?: string;
	body?: string;
	className?: string;
	title?: string;
	children: JSX.Element | JSX.Element[] | string;
}

function MailtoLink(props: MailtoLinkProps) {
	const { to, subject, body, className, title, children } = props;

	const handleClick = (e: JSX.TargetedMouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		const encode = encodeURIComponent;
		const params = [
			subject && `subject=${encode(subject)}`,
			body && `body=${encode(body)}`,
		]
			.filter(Boolean)
			.join('&');

		const mailtoHref = `mailto:${to}${params ? `?${params}` : ''}`;

		// 1. Web Share API (modern mobile browsers)
		if (navigator.share) {
			navigator.share({ title: subject, text: body }).catch(() => {
				window.location.href = mailtoHref;
			});
			return;
		}

		const isIOS = /iP(hone|ad|od)/.test(navigator.userAgent);
		if (isIOS) {
			const gmailScheme = `googlegmail:///co?to=${to}${
				params ? `&${params}` : ''
			}`;
			const outlookScheme = `ms-outlook://compose?to=${to}${
				params ? `&${params}` : ''
			}`;
			window.location.href = gmailScheme;
			setTimeout(() => {
				window.location.href = outlookScheme;
			}, 300);
			setTimeout(() => {
				window.location.href = mailtoHref;
			}, 600);
			return;
		}

		// 3. Default fallback
		window.location.href = mailtoHref;
	};

	// HREF for non-JS fallback
	const href = `mailto:${to}${
		subject || body
			? `?${[
					subject && `subject=${encodeURIComponent(subject)}`,
					body && `body=${encodeURIComponent(body)}`,
			  ]
					.filter(Boolean)
					.join('&')}`
			: ''
	}`;

	return (
		<a
			href={href}
			onClick={handleClick as any}
			class={className}
			title={title ?? `Mail ${to}...`}
		>
			{children}
		</a>
	);
}

export default MailtoLink;
