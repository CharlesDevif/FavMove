import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addUser } from "../store/userStore";
import { asyncShowFavori } from "../store/favoriStore";
import { useSessionStorage } from "usehooks-ts";
import { StrapiResponse } from "../lib/strapi.usersApi";
import { environment } from "../environments/environment";

export default function NeedAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
//   const [session, setSession] = useSessionStorage("session", "");
  const [token] = useSessionStorage("token", environment.tmdbToken);
  const [apiKey] = useSessionStorage("apiKey", environment.tmdbApiKey);
  const [strapiUserStorage] = useSessionStorage<StrapiResponse | undefined>(
    "setStrapiUser",
    undefined
  );
  const userRedux = useAppSelector((state) => state.user);
  const favori = useAppSelector((state) => state.favori);

  useEffect(() => {
    async function handleSession() {
      if (!strapiUserStorage?.jwt) {
        try {
          dispatch(
            addUser({
              token: userRedux.token,
              apiKey: userRedux.apiKey,
              strapiUser: strapiUserStorage,
            })
          );

          navigate("/"); // Redirect to home or dashboard after login
        } catch (error) {
          console.error("Failed to create session", error);
          navigate("/login"); // Redirect back to login on failure
        }
      }
    }
    handleSession();
  }, []);

  if (userRedux.strapiUser && userRedux.token) {
    if (favori.length === 0) {
    //   dispatch(asyncShowFavori(userRedux.strapiUser));
    }
    return children;
  } else if (token && apiKey && strapiUserStorage) {
    if (favori.length === 0) {
    //   dispatch(asyncShowFavori(strapiUserStorage));
    }
    dispatch(
      addUser({
        token: token,
        apiKey: apiKey,
        strapiUser: strapiUserStorage,
      })
    );
    return children;
  } else return <Navigate to="/login" state={{ from: location }} />;
}
