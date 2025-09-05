import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TodoItems } from "@/entities/todo-items/ui/TodoItems"
import { vi } from "vitest"
import { v4 as uuidv4 } from "uuid"

describe("TodoItems", () => {
	const todo = {
		id: uuidv4(),
		title: "Тестовый todo",
		completed: false,
	}

	test("отображает текст todo", () => {
        const onToggle = vi.fn()
		render(
			<TodoItems
				todo={todo}
				onToggle={onToggle}
			/>
		)
		expect(screen.getByText("Тестовый todo")).toBeInTheDocument()
	})

	test("цвет текста зависит от completed", () => {
        const onToggle = vi.fn()
		const { rerender } = render(
			<TodoItems
				todo={{ ...todo, completed: false }}
				onToggle={vi.fn()}
			/>
		)
		let p = screen.getByText("Тестовый todo")
		expect(p).toHaveClass("text-[#4d4d4d]")

		rerender(
			<TodoItems
				todo={{ ...todo, completed: true }}
				onToggle={onToggle}
			/>
		)
		p = screen.getByText("Тестовый todo")
		expect(p).toHaveClass("text-[#a1a1a1]")
	})

	test("показывает линию при completed=true", () => {
        const onToggle = vi.fn()
		render(
			<TodoItems
				todo={{ ...todo, completed: true }}
				onToggle={onToggle}
			/>
		)
		const line = screen.getByTestId("line")
		expect(line).toBeInTheDocument()
	})

	test("вызывает onToggle при клике на чекбокс", async () => {
		const onToggle = vi.fn()
		render(
			<TodoItems
				todo={todo}
				onToggle={onToggle}
			/>
		)
		const checkbox = screen.getByRole("checkbox")

		await userEvent.click(checkbox)
		expect(onToggle).toHaveBeenCalledWith(todo.id)
	})
})
