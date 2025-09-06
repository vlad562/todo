export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export interface ITodoItemsProps {
	todo: Todo
	deleteTodo: (id: string) => void
	onToggle: (id: string) => void
}