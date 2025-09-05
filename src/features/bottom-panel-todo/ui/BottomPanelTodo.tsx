import type { IProps } from "@/features/bottom-panel-todo/model/types"
import { useMemo } from "react"

export const BottomPanelTodo = ({
	todos,
	deleteCompleted,
	active,
	setActive,
}: IProps) => {
	const countTodoLeft = useMemo(
		() =>
			todos.reduce((acc, todo) => {
				return !todo.completed ? acc + 1 : acc
			}, 0),
		[todos]
	)

	return (
		<div className="p-2 flex items-center justify-between text-gray-600 text-xs">
			<p>{countTodoLeft} items left</p>
			<ul className="flex items-center">
				<li
					onClick={() => setActive("All")}
					className={`mr-4 p-1 cursor-pointer ${
						active === "All"
							? "border-1 border-gray-500"
							: "border-1 border-transparent"
					}`}
				>
					All
				</li>
				<li
					onClick={() => setActive("Active")}
					className={`mr-4 p-1 cursor-pointer ${
						active === "Active"
							? "border-1 border-gray-500"
							: "border-1 border-transparent"
					}`}
				>
					Active
				</li>
				<li
					onClick={() => setActive("Completed")}
					className={`mr-4 p-1 cursor-pointer ${
						active === "Completed"
							? "border-1 border-gray-500"
							: "border-1 border-transparent"
					}`}
				>
					Completed
				</li>
			</ul>
			<button
				className="cursor-pointer"
				onClick={() => deleteCompleted()}
			>
				Clear completed
			</button>
		</div>
	)
}
