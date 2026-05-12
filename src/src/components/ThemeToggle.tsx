'use client';

import { useState, useEffect } from 'preact/hooks';

type Theme = 'system' | 'light' | 'dark';

function applyTheme(theme: Theme) {
	const root = document.documentElement;
	root.classList.remove('dark');
	if (theme === 'dark') {
		root.classList.add('dark');
		root.style.colorScheme = 'dark';
	} else if (theme === 'light') {
		root.style.colorScheme = 'light';
	} else {
		// system: clear override so OS preference drives both the class and SVGs
		root.style.colorScheme = '';
		if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			root.classList.add('dark');
		}
	}
	localStorage.setItem('theme', theme);
}

const SunIcon = () => (
	<svg
		class='w-4 h-4'
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		stroke-width='2'
		aria-hidden='true'
	>
		<circle
			cx='12'
			cy='12'
			r='5'
		/>
		<line
			x1='12'
			y1='1'
			x2='12'
			y2='3'
		/>
		<line
			x1='12'
			y1='21'
			x2='12'
			y2='23'
		/>
		<line
			x1='4.22'
			y1='4.22'
			x2='5.64'
			y2='5.64'
		/>
		<line
			x1='18.36'
			y1='18.36'
			x2='19.78'
			y2='19.78'
		/>
		<line
			x1='1'
			y1='12'
			x2='3'
			y2='12'
		/>
		<line
			x1='21'
			y1='12'
			x2='23'
			y2='12'
		/>
		<line
			x1='4.22'
			y1='19.78'
			x2='5.64'
			y2='18.36'
		/>
		<line
			x1='18.36'
			y1='5.64'
			x2='19.78'
			y2='4.22'
		/>
	</svg>
);

const MonitorIcon = () => (
	<svg
		class='w-4 h-4'
		fill='none'
		stroke='currentColor'
		viewBox='0 0 24 24'
		stroke-width='2'
		aria-hidden='true'
	>
		<rect
			x='2'
			y='3'
			width='20'
			height='14'
			rx='2'
		/>
		<line
			x1='8'
			y1='21'
			x2='16'
			y2='21'
		/>
		<line
			x1='12'
			y1='17'
			x2='12'
			y2='21'
		/>
	</svg>
);

const MoonIcon = () => (
	<svg
		class='w-4 h-4'
		fill='currentColor'
		viewBox='0 0 24 24'
		aria-hidden='true'
	>
		<path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
	</svg>
);

const BUTTONS: { key: Theme; Icon: () => preact.JSX.Element; label: string }[] =
	[
		{ key: 'light', Icon: SunIcon, label: 'Light mode' },
		{ key: 'system', Icon: MonitorIcon, label: 'System theme' },
		{ key: 'dark', Icon: MoonIcon, label: 'Dark mode' },
	];

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('system');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const saved = (localStorage.getItem('theme') as Theme) ?? 'system';
		setTheme(saved);
		setMounted(true);

		// Re-apply when OS preference changes (only matters in system mode)
		const mql = window.matchMedia('(prefers-color-scheme: dark)');
		const handler = () => {
			if ((localStorage.getItem('theme') ?? 'system') === 'system') {
				applyTheme('system');
			}
		};
		mql.addEventListener('change', handler);
		return () => mql.removeEventListener('change', handler);
	}, []);

	const select = (t: Theme) => {
		setTheme(t);
		applyTheme(t);
	};

	// Reserve space to prevent layout shift during hydration
	if (!mounted) return <div class='w-[88px] h-7 rounded-lg' />;

	return (
		<div
			class='flex items-center gap-0.5 bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5'
			role='group'
			aria-label='Theme selector'
		>
			{BUTTONS.map(({ key, Icon, label }) => {
				const active = theme === key;
				return (
					<button
						key={key}
						onClick={() => select(key)}
						aria-label={label}
						aria-pressed={active}
						title={label}
						class={`p-1.5 rounded transition-colors ${
							active ?
								'bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-300 shadow-sm'
							:	'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/60 dark:hover:bg-gray-700'
						}`}
					>
						<Icon />
					</button>
				);
			})}
		</div>
	);
}

