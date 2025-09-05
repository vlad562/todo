import type { Todo } from "@/entities/todo-items";
import type { stateTodo } from "@/widgets/list-do";
import type { Dispatch, SetStateAction } from "react";

export interface IProps {
	todos: Todo[];
	active: stateTodo;
	setActive: Dispatch<SetStateAction<stateTodo>>;
	deleteCompleted: () => void;
}