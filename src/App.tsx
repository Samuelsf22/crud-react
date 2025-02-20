import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Layout from "./layout/Layout";
import CreateUser from "./components/auth/CreateUser";

export default function App() {
  const isAuthenticated = localStorage.getItem("auth_token") !== null;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <Navigate to="/" /> : <CreateUser />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
