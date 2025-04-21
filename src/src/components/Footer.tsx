import linkedin from '../assets/linkedin.svg';
import github from '../assets/github-mark.svg';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='text-center py-4'>
			<div class='w-[90%] mx-auto border-b border-gray-300 mt-2'></div>
			<div className='flex justify-center space-x-8 mb-4 mt-4'>
				<a
					href='https://www.linkedin.com/kieronlanning'
					target='_blank'
					rel='noopener noreferrer'
					className='flex items-center space-x-2 hover:underline'
				>
					<img
						src={linkedin.src}
						alt='LinkedIn - Kieron Lanning'
						className='h-5 w-5'
					/>
					<span>LinkedIn</span>
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
						className='h-5 w-5'
					/>
					<span>GitHub - Kieron Lanning</span>
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
						className='h-5 w-5'
					/>
					<span>GitHub - KJL.dev</span>
				</a>
			</div>
			<div className='mb-4 mt-4 space-y-2'>
				<p>&copy; {currentYear} KJL Solutions Ltd.</p>
				<p>Registered in England and Wales: 7455769. All rights reserved.</p>
			</div>
		</footer>
	);
}
