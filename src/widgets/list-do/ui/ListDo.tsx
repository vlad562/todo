import type { stateTodo } from "@/widgets/list-do/model/types"
import { useMemo, useState } from "react"
import { TodoItems } from "@/entities/todo-items"
import { useTodos } from "@/widgets/list-do/lib/useToDo"
import { BottomPanelTodo } from "@/features/bottom-panel-todo/ui/BottomPanelTodo"
import { AddTodo } from "@/features/add-todo"

export const ListDo = () => {
	const { addTodo, todos, toggleTodo, deleteCompleted } = useTodos()
	const [active, setActive] = useState<stateTodo>("All")
	const [open, setOpen] = useState(false)

	const filteredTodos = useMemo(() => {
		return todos.filter(todo =>
			active === "Completed"
				? todo.completed
				: active === "Active"
				? !todo.completed
				: true
		)
	}, [todos, active])

	return (
		<div className="w-full bg-[#fefefe] shadow-2xl">
			<AddTodo
				addTodo={addTodo}
                open={open}
				setOpen={setOpen}
			/>

			<ul
				className={`overflow-auto transition-all duration-500 ease-in-out transform origin-top scroll-smooth ${
					open
						? "scale-y-100 opacity-100 max-h-96"
						: "scale-y-0 opacity-0 max-h-0"
				}`}
			>
				{filteredTodos.map(todo => (
					<TodoItems
						key={todo.id}
						onToggle={toggleTodo}
						todo={todo}
					/>
				))}
			</ul>

			<BottomPanelTodo
				todos={todos}
				deleteCompleted={deleteCompleted}
				active={active}
				setActive={setActive}
			/>
		</div>
	)
}
