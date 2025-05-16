import { task } from 'hereby';
import { execa } from 'execa';
import { runBun, runBunF } from './scripts/run-bun.mts';

const settings = {
	root: './',
	site: {
		root: './src',
	},
};

export const help = task({
	name: 'help',
	hiddenFromTaskList: true,
	run: async () => await execa('hereby', ['--tasks'], { stdio: 'inherit' }),
});

export const run = task({
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
	run: runBunF(settings.site.root, 'astro', 'check'),
});

export const installDeps = task({
	name: 'install-deps',
	description: 'Install dependencies for the Astro project',
	run: async () => {
		await runBun(settings.root, 'install');
		await runBun(settings.site.root, 'install');
	},
});

export const updateDeps = task({
	name: 'update-deps',
	description: 'Updates dependencies for the Astro project',
	run: async () => {
		await runBun(settings.root, 'update');
		await runBun(settings.site.root, 'update');
	},
});

export default help;
