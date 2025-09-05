import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import styled from "@emotion/styled"
import { Checkbox } from "@mui/material"
import type { ITodoItemsProps } from "@/entities/todo-items/model/types"
import { memo } from "react"

const RoundCheckbox = styled(Checkbox)({
	padding: 8,
})

export const TodoItems = memo(({ todo, onToggle }: ITodoItemsProps) => {
    console.log(todo)
	return (
		<li className="flex items-center border-b-1 border-gray-200">
			<RoundCheckbox
				checked={todo.completed}
				onChange={() => onToggle(todo.id)}
				icon={<RadioButtonUncheckedIcon />}
				checkedIcon={<RadioButtonCheckedIcon />}
			/>
			<div className="relative inline-block">
				<p
					className={`${
						todo.completed ? "text-[#a1a1a1]" : "text-[#4d4d4d]"
					} text-xl font-extralight italic`}
				>
					{todo.title}
				</p>
				{todo.completed && (
					<span className="absolute top-1/2 left-0 h-0.5 bg-gray-400 transform -translate-y-1/2 transition-all duration-500 ease-out w-0 group-hover:w-full" />
				)}
			</div>
		</li>
	)
})
