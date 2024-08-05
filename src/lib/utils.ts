// Scripts: Utility Functions
/*----------------------------------------------------------------------------------------------------*/

// Style Functions
export const classNames = (...args: unknown[]): string => {
	return args
		.filter((arg) => arg && typeof arg == 'string' && arg !== '')
		.join(' ');
};
