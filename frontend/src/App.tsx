import { ToastContainer } from "react-toastify";
import GoogleButton from "react-google-button";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { Header } from "./components/Header";
import { URLShortenerWidget } from "./components/URLShortenerWidget";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { MyUrlsWidget } from "./components/MyUrlsWidget";

function App() {
  const { handleGoogleLogin, isAuthorized } = useContext(AuthContext);

  return (
    <>
      <Header />

      {!isAuthorized && <GoogleButton onClick={handleGoogleLogin} />}

      {isAuthorized && (
        <>
          <URLShortenerWidget />
          <MyUrlsWidget />
        </>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        draggable
        pauseOnHover
        limit={2}
      />
    </>
  );
}

export default App;
