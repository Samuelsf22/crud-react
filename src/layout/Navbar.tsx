import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  const menuItems = [
    { name: "Home", to: "/" },
    { name: "Sign Out", onClick: handleSignOut },
  ];

  return (
    <header className="fixed top-0 z-10 flex items-center justify-center w-full mx-auto mt-2">
      <nav className="flex px-3 rounded-full justify-center items-center backdrop-blur-md bg-muted">
        <div className="items-center justify-between">
          <ul className="flex">
            {menuItems.map((item) => (
              <li key={item.name}>
                {item.to ? (
                  <Link to={item.to}>
                    <Button variant="link">{item.name}</Button>
                  </Link>
                ) : (
                  <Button variant="link" onClick={item.onClick}>
                    {item.name}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
