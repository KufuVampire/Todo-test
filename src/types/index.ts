export interface ITodoItem {
	id: number,
	title: string;
	isCompleted: boolean;
}

export type ITodoList = ITodoItem[];
