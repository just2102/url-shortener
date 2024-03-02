import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { GoogleRedirect } from "./components/GoogleRedirect";
import { AuthProvider } from "./context/AuthContext.tsx";
import { UrlProvider } from "./context/UrlContext.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} />
      <Route path="/auth">
        <Route path="google-redirect" element={<GoogleRedirect />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </AuthProvider>
  </React.StrictMode>
);
