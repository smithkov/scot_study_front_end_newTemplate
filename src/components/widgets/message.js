import React, { useEffect, useState } from "react";

function Message(props) {
  const size = 60;
  return (
    <div
      style={{ textAlign: "center" }}
      class="alert alert-primary"
      role="alert"
    >
      <h4>{props.text}</h4>
    </div>
  );
}

export default Message;
