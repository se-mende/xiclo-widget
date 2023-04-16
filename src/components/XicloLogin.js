import React, { useState, useEffect } from "react";
import axiosInstance from "../index";
import Popup from "./RegistrationForm";

const XICLO_VALIDATION = `${process.env.REACT_APP_HOST}/users/validate`;

function XicloLogin(props) {
  const [useXiclo, setUseXiclo] = useState(false);
  const [validation, setValidation] = useState({
    userId: "",
    isValid: false,
  });
  const [showRegistration, setShowRegistration] = useState(false);

  const handleUseXiclo = (event) => {
    setUseXiclo(event.target.checked);
    if (event.target.checked)
      event.target.setAttribute("data-userId", validation.userId);
    else event.target.removeAttribute("data-userId");
  };

  const togglePopup = () => {
    setShowRegistration(!showRegistration);
  };

  useEffect(() => {
    axiosInstance.defaults.headers.common = {
      "X-API-Key": props.apikey,
    };
    axiosInstance
      .get(XICLO_VALIDATION, {
        params: {
          email: props.email,
        },
      })
      .then((result) => {
        setValidation({
          userId: result.data.userId,
          isValid: result.data.isValid,
        });
      });
  }, []);

  return (
    <div style={{ border: "1px solid black", width: 350 }}>
      <p>xiclo widget</p>
      {validation.isValid ? (
        <div>
          ¿Usar Xiclo?{" "}
          <input
            type="checkbox"
            id="useXiclo"
            name="xiclo"
            checked={useXiclo}
            onChange={handleUseXiclo}
          />
        </div>
      ) : (
        <div>
          <p>No eres usuario Xiclo</p>
          <button onClick={() => setShowRegistration(true)}>Registrar</button>
        </div>
      )}
      {showRegistration && (
        <Popup
          content={
            <>
              <b>Registrate a Xiclo</b>
              <br></br>
              <button>Gmail</button>
              <br></br>
              <button>Apple</button>
              <br></br>
              <button>Correo</button>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default XicloLogin;
