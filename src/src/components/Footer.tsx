import linkedin from '../assets/linkedin.svg';
import github from '../assets/github-mark.svg';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='text-center p-4'>
			<div className='flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8 mb-4 mt-4'>
				<a
					href='https://linkedin.com/in/kieronlanning/'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-2 hover:underline'
				>
					<img
						src={linkedin.src}
						alt='LinkedIn - Kieron Lanning'
						loading='lazy'
						className='h-5 w-5'
					/>
					<span>LinkedIn</span>
				</a>
				<a
					href='https://github.com/kjldev'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-2 hover:underline'
				>
					<img
						src={github.src}
						alt='GitHub - KJL.dev'
						loading='lazy'
						className='h-5 w-5'
					/>
					<span>GitHub - KJL.dev</span>
				</a>
				<a
					href='https://github.com/kieronlanning'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-2 hover:underline'
				>
					<img
						src={github.src}
						alt='GitHub - Kieron Lanning'
						loading='lazy'
						className='h-5 w-5'
					/>
					<span>GitHub - Kieron Lanning</span>
				</a>
			</div>
			<div className='mb-4 mt-4 space-y-1 text-gray-500 dark:text-gray-400 text-xs'>
				<p>&copy; {currentYear} KJL Solutions Ltd.</p>
				<p className='opacity-75'>
					Registered in England and Wales: 7455769. All rights reserved.
				</p>
			</div>
		</footer>
	);
}
