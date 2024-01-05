import { Navigate, useLocation } from "react-router-dom"
import { PropsWithChildren, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../store/hook"
import { useSessionStorage } from "usehooks-ts"
import { addToken } from "../store/tokenStore"
import { asyncShowFavori } from "../store/favoriStore"

export default function NeedAuth({ children }: PropsWithChildren) {
	const location = useLocation()

	const [token, setToken] = useSessionStorage("token", "")
	const [account, setAccount] = useSessionStorage("account", 0)
	const dispatch = useAppDispatch()

	const tokenRedux = useAppSelector((store) => store.token)

	const favori = useAppSelector((store) => store.favori)

    

	if (tokenRedux.account && tokenRedux.token) {
		if (favori.length === 0) {
			dispatch(asyncShowFavori(tokenRedux.token, tokenRedux.account, 1))
		}
		return children
	} else if (token && account) {
		if (favori.length === 0) {
			dispatch(asyncShowFavori(token, account, 1))
		}
		dispatch(addToken({ token: token, account: account }))
		return children
	} else return <Navigate to="/login" state={{ from: location }} />
}
