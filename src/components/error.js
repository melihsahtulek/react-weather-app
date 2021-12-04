import { useEffect, useState } from "react";
import Button from "./button";
import "./error.css";

const Error = ({ closeEvent, errMsg }) => {
  const [alertOk, setAlertOk] = useState(false);

  useEffect(() => {
    if (alertOk) {
      closeEvent(false);
    }
  }, [alertOk]);

  return (
    <div className="err">
      <h3>error</h3>
      <p>{errMsg}</p>
      <div className="errBtn">
        <Button text="" type="button" iconName="check" event={setAlertOk} />
      </div>
    </div>
  );
};

export default Error;
