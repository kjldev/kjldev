import { execa } from 'execa';

export const runBun = async (...args: string[]) => {
	const argsWithCwd = ['--cwd', './src', ...args];

	await execa('bun', argsWithCwd, {
		stdout: 'inherit',
	});
};

export const runBunF =
	(...args: string[]) =>
	() =>
		runBun(...args);
