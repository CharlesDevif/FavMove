import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./loginStyle.css";
import { createReqToken, redirectToAuthorization } from "../../../lib/verifTokenApi";
import { toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

interface TokenState {
  token: string;
  account: string;
  apiKey: string;
}

export default function Login() {
  const isMounted = useRef<boolean>(false);
  const navigate = useNavigate();

  const [, setToken] = useSessionStorage('token', "")
  const [, setApiKey] = useSessionStorage('apiKey', "")
  const [session,] = useSessionStorage('session', "");

  useEffect(() => {
    if (!isMounted.current) {
      if (session) {
        navigate('/');
      }

      isMounted.current = true;
    }

  }, []);


  const [localToken, setLocalToken] = useState<TokenState>({} as TokenState);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalToken((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createReqToken(localToken.token).then((res: any) => {
      setToken(localToken.token)
      setApiKey(localToken.apiKey)
      redirectToAuthorization(res.request_token);
    }).catch((error) => {
      toast.error("Error creating request token: " + error.message);
    });
  }

  return (
    <>
      <div id="conteneurDivForm">
        <div id="imageForm"></div>
        <form id="formLogin" onSubmit={handleSubmit}>
          <div id="conteneurFrom">
            <h1>Connexion</h1>
            <div className="divInputConteneur">
              <label htmlFor="tokenForm">Token</label>
              <input type="text" id="tokenForm" name="token" onChange={handleChange} />
            </div>
            <div className="divInputConteneur">
              <label htmlFor="apiKeyForm">Clé API</label>
              <input type="text" id="apiKeyForm" name="apiKey" onChange={handleChange} />
            </div>
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}
