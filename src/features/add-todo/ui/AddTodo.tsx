import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useCallback, useState, type Dispatch, type SetStateAction } from "react"

export interface IAddTodoProps {
    open: boolean
	addTodo: (title: string) => void
	setOpen: Dispatch<SetStateAction<boolean>>
}

export const AddTodo = ({ addTodo,setOpen, open }: IAddTodoProps) => {
	const [newTitle, setNewTitle] = useState("")

	const handleAdd = useCallback(() => {
		const title = newTitle.trim()
		if (!title) return
		addTodo(title)
		setNewTitle("")
	}, [newTitle, addTodo])

	return (
		<div className="flex items-center p-1 border-b-1 border-gray-200 shadow">
			<KeyboardArrowDownIcon
				sx={{ fontSize: 40, color: "#e6e6e6" }}
				onClick={() => setOpen(prev => !prev)}
				className={`transition-all duration-1000 ease-in transform ${
					open ? "rotate-180" : ""
				}`}
                data-testid="arrow"
			/>

			<input
				placeholder="What needs to be done"
				onChange={e => setNewTitle(e.target.value)}
				onKeyDown={e => e.key === "Enter" && handleAdd()}
				value={newTitle}
				data-testid="addTodo"
			/>
		</div>
	)
}
