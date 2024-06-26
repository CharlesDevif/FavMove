import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./loginStyle.css";
import { toast } from "react-toastify";
import { useSessionStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { StrapiResponse, loginStrapiUser } from "../../../lib/strapi.auth.api";

interface UserCredentials {
  email: string;
  password: string;
}

export default function Login() {
  const isMounted = useRef<boolean>(false);
  const navigate = useNavigate();

  const [, setStrapiUser] = useSessionStorage<StrapiResponse | undefined>(
    "setStrapiUser",
    undefined
  );

  useEffect(() => {
    if (!isMounted.current) {
      const session = sessionStorage.getItem("session");
      if (session) {
        navigate("/"); // Redirect to home if already logged in
      }
      isMounted.current = true;
    }
  }, [navigate]);

  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginStrapiUser(credentials.email, credentials.password)
      .then((response) => {
        setStrapiUser(response);
        // createReqToken(environment.tmdbToken)
        //   .then((res: any) => {
        //     redirectToAuthorization(res.request_token);
        //   });
        navigate("/");
      })
      .catch((error) => {
        toast.error("Login failed: " + error.message);
      });
  };

  return (
    <>
      <div className="conteneurLogin">
        <div id="conteneurDivForm">
          <div id="imageForm"></div>
          <form id="formLogin" onSubmit={handleSubmit}>
            <div id="conteneurFrom">
              <h1>FAVMOVE</h1>
              <h2>Connexion</h2>
              <div className="divInputConteneur">
                <label htmlFor="emailForm">Email</label>
                <input
                  type="email"
                  id="emailForm"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="divInputConteneur">
                <label htmlFor="passwordForm">Password</label>
                <input
                  type="password"
                  id="passwordForm"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
              <input id="inputSubmit" type="submit" value="Login" />
              <p className="register-link">
                Pas encore inscrit ? <a href="/register">Inscription</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
