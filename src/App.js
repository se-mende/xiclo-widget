import React from "react";
import XicloLogin from "./components/XicloLogin";

function App(props) {
  return (
    <div>
      <XicloLogin
        apikey={props.apikey}
        email={props.email}
        phone={props.phone}
        userid={props.userid}
      />
    </div>
  );
}

export default App;
