'use client';

import { useState, useEffect } from 'preact/hooks';

type Theme = 'system' | 'light' | 'dark';

function applyTheme(theme: Theme) {
	const root = document.documentElement;

	console.log(
		'Applying theme:',
		theme,
		'Current classes before:',
		root.className
	);

	// Remove all theme classes
	root.classList.remove('dark', 'light');

	if (theme === 'dark') {
		root.classList.add('dark');
	} else if (theme === 'light') {
		// Light mode - no additional classes needed
	} else {
		// system
		const systemPrefersDark = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches;
		console.log('System prefers dark:', systemPrefersDark);
		if (systemPrefersDark) {
			root.classList.add('dark');
		}
	}

	console.log('Applied theme:', theme, 'Classes after:', root.className);

	// Save to localStorage
	localStorage.setItem('theme', theme);
}

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('system');
	const [mounted, setMounted] = useState(false);

	// Initialize on mount
	useEffect(() => {
		const savedTheme = (localStorage.getItem('theme') as Theme) || 'system';
		setTheme(savedTheme);
		applyTheme(savedTheme);
		setMounted(true);
	}, []);

	// Handle theme changes
	const handleThemeChange = (newTheme: Theme) => {
		setTheme(newTheme);
		applyTheme(newTheme);
	};

	const cycleTheme = () => {
		const themes: Theme[] = ['system', 'light', 'dark'];
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		const nextTheme = themes[nextIndex];
		handleThemeChange(nextTheme);
	};

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) return null;

	const getIcon = () => {
		switch (theme) {
			case 'light':
				return (
					<svg
						class='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M1.5 12H3M21 12h1.5M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z' />
					</svg>
				);
			case 'dark':
				return (
					<svg
						class='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z' />
					</svg>
				);
			default: // system
				return (
					<svg
						class='w-5 h-5'
						fill='currentColor'
						viewBox='0 0 24 24'
					>
						<path d='M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z' />
						<path
							d='M2 3h20v18H2z'
							fill='none'
							stroke='currentColor'
							stroke-width='2'
						/>
					</svg>
				);
		}
	};

	return (
		<button
			onClick={cycleTheme}
			class='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
			aria-label={`Current theme: ${theme}. Click to cycle themes.`}
			title={`Current theme: ${theme}`}
		>
			{getIcon()}
		</button>
	);
}
