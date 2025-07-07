import type { ITodoItem } from '@/types';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './styles.module.css';

interface Props {
	item: ITodoItem;
}

export const TodoItem = ({ item }: Props) => {
	return (
		<li className={styles.item}>
			<Checkbox
				text={item.title}
				checked={item.isCompleted}
				data-id={item.id}
			/>
		</li>
	);
};
