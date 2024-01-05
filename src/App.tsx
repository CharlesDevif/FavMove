import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import Home from "./components/pages/home/Home"
import Login from "./components/pages/login/Login"
import NeedAuth from "./components/NeedAuth"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSessionStorage } from "usehooks-ts"
import { verifTokenApi } from "./lib/verifTokenApi"
import { useAppDispatch } from "./store/hook"
import { addToken } from "./store/tokenStore"
import FilmDetails from "./components/pages/filmsDetails/FilmDetails"

export interface Root {
	success: boolean
	status_code: number
	status_message: string
}

function App() {
	const [token, setToken] = useSessionStorage("token", "")
	const [account, setAccount] = useSessionStorage("account", 0)
	const dispatch = useAppDispatch()

	useEffect(() => {
		console.log("app")

		token &&
			verifTokenApi(token).then((res) => {
				if (res.success) {
					dispatch(addToken({ token: token, account: account }))
				} else {
					setToken("")
					setAccount(0)
				}
			})
	}, [])

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

				<Route path="/film/:id" element={<NeedAuth><FilmDetails/></NeedAuth>} />

				<Route path="/login" element={<Login />} />
			</Routes>
		</>
	)
}

export default App
