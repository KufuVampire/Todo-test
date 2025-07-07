import { App } from '@/App';
import { StorageService } from '@/services';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { CreateTodo, TodoList } from '../components';
import { type ITodoList } from '../types';

jest.mock('@/services', () => ({
	StorageService: {
		getItem: jest.fn(() => [
			{ id: 1, title: 'Старое задание', isCompleted: false },
		]),
		setItem: jest.fn(),
	},
}));

describe('Тест приложения todo', () => {
	it('создает новый todo item с указанным текстом', () => {
		const todos: ITodoList = [];
		const mockSetTodos = jest.fn();

		render(
			<CreateTodo
				todos={todos}
				setTodos={mockSetTodos}
			/>
		);

		const input = screen.getByPlaceholderText(/что необходимо добавить/i);
		const button = screen.getByRole('button', { name: /добавить/i });

		fireEvent.change(input, { target: { value: 'Купить хлеб' } });
		fireEvent.click(button);

		expect(mockSetTodos).toHaveBeenCalledTimes(1);

		const calledWith = mockSetTodos.mock.calls[0][0];
		const newTodos = typeof calledWith === 'function' ? calledWith([]) : [];

		expect(newTodos).toEqual([
			{
				id: 1,
				title: 'Купить хлеб',
				isCompleted: false,
			},
		]);
	});
	it('обновляет состояние isCompleted при клике по чекбоксу', () => {
		const todos: ITodoList = [
			{ id: 1, title: 'Протестировать чекбокс', isCompleted: false },
		];

		const setTodos = jest.fn();

		render(
			<TodoList
				todos={todos}
				setTodos={setTodos}
			/>
		);

		const checkbox = screen.getByRole('checkbox');
		expect(checkbox).not.toBeChecked();

		fireEvent.click(checkbox);

		expect(setTodos).toHaveBeenCalledTimes(1);

		const updatedTodos = setTodos.mock.calls[0][0];

		expect(updatedTodos).toEqual([
			{
				id: 1,
				title: 'Протестировать чекбокс',
				isCompleted: true,
			},
		]);
	});
	it('удаляет все задачи при клике на кнопку "Очистить"', () => {
		render(<App />);
		
		expect(screen.getByText('Старое задание')).toBeInTheDocument();

		const clearButton = screen.getByRole('button', { name: /очистить/i });

		fireEvent.click(clearButton);

		expect(screen.queryByText('Старое задание')).not.toBeInTheDocument();

		expect(StorageService.setItem).toHaveBeenCalledWith('todos', []);
	});
});
