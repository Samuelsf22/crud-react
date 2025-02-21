import UserPage from "@/components/user/UserPage";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="">
        <UserPage />
      </div>
    </div>
  );
}
