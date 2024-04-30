import { ChangeEvent, FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./loginStyle.css"
import { useAppDispatch } from "../../../store/hook"
import { addToken } from "../../../store/tokenStore"
import { verifTokenApi } from "../../../lib/verifTokenApi"
import { toast } from "react-toastify"
import { useSessionStorage } from 'usehooks-ts'
import { asyncShowFavori } from "../../../store/favoriStore"

interface TokenState {
  token: string
  account: number
}

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const [, setToken] = useSessionStorage('token', "")
  const [, setAccount] = useSessionStorage('account', 0)

  const from = location.state?.from?.pathname || "/"

  const [localToken, setLocalToken] = useState<TokenState>({} as TokenState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalToken((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      }
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    verifTokenApi(localToken.token).then((res) => {
      if (res.success) {
        setToken(localToken.token)
        setAccount(res.guest_session_id)
        dispatch(addToken({ token: localToken.token, account: localToken.account }))
        dispatch(asyncShowFavori(localToken.token, localToken.account, 1))
        navigate(from, { replace: true })
      } else {
        toast.error('Le token est incorrect')
      }
    })
  }

  return (
    <>
      <div id="conteneurDivForm">
        <div id="imageForm"></div>

        <form id="formLogin" onSubmit={handleSubmit}>
          <div id="conteneurFrom">
            <h1>Connexion</h1>
            <div id="divInputConteneur">
              <label htmlFor="token">Token</label>
              <input type="text" id="tokenForm" name="token" onChange={handleChange} />
             
            </div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  )
}
