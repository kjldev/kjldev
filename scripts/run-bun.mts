import { execa } from 'execa';

export const runBun = async (...args: string[]) => {
	const systemCmds = ['install', 'upgrade'];
	const isSystemCmd = args.length > 0 && systemCmds.includes(args[0] as string);
	const cwdArgs = ['--cwd', './src'];

	const argsWithCwd = isSystemCmd
		? [...args, ...cwdArgs]
		: [...cwdArgs, ...args];

	await execa('bun', argsWithCwd, {
		stdout: 'inherit',
	});
};

export const runBunF =
	(...args: string[]) =>
	() =>
		runBun(...args);
