export const cn = (classNames: (string | undefined)[], obj?: Record<string, boolean>) => {
	if (!obj) {
		return classNames.filter((className) => className != undefined).join(' ');
	}

	const entries = Object.entries(obj);

	return entries
		.reduce(
			(acc, [key, value]) => {
				if (value) {
					return [...acc, key];
				}

				return acc;
			},
			[...classNames]
		)
		.filter((className) => className != undefined)
		.join(' ');
};
