import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { TableProvider } from "./components/TableContext";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <TableProvider>
      <App />
    </TableProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
