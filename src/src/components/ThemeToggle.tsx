'use client';

import { useState, useEffect } from 'preact/hooks';

type Theme = 'system' | 'light' | 'dark';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('system');
	const [mounted, setMounted] = useState(false);

	// Only run on client-side
	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem('theme') as Theme;
		if (savedTheme) {
			setTheme(savedTheme);
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		const root = document.documentElement;
		
		if (theme === 'dark') {
			root.classList.add('dark');
		} else if (theme === 'light') {
			root.classList.remove('dark');
		} else {
			// System theme
			const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			if (systemPrefersDark) {
				root.classList.add('dark');
			} else {
				root.classList.remove('dark');
			}
		}

		localStorage.setItem('theme', theme);
	}, [theme, mounted]);

	const cycleTheme = () => {
		const themes: Theme[] = ['system', 'light', 'dark'];
		const currentIndex = themes.indexOf(theme);
		const nextIndex = (currentIndex + 1) % themes.length;
		setTheme(themes[nextIndex]);
	};

	// Don't render anything until mounted to prevent hydration mismatch
	if (!mounted) return null;

	const getIcon = () => {
		switch (theme) {
			case 'light':
				return (
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 3v1.5M12 19.5V21M4.22 4.22l1.06 1.06M18.72 18.72l1.06 1.06M1.5 12H3M21 12h1.5M4.22 19.78l1.06-1.06M18.72 5.28l1.06-1.06M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
					</svg>
				);
			case 'dark':
				return (
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
					</svg>
				);
			default: // system
				return (
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
						<path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
						<path d="M2 3h20v18H2z" fill="none" stroke="currentColor" stroke-width="2"/>
					</svg>
				);
		}
	};

	return (
		<button
			onClick={cycleTheme}
			class="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
			aria-label={`Current theme: ${theme}. Click to cycle themes.`}
			title={`Current theme: ${theme}`}
		>
			{getIcon()}
		</button>
	);
}