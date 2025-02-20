import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/auth/Login";
import Layout from "./layout/Layout";


export default function Home() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}
