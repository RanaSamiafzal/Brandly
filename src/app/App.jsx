import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Toaster } from "sonner";
function App() {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(RouterProvider, { router }), /* @__PURE__ */ React.createElement(Toaster, { position: "top-right", richColors: true }));
}
export {
  App as default
};
