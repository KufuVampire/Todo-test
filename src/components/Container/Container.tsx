import { cn } from '@/utils';
import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

interface Props {
	className?: string;
}

export const Container = ({
	children,
	className,
}: PropsWithChildren<Props>) => {
	return <div className={cn([styles.container, className])}>{children}</div>;
};
