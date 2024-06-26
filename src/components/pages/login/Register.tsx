import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./loginStyle.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerStrapiUser } from "../../../lib/strapi.auth.api";

interface UserCredentials {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const isMounted = useRef<boolean>(false);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<UserCredentials>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // Check if user is already logged in
    const sessionToken = sessionStorage.getItem("session");
    if (sessionToken) {
      navigate("/"); // Navigate to home if already logged in
    }
    isMounted.current = true;
  }, [navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!credentials.password || !credentials.email || !credentials.username) {
      return toast.error("All info required.");
    }
    if (credentials.password !== credentials.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (credentials.password.length < 6) {
      return toast.error("Passwords to low.");
    }

    registerStrapiUser(
      credentials.email,
      credentials.password,
      credentials.username
    )
      .then((response) => {
        if (response) {
          toast.success(
            "Registration successful ! You can now log in our website !."
          );
          navigate("/login");
        }
      })
      .catch((error) => {
        toast.error("Something went wrong : " + error);
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
              <h2>Inscription</h2>
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
                <label htmlFor="usernameForm">Username</label>
                <input
                  type="username"
                  id="usernameForm"
                  name="username"
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
              <div className="divInputConteneur">
                <label htmlFor="confirmPasswordForm">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPasswordForm"
                  name="confirmPassword"
                  onChange={handleChange}
                  required
                />
              </div>
              <input id="inputSubmit" type="submit" value="Register" />

              <p className="register-link">
                Déja inscrit ? <a href="/login">Connexion</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
