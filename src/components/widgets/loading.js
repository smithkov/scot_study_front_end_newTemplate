import React, { useEffect, useState } from "react";

function Loading(props) {
  const size = 60;
  return (
    <div class="d-flex justify-content-center">
      <div
        style={{ height: size, width: size }}
        class="spinner-border"
        role="status"
      >
        <span class="visually-hidden"></span>
      </div>
      <div
        style={{ height: size, width: size }}
        class="spinner-grow"
        role="status"
      >
        <span class="visually-hidden"></span>
      </div>
    </div>
  );
}

export default Loading;
