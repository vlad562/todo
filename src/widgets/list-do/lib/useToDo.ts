import type { Todo } from "@/entities/todo-items"
import { useCallback, useMemo, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export const useTodos = () => {
	const [todos, setTodos] = useState<Todo[]>([
		{ id: uuidv4(), completed: false, title: "Тестовое задание" },
		{ id: uuidv4(), completed: true, title: "Прекрасный код" },
		{ id: uuidv4(), completed: false, title: "Покрытие тестами" },
	])

	const addTodo = useCallback((title: string) => {
		setTodos(prev => [{ id: uuidv4(), title, completed: false }, ...prev])
	}, [])

    // faster function change state todo
	const toggleTodo = useCallback((id: string) => {
		setTodos(prev =>
			prev.map(
				todo =>
					todo.id === id
						? { ...todo, completed: !todo.completed }
						: todo 
			)
		)
	}, [])

	const deleteCompleted = useCallback(() => {
		setTodos(prev => prev.filter(todo => !todo.completed))
	}, [])

	return useMemo(
		() => ({
			todos,
			addTodo,
			toggleTodo,
			deleteCompleted,
		}),
		[todos, addTodo, toggleTodo, deleteCompleted]
	)
}
