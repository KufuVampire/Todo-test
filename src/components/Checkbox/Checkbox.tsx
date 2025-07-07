import { Icon } from '@/components';
import { cn } from '@/utils';
import { useState, type HTMLProps } from 'react';
import styles from './styles.module.css';

interface Props extends HTMLProps<HTMLInputElement> {
	text: string;
	checked: boolean;
	className?: string;
}

export const Checkbox = ({ text, checked, className, ...props }: Props) => {
	const [isChecked, setChecked] = useState(checked);

	return (
		<label className={cn([styles.label, className])}>
			<div className={styles.wrapper}>
				<input
					type='checkbox'
					className={styles.checkbox__input}
					checked={isChecked}
					onChange={(e) => setChecked(e.target.checked)}
					{...props}
				/>
				<Icon
					name='checkmark'
					className={styles.checkbox}
				/>
			</div>
			<span className={styles.text}>{text}</span>
		</label>
	);
};
