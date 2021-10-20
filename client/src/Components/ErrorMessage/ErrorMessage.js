import React from "react";
import "./ErrorMessage.css";

function ErrorMessage(props) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.error}
    </div>
  );
}

export default ErrorMessage;
