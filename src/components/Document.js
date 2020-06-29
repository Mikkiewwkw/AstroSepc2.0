import React from "react";
import { toast, ToastContainer } from "react-toastify";

const CloseButton = ({ closeToast }) => (
  <i className="material-icons" onClick={closeToast}>
    delete
  </i>
);

export default function Document() {
  const notify = () => {
    toast("The close button change when Chuck Norris display a toast");
  };

  return (
    <div>
      <button onClick={notify}>Notify</button>
      <ToastContainer closeButton={CloseButton} />
    </div>
  );
}
