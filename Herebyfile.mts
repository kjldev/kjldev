import { task } from 'hereby';
import { runBun, runBunF } from './scripts/run-bun.mts';

export const run = task({
	name: 'run',
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
	run: runBunF('astro', 'check'),
});

export default run;
