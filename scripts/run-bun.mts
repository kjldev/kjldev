import { execa } from 'execa';

export const runBun = async (folder: string, ...args: string[]) => {
	const systemCmds = ['install', 'update'];
	const isSystemCmd = args.length > 0 && systemCmds.includes(args[0] as string);
	const cwdArgs = ['--cwd', folder];

	const argsWithCwd = isSystemCmd
		? [...args, ...cwdArgs]
		: [...cwdArgs, ...args];

	await execa('bun', argsWithCwd, {
		stdout: 'inherit',
	});
};

export const runBunF =
	(folder: string, ...args: string[]) =>
	() =>
		runBun(folder, ...args);
