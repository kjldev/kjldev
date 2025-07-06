import { task } from 'hereby';
import { spawn } from 'child_process';

export const runBuns = async (folder: string[], ...args: string[]) => {
	for (const f of folder) {
		await runBun(f, ...args);
	}
};

export const runBun = async (
	folder?: string | undefined,
	...args: string[]
) => {
	folder = folder || './';

	const systemCmds = ['install', 'update'];
	const isSystemCmd = args.length > 0 && systemCmds.includes(args[0] as string);
	const cwdArgs = ['--cwd', folder];
	const argsWithCwd = isSystemCmd
		? [...args, ...cwdArgs]
		: [...cwdArgs, ...args];

	await run('bun', ...argsWithCwd);
};

export const run = async (cmd: string, ...args: string[]) => {
	return new Promise((resolve, reject) => {
		args = args || [];
		const child = spawn(cmd, args, { stdio: 'inherit', shell: true });

		child.on('error', reject);

		child.on('exit', (code) => {
			resolve(code ?? 0);
		});
	});
};

export const helpTask = task({
	name: 'help',
	description: 'Show the available tasks.',
	hiddenFromTaskList: true,
	run: () => run('hereby', '--tasks'),
});
