import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import "./index.css";
import reducers from "./reducers";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
ReactDOM.render(
  <GoogleOAuthProvider clientId="149341206726-a69n5v9752n106qqb7fsdqm0l55iohoj.apps.googleusercontent.com">
    <Provider store={store}>
      <App />
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

export default store;
