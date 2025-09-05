import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BottomPanelTodo } from "@/features/bottom-panel-todo/ui/BottomPanelTodo"
import { vi } from "vitest"
import { v4 as uuidv4 } from "uuid"
describe("BottomPanelTodo", () => {
	const todos = [
		{ id: uuidv4(), title: "Todo 1", completed: false },
		{ id: uuidv4(), title: "Todo 2", completed: true },
		{ id: uuidv4(), title: "Todo 3", completed: false },
	]

	test("отображает правильное количество оставшихся задач", () => {
		render(
			<BottomPanelTodo
				todos={todos}
				deleteCompleted={vi.fn()}
				active="All"
				setActive={vi.fn()}
			/>
		)

		expect(screen.getByText("2 items left")).toBeInTheDocument()
	})

	test("вызывает setActive при клике на фильтры", async () => {
		const setActive = vi.fn()
		render(
			<BottomPanelTodo
				todos={todos}
				deleteCompleted={vi.fn()}
				active="All"
				setActive={setActive}
			/>
		)

		const activeFilter = screen.getByText("Active")
		const completedFilter = screen.getByText("Completed")

		await userEvent.click(activeFilter)
		expect(setActive).toHaveBeenCalledWith("Active")

		await userEvent.click(completedFilter)
		expect(setActive).toHaveBeenCalledWith("Completed")
	})

	test("вызывает deleteCompleted при клике на кнопку", async () => {
		const deleteCompleted = vi.fn()
		render(
			<BottomPanelTodo
				todos={todos}
				deleteCompleted={deleteCompleted}
				active="All"
				setActive={vi.fn()}
			/>
		)

		const button = screen.getByText("Clear completed")
		await userEvent.click(button)
		expect(deleteCompleted).toHaveBeenCalled()
	})

	test("присваивает правильный класс активному фильтру", () => {
		const { rerender } = render(
			<BottomPanelTodo
				todos={todos}
				deleteCompleted={vi.fn()}
				active="All"
				setActive={vi.fn()}
			/>
		)

		const allFilter = screen.getByText("All")
		const activeFilter = screen.getByText("Active")

		expect(allFilter).toHaveClass("border-gray-500")
		expect(activeFilter).toHaveClass("border-transparent")

		rerender(
			<BottomPanelTodo
				todos={todos}
				deleteCompleted={vi.fn()}
				active="Active"
				setActive={vi.fn()}
			/>
		)

		expect(screen.getByText("Active")).toHaveClass("border-gray-500")
		expect(screen.getByText("All")).toHaveClass("border-transparent")
	})
})
