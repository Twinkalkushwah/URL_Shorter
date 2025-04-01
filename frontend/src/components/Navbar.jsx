import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css"
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Home</h1>
      
        <h2 onClick={handleLogout}>Logout</h2>
    </nav>
  );
};

export default Navbar;
