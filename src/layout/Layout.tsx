import UserPage from "@/components/user/UserPage";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="h-screen flex items-center justify-center px-4 xl:px-0">
        <div className="max-w-7xl w-full pt-40">
          <UserPage />
        </div>
      </div>
    </div>
  );
}
