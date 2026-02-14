import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./app/App.jsx";
import { store } from "./app/store";
import "./styles/index.css";
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ React.createElement(Provider, { store }, /* @__PURE__ */ React.createElement(App, null))
);
