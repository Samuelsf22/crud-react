import Navbar from "@/layout/Navbar";
import { BrowserRouter } from "react-router";

export default function Home() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </>
  );
}
