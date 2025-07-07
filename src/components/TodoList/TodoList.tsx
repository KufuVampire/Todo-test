import { StorageService } from '@/services';
import type { ITodoItem, ITodoList } from '@/types';
import type { Dispatch, MouseEvent, SetStateAction } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './styles.module.css';

interface Props {
	todos: ITodoList;
	setTodos: Dispatch<SetStateAction<ITodoList>>;
}

export const TodoList = ({ todos, setTodos }: Props) => {
	const handleClick = (e: MouseEvent<HTMLUListElement>) => {
		const target = e.target as HTMLElement;
		const checkbox = target.closest('input');

		if (!checkbox) return;

		const id = checkbox.dataset.id ? parseInt(checkbox.dataset.id) : 0;

		if (!id) return;

		const changedTodos = todos.map((todo) => {
			if (todo.id === id) {
				const changedTodo: ITodoItem = {
					...todo,
					isCompleted: checkbox.checked,
				};
				return changedTodo;
			}

			return todo;
		});

		setTodos(changedTodos);
		StorageService.setItem('todos', changedTodos);
	};

	return (
		<ul
			className={styles.list}
			onClick={handleClick}>
			{todos.map((todo) => (
				<TodoItem
					item={todo}
					key={todo.id}
				/>
			))}
		</ul>
	);
};
