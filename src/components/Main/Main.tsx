import type { PropsWithChildren } from 'react';
import styles from './styles.module.css';

export const Main = ({ children }: PropsWithChildren) => {
	return <main className={styles.main}>{children}</main>;
};
