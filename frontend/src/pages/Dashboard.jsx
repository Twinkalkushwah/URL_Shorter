import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    swal({
      title: "Access Denied",
      text: "You need to log in first!",
      icon: "warning",
      button: "OK",
    }).then(() => {
      navigate("/login"); // Redirect to login page after user clicks "OK"
    });
  }, [navigate]);

  return null; // Prevent rendering Dashboard content (if any) since we're always showing the alert
};

export default Dashboard;
