import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import NeedAuth from "./components/NeedAuth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import FilmDetails from "./components/pages/filmsDetails/FilmDetails"
import Lists from "./components/pages/lists/Lists"

export interface Root {
	success: boolean
	status_code: number
	status_message: string
}

function App() {

	return (
		<>
			<ToastContainer />

			<Routes>
				<Route
					path="/"
					element={
						<NeedAuth>
							<Home />
						</NeedAuth>
					}
				/>

				<Route path="/film/:id" element={<NeedAuth><FilmDetails /></NeedAuth>} />

				<Route path="/lists" element={<NeedAuth><Lists /></NeedAuth>} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}

export default App
