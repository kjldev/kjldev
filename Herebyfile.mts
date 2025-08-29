import { task } from 'hereby';
import { runBun, runBuns, helpTask } from './scripts/hereby-exts.mts';

const settings = {
	root: './',
	site: {
		root: './src',
	},
};

export const runDev = task({
	name: 'run',
	description: 'Runs the Astro dev server',
	run: () => {
		const bunArgs = ['dev'];
		if (process.argv.includes('--verbose') || process.argv.includes('-v')) {
			bunArgs.push('--verbose');
		}

		return runBun(settings.site.root, 'astro', ...bunArgs);
	},
});

export const check = task({
	name: 'check',
	description: 'Runs the Astro check command',
	run: () => runBun(settings.site.root, 'astro', 'check'),
});

export const installDeps = task({
	name: 'install-deps',
	description: 'Install dependencies for the Astro project',
	run: async () => runBuns([settings.root, settings.site.root], 'install'),
});

export const updateDeps = task({
	name: 'update-deps',
	description: 'Updates dependencies for the Astro project',
	run: async () => {
		await runBun(settings.site.root, 'astro-upgrade');
		await runBuns([settings.root, settings.site.root], 'update');
	},
});

// System tasks.
export default helpTask;
