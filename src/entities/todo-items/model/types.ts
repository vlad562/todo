
export interface Todo {
	id: string;
	title: string;
	completed: boolean;
}

export interface ITodoItemsProps {
	todo: Todo
	onToggle: (id: string) => void
}