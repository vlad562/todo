import HomePage from "@/page/HomePage"
import { createHashRouter, RouterProvider } from "react-router-dom"


const router = createHashRouter([
	{
		path: "/",
		element: <HomePage />,
	}
])

export const AppRouter = () => {
	return <RouterProvider router={router} />
}
