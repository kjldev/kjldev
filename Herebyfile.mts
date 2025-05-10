import { task } from 'hereby';
import { execa } from 'execa';
import { runBun, runBunF } from './scripts/run-bun.mts';

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

		return runBun('astro', ...bunArgs);
	},
});

export const check = task({
	name: 'check',
	description: 'Runs the Astro check command',
	run: runBunF('astro', 'check'),
});

export const installDeps = task({
	name: 'install-deps',
	description: 'Install dependencies for the Astro project',
	run: () => runBun('install'),
});

export default help;
