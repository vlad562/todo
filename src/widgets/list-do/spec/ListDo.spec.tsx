import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"
import { ListDo } from "@/widgets/list-do/ui/ListDo"

// Мокаем хук useTodos
const addTodoMock = vi.fn()
const toggleTodoMock = vi.fn()
const deleteCompletedMock = vi.fn()

vi.mock("@/widgets/list-do/lib/useToDo", () => ({
	useTodos: () => ({
		todos: [
			{ id: 1, title: "Todo 1", completed: false },
			{ id: 2, title: "Todo 2", completed: true },
		],
		addTodo: addTodoMock,
		toggleTodo: toggleTodoMock,
		deleteCompleted: deleteCompletedMock,
	}),
}))

describe("ListDo integration tests", () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	test("рендерит AddTodo, TodoItems и BottomPanelTodo", () => {
		render(<ListDo />)

		// Проверяем инпут AddTodo
		expect(screen.getByTestId("addTodo")).toBeInTheDocument()

		// Проверяем TodoItems
		expect(screen.getByText("Todo 1")).toBeInTheDocument()
		expect(screen.getByText("Todo 2")).toBeInTheDocument()

		// Проверяем BottomPanelTodo
		expect(screen.getByText("All")).toBeInTheDocument()
		expect(screen.getByText("Clear completed")).toBeInTheDocument()
	})

	test("вызывает addTodo при нажатии Enter в AddTodo", async () => {
		render(<ListDo />)
		const input = screen.getByTestId("addTodo")

		await userEvent.type(input, "Новая задача")
		await userEvent.keyboard("{Enter}")

		expect(addTodoMock).toHaveBeenCalledWith("Новая задача")
	})

	test("фильтрует TodoItems по активному фильтру", async () => {
		render(<ListDo />)
		const activeFilter = screen.getByText("Active")
		const completedFilter = screen.getByText("Completed")

		// Нажимаем Active
		await userEvent.click(activeFilter)
		expect(screen.getByText("Todo 1")).toBeInTheDocument()
		expect(screen.queryByText("Todo 2")).not.toBeInTheDocument()

		// Нажимаем Completed
		await userEvent.click(completedFilter)
		expect(screen.queryByText("Todo 1")).not.toBeInTheDocument()
		expect(screen.getByText("Todo 2")).toBeInTheDocument()
	})

	test("вызывает toggleTodo при клике на TodoItems чекбокс", async () => {
		render(<ListDo />)
		const todoCheckboxes = screen.getAllByRole("checkbox")

		// Кликаем по первому чекбоксу (Todo 1)
		await userEvent.click(todoCheckboxes[0])
		expect(toggleTodoMock).toHaveBeenCalledWith(1)
	})

	test("вызывает deleteCompleted при клике на кнопку Clear completed", async () => {
		render(<ListDo />)
		const button = screen.getByText("Clear completed")

		await userEvent.click(button)
		expect(deleteCompletedMock).toHaveBeenCalled()
	})
})
