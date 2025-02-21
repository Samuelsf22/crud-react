import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Layout from "./layout/Layout";
import CreateUser from "./components/auth/CreateUser";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import EditUser from "./components/user/EditUser";

export default function App() {
  const auth = !!localStorage.getItem("auth_token");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute canActivate={auth} redirectPath="/login" />
            }
          >
            <Route path="/" element={<Layout />} />
            <Route path="/edit/:public_id" element={<EditUser />} />
          </Route>
          <Route
            element={<ProtectedRoute canActivate={!auth} redirectPath="/" />}
          >
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<CreateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
