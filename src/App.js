import React from "react";
import XicloLogin from "./components/XicloLogin";

function App(props) {
  return (
    <div>
      <XicloLogin email={props.email} apikey={props.apikey} />
    </div>
  );
}

export default App;
