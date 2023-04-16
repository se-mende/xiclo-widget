import React, { useState, useEffect } from "react";
import axiosInstance from "../index";
import Popup from "./DownloadDialog";

const XICLO_VALIDATION = `${process.env.REACT_APP_HOST}/users/validate`;
const XICLO_GENERATE_TOKEN = `${process.env.REACT_APP_HOST}/users/generate-token`;

function XicloLogin(props) {
  const [useXiclo, setUseXiclo] = useState(false);
  const [validation, setValidation] = useState({
    userId: "",
    isValid: false,
  });
  const [showRegistration, setShowRegistration] = useState(false);

  const handleUseXiclo = (event) => {
    setUseXiclo(event.target.checked);
    if (event.target.checked) {
      axiosInstance
        .post(XICLO_GENERATE_TOKEN, {
          userId: validation.userId,
        })
        .then((result) => {
          event.target
            .closest(".xiclo-widget")
            .setAttribute("data-xiclo-token", result.data.token);
        });
    } else {
      event.target.closest(".xiclo-widget").removeAttribute("data-xiclo-token");
    }
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
          phone: props.phone,
          userId: props.userid,
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
    <div>
      {validation.isValid ? (
        <div>
          ¿Quieres usar recipientes Xiclo?{" "}
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
          ¿Te gustaría usar Xiclo?{" "}
          <button onClick={() => setShowRegistration(true)}>Registrate</button>
        </div>
      )}
      {showRegistration && (
        <Popup
          content={
            <>
              <b>Registrate a Xiclo</b>
              <br></br>
              <p>Appstore</p>
              <img
                src="https://cdn.jsdelivr.net/gh/se-mende/xiclo-widget/widget/appstore.png"
                alt="appstore"
              ></img>
              <br></br>
              <p>Play store</p>
              <img
                src="https://cdn.jsdelivr.net/gh/se-mende/xiclo-widget/widget/playstore.png"
                alt="playstore"
              ></img>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default XicloLogin;
