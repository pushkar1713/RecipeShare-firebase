// import { createRoot } from "react-dom/client";
// import "./index.css";
// import appRouter from "./router";
// import { RouterProvider } from "react-router-dom";
// import { UserAuthProvider } from "./context";

// createRoot(document.getElementById("root")!).render(
//   <UserAuthProvider>
//     <RouterProvider router={appRouter} />
//   </UserAuthProvider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Pages/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
