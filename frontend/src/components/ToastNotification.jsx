import Swal from "sweetalert2";

const ToastNotification = (message, type = "info") => {
  Swal.fire({
    title: message,
    icon: type,
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 2000,
  });
};

export default ToastNotification;
