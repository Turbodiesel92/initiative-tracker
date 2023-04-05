import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "../components/App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);


// import Box from "./Box";
// import Button from "./Button";
// import FormField from "./FormField";
// import Input from "./Input";
// import Label from "./Label";
// import Textarea from "./Textarea";
// import Error from "./Error";

// export { Box, Button, Error, FormField, Input, Label, Textarea };