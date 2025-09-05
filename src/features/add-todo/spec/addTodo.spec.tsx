import { AddTodo } from "@/features/add-todo/ui/AddTodo"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi } from "vitest"

describe("todoTest", () => {
	test("очищает инпут после добавления", async () => {
		const addTodo = vi.fn()
		const setOpen = vi.fn()

		render(
			<AddTodo
				addTodo={addTodo}
				open={true}
				setOpen={setOpen}
			/>
		)

		const input = screen.getByTestId("addTodo") as HTMLInputElement

		// Вводим текст
		await userEvent.type(input, "Тестовый тест")

		// Симулируем нажатие Enter
		await userEvent.keyboard("{Enter}")

		// Проверяем, что addTodo вызвался с правильным аргументом
		expect(addTodo).toHaveBeenCalledWith("Тестовый тест")

		// Проверяем, что инпут очищен
		expect(input.value).toBe("")
	})
	test("вызывает setOpen при клике на стрелку", async () => {
		const setOpen = vi.fn()
		render(
			<AddTodo
				addTodo={vi.fn()}
				open={false}
				setOpen={setOpen}
			/>
		)
		const arrow = screen.getByTestId("arrow")

		await userEvent.click(arrow)
		expect(setOpen).toHaveBeenCalled()
	})
	test("не вызывает addTodo если введены только пробелы", async () => {
		const addTodo = vi.fn()
		render(
			<AddTodo
				addTodo={addTodo}
				open={true}
				setOpen={vi.fn()}
			/>
		)
		const input = screen.getByTestId("addTodo") as HTMLInputElement

		await userEvent.type(input, "   ")
		await userEvent.keyboard("{Enter}")
		expect(addTodo).not.toHaveBeenCalled()
	})
})
