import type { SVGProps } from 'react';
import { CheckmarkIcon } from './icons';

const iconConfig = {
	checkmark: CheckmarkIcon,
};

type IconTypes = 'checkmark';

interface IconProps extends SVGProps<SVGSVGElement> {
	name: IconTypes;
}

export const Icon = ({ name, ...props }: IconProps) => {
	const SVGIcon = iconConfig[name];
	return <SVGIcon {...props} />;
};
