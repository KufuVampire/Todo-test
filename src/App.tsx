import { useEffect, useMemo, useState, type MouseEvent } from 'react';
import { Container, CreateTodo, Header, Main, TodoList } from './components';
import { StorageService } from './services';
import type { ITodoList } from './types';

import styles from './styles.module.css';

type FilterTypes = 'All' | 'Active' | 'Completed';

export function App() {
	const [todos, setTodos] = useState<ITodoList>(
		StorageService.getItem('todos') ?? []
	);
	const [completedCount, setCompletedCount] = useState<number>(0);
	const [filterType, setFilterType] = useState<FilterTypes>('All');

	const filteredTodos = useMemo(() => {
		if (filterType === 'All') return todos;
		if (filterType === 'Active') {
			return todos.filter((todo) => !todo.isCompleted);
		}
		if (filterType === 'Completed') {
			return todos.filter((todo) => todo.isCompleted);
		}

		return todos;
	}, [todos, filterType]);

	useEffect(() => {
		const nonCompleted = filteredTodos.filter((todo) => !todo.isCompleted);

		setCompletedCount(nonCompleted.length);
	}, [todos, filteredTodos]);

	const handleClear = () => {
		setTodos([]);
		StorageService.setItem('todos', []);
	};

	const handleClick = (e: MouseEvent<HTMLUListElement>) => {
		const target = e.target as HTMLElement;
		const filterBtn = target.closest('button');

		if (!filterBtn) return;

		const filterType = filterBtn?.dataset.filter
			? filterBtn.dataset.filter
			: 'All';
		setFilterType(filterType as FilterTypes);
	};

	return (
		<>
			<Header />
			<Main>
				<section>
					<Container>
						<CreateTodo
							todos={todos}
							setTodos={setTodos}
						/>
						<div className={styles.wrapper}>
							<p className={styles.count}>Осталось: {completedCount}</p>
							<ul
								className={styles.btn__wrapper}
								onClick={handleClick}>
								<li>
									<button
										className={styles.btn}
										data-filter={'All'}>
										Все
									</button>
								</li>
								<li>
									<button
										className={styles.btn}
										data-filter={'Active'}>
										Активные
									</button>
								</li>
								<li>
									<button
										className={styles.btn}
										data-filter={'Completed'}>
										Выполненные
									</button>
								</li>
							</ul>
							<button
								className={styles.btn}
								onClick={handleClear}>
								Очистить
							</button>
						</div>
						<TodoList
							todos={filteredTodos}
							setTodos={setTodos}
						/>
					</Container>
				</section>
			</Main>
		</>
	);
}
