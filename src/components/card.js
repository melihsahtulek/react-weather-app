import { useEffect, useState } from "react";
import "./card.css";

const Card = ({ data }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data !== null) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [data]);

  return (
    <>
      {isLoaded === true ? (
        <div className="card">
          <div className="cardIcon">
            <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`} alt="error" />
          </div>
          <div className="description">
            <h2>{data.weather[0].description}</h2>
          </div>
          <div className="temp">
            <h2>{data.main.temp.toFixed()}°C</h2>
          </div>
          <div className="cityName">
            <h2>
              {data.name} , {data.sys.country}
            </h2>
          </div>
          <div className="cardBottom">
            <div className="cardBottomLeft">
              <span className="material-icons">air</span>
              <h4>{data.wind.speed} km/h</h4>
            </div>
            <div className="cardBottomRight">
              <span className="material-icons">water_drop</span>
              <h4>{data.main.humidity}%</h4>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">
          <div className="circle"></div>
        </div>
      )}
    </>
  );
};

export default Card;
