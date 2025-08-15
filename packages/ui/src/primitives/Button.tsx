import * as React from 'react';
import clsx from 'clsx';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'default' | 'secondary' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
	{ className, variant = 'default', size = 'md', ...props },
	ref,
) {
	return (
		<button
			ref={ref}
			className={clsx(
				'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50',
				{
					default: 'bg-black text-white hover:bg-black/90',
					secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
					ghost: 'bg-transparent hover:bg-gray-100',
				}[variant],
				{ sm: 'h-8 px-3 text-sm', md: 'h-9 px-4', lg: 'h-10 px-6 text-base' }[size],
				className,
			)}
			{...props}
		/>
	);
});