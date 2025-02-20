import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Navbar() {
  const menuItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
  ];

  return (
    <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
      <nav className="flex px-3 rounded-full justify-center items-center backdrop-blur-md bg-muted">
        <div className="items-center justify-between">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link to={item.to}>
                  <Button variant="link">{item.name}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
