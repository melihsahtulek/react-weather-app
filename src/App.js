import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/search__input";
import Button from "./components/button";
import Error from "./components/error";
import Card from "./components/card";

const App = () => {
  const [fullHeight, setFullHeight] = useState(0);
  const [welcomeShow, setWelcomeShow] = useState(true);
  const [getLocBtnEvent, setGetLocBtnEvent] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [data, setData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    setFullHeight(document.documentElement.clientHeight || document.body.clientHeight);
    window.addEventListener("resize", () => {
      setFullHeight(document.documentElement.clientHeight || document.body.clientHeight);
    });
  }, []);

  const fetchApi = async (param) => {
    setData(null);
    if (param.type === "location") {
      var response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${param.data.latitude}&lon=${param.data.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      var json = await response.json();
    } else {
      var response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param.data}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      var json = await response.json();
    }

    if (response.status === 200) {
      setWelcomeShow(false);
      setData(json);
    } else {
      setErrMsg(response.statusText);
      setShowError(true);
    }
  };

  useEffect(() => {
    if (formSubmit) {
      fetchApi({ type: "nyName", data: searchQuery });
      setFormSubmit(false);
    }
  }, [formSubmit]);

  useEffect(() => {
    if (getLocBtnEvent) {
      const showPosition = (pos) => {
        let { latitude, longitude } = pos.coords;
        fetchApi({ type: "location", data: { latitude, longitude } });
        setGetLocBtnEvent(false);
      };

      const positionError = (err) => {
        setErrMsg(err.message);
        setShowError(true);
      };

      navigator.geolocation.getCurrentPosition(showPosition, positionError, {
        enableHighAccuracy: true,
        maximumAge: 10000,
      });
    }
  }, [getLocBtnEvent]);

  const clear = () => {
    setWelcomeShow(true);
    setSearchQuery("");
    setFormSubmit(false);
    setData(null);
    setGetLocBtnEvent(false);
  };

  return (
    <main style={{ minHeight: fullHeight }}>
      <section className="center">
        <div className="appTitle">
          <h1>
            {!welcomeShow && (
              <span className="material-icons" onClick={clear}>
                arrow_back
              </span>
            )}
            weather app
          </h1>
        </div>
        {welcomeShow && (
          <div className="welcome">
            <div className="wTop">
              <Search setSearchQuery={setSearchQuery} setFormSubmit={setFormSubmit} />
            </div>
            <div className="wMid">
              <div className="wMidLine"></div>
            </div>
            <div className="wBot">
              <Button text="get my location" type="button" iconName="near_me" event={setGetLocBtnEvent} />
            </div>
          </div>
        )}

        {!welcomeShow && (
          <div className="currentWeather">
            <Card data={data} />
          </div>
        )}

        {showError && <Error closeEvent={setShowError} errMsg={errMsg} />}
      </section>
      <a href="https://melihsahtulek.com/">dev. by tülek</a>
    </main>
  );
};

export default App;
