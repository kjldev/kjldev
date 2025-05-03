import { execa } from 'execa';
import { task } from 'hereby';

export const run = task({
	name: 'run',
	run: async () => {
		await execa('bun', ['--cwd', './src', 'dev'], {
			stdout: 'inherit',
		});
	},
});

export default run;
