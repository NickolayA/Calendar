import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import registerServiceWorker from "./registerServiceWorker";

const WithRedux = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <App />
      </React.Fragment>
    </Provider>
  );
};

ReactDOM.render(<WithRedux />, document.getElementById("root"));
registerServiceWorker();
