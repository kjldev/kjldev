'use client';
import { useState } from 'preact/hooks';
import SayHello from './SayHello.tsx';

export default function Navigation() {
	const [open, setOpen] = useState(false);

	// Menu items excluding Home (which is always visible)
	const menuItems = [
		{ href: '/#what-do-we-do', label: 'What do we do?' },
		{ href: '/#our-services', label: 'Our services' },
		{ href: '/components', label: 'Components' },
	];

	return (
		<nav class='relative flex items-center justify-between p-2 text-sm font-semibold heading'>
			<div class='flex items-center space-x-6'>
				<a
					href='/'
					class='hover:underline'
				>
					Home
				</a>
				<div class='hidden md:flex items-center space-x-6'>
					{menuItems.map((item) => (
						<a
							key={item.href}
							href={item.href}
							class='hover:underline'
						>
							{item.label}
						</a>
					))}
				</div>
			</div>
			{/* Right side: SayHello, GitHub logo, and Hamburger button */}
			<div class='flex items-center space-x-4'>
				<SayHello asLink={true} />
				<a
					href='https://github.com/kjldev/'
					target='_blank'
					class='block'
					rel='noopener'
					aria-label='GitHub'
				>
					<svg
						role='img'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
						class='w-6 h-6 fill-current text-gray-900'
					>
						<title>GitHub</title>
						<path d='M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.304.762-1.604-2.665-.3-5.467-1.332-5.467-5.931 0-1.31.468-2.381 1.235-3.221-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.628-5.479 5.921.43.371.823 1.102.823 2.222 0 1.604-.015 2.896-.015 3.289 0 .322.216.694.825.576C20.565 21.795 24 17.303 24 12c0-6.627-5.373-12-12-12' />
					</svg>
				</a>
				<button
					class='md:hidden focus:outline-none cursor-pointer'
					onClick={() => setOpen(!open)}
					aria-label='Toggle menu'
				>
					<svg
						class='w-6 h-6'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						{open ? (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							/>
						) : (
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h16M4 18h16'
							/>
						)}
					</svg>
				</button>
			</div>
			{/* Mobile Navigation */}
			{open && (
				<div class='absolute top-full right-0 w-full bg-white shadow-md p-4 md:hidden'>
					<ul class='flex flex-col space-y-4'>
						{menuItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									class='hover:underline'
									onClick={() => setOpen(false)}
								>
									{item.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			)}
		</nav>
	);
}
