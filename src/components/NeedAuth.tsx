import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { addUser } from "../store/userStore";
import { asyncShowFavori } from "../store/favoriStore";
import { createSessionId, getDetailsAcount } from "../lib/verifTokenApi";
import { useSessionStorage } from "usehooks-ts";
import { StrapiResponse } from "../lib/strapi.usersApi";
import { environment } from "../environments/environment";

export default function NeedAuth({ children }: PropsWithChildren) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [session, setSession] = useSessionStorage("session", "");
  const [token] = useSessionStorage("token", environment.tmdbToken);
  const [apiKey] = useSessionStorage("apiKey", environment.tmdbApiKey);
  const [setStrapiUser] = useSessionStorage<StrapiResponse | undefined>(
    "setStrapiUser",
    undefined
  );
  const [username, setUsername] = useSessionStorage("username", "");
  const [accountId, setAccountId] = useSessionStorage("accountId", "");

  const userRedux = useAppSelector((state) => state.user);

  const favori = useAppSelector((state) => state.favori);

  useEffect(() => {
    async function handleSession() {
      const queryParams = new URLSearchParams(location.search);
      const requestToken = queryParams.get("request_token");
      if (requestToken && !session) {
        try {
          const sessionId = await createSessionId(requestToken, apiKey);
          const detailsAcount = await getDetailsAcount(sessionId, apiKey);
          setSession(sessionId);
          setUsername(detailsAcount.username);
          setAccountId(detailsAcount.id);
          dispatch(
            addUser({
              token: userRedux.token,
              sessionId: sessionId,
              apiKey: userRedux.apiKey,
              username: detailsAcount.username,
              accountId: detailsAcount.id,
              strapiUser: setStrapiUser,
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
  }, [
    apiKey,
    dispatch,
    location.search,
    navigate,
    session,
    setAccountId,
    setSession,
    setStrapiUser,
    setUsername,
    userRedux.apiKey,
    userRedux.token,
  ]);

  if (userRedux.sessionId && userRedux.token) {
    if (favori.length === 0) {
      dispatch(asyncShowFavori(userRedux.token, userRedux.sessionId, 1));
    }
    return children;
  } else if (token && apiKey && session) {
    if (favori.length === 0) {
      dispatch(asyncShowFavori(token, session, 1));
    }
    dispatch(
      addUser({
        token: token,
        sessionId: session,
        apiKey: apiKey,
        username: username,
        accountId: accountId,
        strapiUser: setStrapiUser,
      })
    );
    return children;
  } else return <Navigate to="/login" state={{ from: location }} />;
}
