'use client';

export default function LocalStorageCleaner() {
	const clearThemeStorage = () => {
		localStorage.removeItem('theme');
		window.location.reload();
	};

	const setThemeManually = (theme: string) => {
		localStorage.setItem('theme', theme);

		// Apply theme immediately
		const root = document.documentElement;
		root.classList.remove('dark', 'light');

		if (theme === 'dark') {
			root.classList.add('dark');
		} else if (theme === 'light') {
			// Light mode - no classes
		} else {
			// System mode
			const systemPrefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)'
			).matches;
			if (systemPrefersDark) {
				root.classList.add('dark');
			}
		}

		window.location.reload();
	};

	return (
		<div class='mt-4 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700 rounded-lg'>
			<h3 class='text-lg font-semibold mb-3 text-orange-800 dark:text-orange-200'>
				Manual Theme Control
			</h3>
			<div class='flex flex-wrap gap-2 mb-3'>
				<button
					onClick={() => setThemeManually('light')}
					class='px-3 py-1 bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 text-sm'
				>
					Force Light
				</button>
				<button
					onClick={() => setThemeManually('dark')}
					class='px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm'
				>
					Force Dark
				</button>
				<button
					onClick={() => setThemeManually('system')}
					class='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm'
				>
					Force System
				</button>
				<button
					onClick={clearThemeStorage}
					class='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'
				>
					Clear Storage & Reload
				</button>
			</div>
			<p class='text-sm text-orange-600 dark:text-orange-400'>
				These buttons manually set localStorage and reload the page to test if
				the issue is with the ThemeToggle component specifically.
			</p>
		</div>
	);
}
