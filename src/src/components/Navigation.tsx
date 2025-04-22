'use client';
import { useState } from 'preact/hooks';
import SayHello from './SayHello';

export default function Navigation() {
	const [open, setOpen] = useState(false);

	// Menu items excluding Home (which is always visible)
	const menuItems = [
		{ href: '/#what-do-we-do', label: 'What do we do?' },
		{ href: '/#our-services', label: 'Our services' },
		{ href: '/components', label: 'Open source' },
	];

	return (
		<nav class='relative flex items-center justify-between p-2 text-sm font-semibold heading'>
			{/* Left side: Always visible Home */}
			<div class='flex items-center space-x-6'>
				<a
					href='/'
					class='hover:underline'
				>
					Home
				</a>
				{/* Desktop Navigation for remaining items */}
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
			{/* Right side: SayHello and Hamburger button */}
			<div class='flex items-center space-x-4'>
				<SayHello asLink={true} />
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
