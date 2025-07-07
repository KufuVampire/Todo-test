import { StorageService } from '@/services';
import type { ITodoItem, ITodoList } from '@/types';
import { useState, type Dispatch, type SetStateAction } from 'react';
import styles from './styles.module.css';

interface Props {
	todos: ITodoList;
	setTodos: Dispatch<SetStateAction<ITodoList>>;
}

export const CreateTodo = ({ todos, setTodos }: Props) => {
	const [value, setValue] = useState<string>('');

	const handleClick = () => {
		if (!value.trim()) return;

		const newTodo: ITodoItem = {
			id: todos.length + 1,
			title: value,
			isCompleted: false,
		};

		setTodos((prev) => [...prev, newTodo]);
		StorageService.setItem('todos', [...todos, newTodo]);
		setValue('')
	};

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.input}
				type='text'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder='Что необходимо добавить в список задач?'
			/>
			<button
				className={styles.btn}
				onClick={handleClick}>
				Добавить
			</button>
		</div>
	);
};
